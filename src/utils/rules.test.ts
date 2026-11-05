import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeUrlSafety } from './scamChecker';
import { evaluateScreenTime, calculateDetoxProgress } from './digitalWellness';
import { validateUploadedFile, formatBytes, filterDocuments } from './documentValidation';
import { DocumentItem } from '../types';

test('scamChecker correctly detects suspicious TLD and phishing keywords', () => {
  const result = analyzeUrlSafety('http://sbi-login-verify.xyz/account');
  assert.equal(result.isSuspicious, true);
  assert.equal(result.riskLevel, 'HIGH_RISK');
  assert.ok(result.warnings.some((w) => w.includes('insecure HTTP')));
  assert.ok(result.warnings.some((w) => w.includes('high-risk top-level domain')));
});

test('scamChecker flags direct IP address hostnames', () => {
  const result = analyzeUrlSafety('http://192.168.1.100/banking');
  assert.equal(result.isSuspicious, true);
  assert.ok(result.warnings.some((w) => w.includes('IP address')));
});

test('scamChecker approves standard HTTPS domain', () => {
  const result = analyzeUrlSafety('https://cybercrime.gov.in');
  assert.equal(result.riskLevel, 'SAFE');
  assert.ok(result.score >= 80);
});

test('digitalWellness evaluates healthy screen time correctly', () => {
  const resOptimal = evaluateScreenTime(1.5);
  assert.equal(resOptimal.status, 'OPTIMAL');

  const resModerate = evaluateScreenTime(3.5);
  assert.equal(resModerate.status, 'MODERATE');

  const resCritical = evaluateScreenTime(7);
  assert.equal(resCritical.status, 'CRITICAL');
});

test('digitalWellness computes detox progress and streak badge', () => {
  const days = [
    { completed: true },
    { completed: true },
    { completed: false },
    { completed: false },
    { completed: false },
    { completed: false },
    { completed: false },
  ];
  const progress = calculateDetoxProgress(days);
  assert.equal(progress.completedCount, 2);
  assert.equal(progress.percentage, 29);
  assert.equal(progress.streakBadge, 'Pathfinder');

  const allCompleted = days.map(() => ({ completed: true }));
  const champion = calculateDetoxProgress(allCompleted);
  assert.equal(champion.percentage, 100);
  assert.ok(champion.streakBadge.includes('Champion'));
});

test('documentValidation validates allowed file types and rejects oversized files', () => {
  const validPdf = validateUploadedFile({ name: 'aadhaar_card.pdf', size: 1024 * 1024, type: 'application/pdf' });
  assert.equal(validPdf.isValid, true);
  assert.equal(validPdf.normalizedExtension, 'pdf');

  const oversized = validateUploadedFile({ name: 'huge_scan.png', size: 12 * 1024 * 1024, type: 'image/png' });
  assert.equal(oversized.isValid, false);
  assert.ok(oversized.error?.includes('exceeds the 10MB limit'));

  const badExtension = validateUploadedFile({ name: 'malware.exe', size: 2048, type: 'application/octet-stream' });
  assert.equal(badExtension.isValid, false);
  assert.ok(badExtension.error?.includes('Unsupported file extension'));
});

test('documentValidation formats bytes accurately', () => {
  assert.equal(formatBytes(0), '0 Bytes');
  assert.equal(formatBytes(1024), '1 KB');
  assert.equal(formatBytes(1024 * 1024 * 2.5), '2.5 MB');
});

test('documentValidation filters documents by search term and category', () => {
  const mockDocs: DocumentItem[] = [
    {
      id: '1',
      document_name: 'My Government Aadhaar',
      category: 'Aadhaar',
      file_path: 'user/1.pdf',
      file_type: 'pdf',
      file_size: 500000,
      created_at: '2026-01-01',
    },
    {
      id: '2',
      document_name: 'Blood Test Report',
      category: 'Medical Records',
      file_path: 'user/2.jpg',
      file_type: 'jpg',
      file_size: 300000,
      created_at: '2026-01-02',
    },
  ];

  const searchAadhaar = filterDocuments(mockDocs, 'aadhaar', 'All');
  assert.equal(searchAadhaar.length, 1);
  assert.equal(searchAadhaar[0].id, '1');

  const filterCategory = filterDocuments(mockDocs, '', 'Medical Records');
  assert.equal(filterCategory.length, 1);
  assert.equal(filterCategory[0].id, '2');

  const noMatch = filterDocuments(mockDocs, 'Driving License', 'All');
  assert.equal(noMatch.length, 0);
});
