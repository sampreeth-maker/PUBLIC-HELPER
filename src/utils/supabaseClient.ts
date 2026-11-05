import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { DocumentItem } from '../types';

// Read from env or local session override
const envUrl = (import.meta.env.VITE_SUPABASE_URL || '').trim();
const envKey = (import.meta.env.VITE_SUPABASE_ANON_KEY || '').trim();

let clientInstance: SupabaseClient | null = null;

export function getSupabaseCredentials(): { url: string; key: string; isConfigured: boolean } {
  const customUrl = localStorage.getItem('solvexa_custom_supabase_url') || '';
  const customKey = localStorage.getItem('solvexa_custom_supabase_key') || '';

  const activeUrl = customUrl || envUrl;
  const activeKey = customKey || envKey;

  const isConfigured = Boolean(
    activeUrl &&
    activeKey &&
    activeUrl.startsWith('https://') &&
    activeUrl.includes('.supabase.co') &&
    activeKey.length > 20
  );

  return { url: activeUrl, key: activeKey, isConfigured };
}

export function saveCustomSupabaseCredentials(url: string, key: string) {
  if (url) localStorage.setItem('solvexa_custom_supabase_url', url.trim());
  else localStorage.removeItem('solvexa_custom_supabase_url');

  if (key) localStorage.setItem('solvexa_custom_supabase_key', key.trim());
  else localStorage.removeItem('solvexa_custom_supabase_key');

  clientInstance = null; // reset client
}

export function getSupabaseClient(): SupabaseClient | null {
  const { url, key, isConfigured } = getSupabaseCredentials();
  if (!isConfigured) return null;

  if (!clientInstance) {
    clientInstance = createClient(url, key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return clientInstance;
}

// Local mock storage for demo / inspection mode when Supabase isn't connected
const DEMO_DOCUMENTS_KEY = 'solvexa_demo_documents_vault';

const DEFAULT_DEMO_DOCS: DocumentItem[] = [
  {
    id: 'demo-doc-1',
    document_name: 'Government Identity Proof (Aadhaar Card)',
    category: 'Aadhaar',
    file_path: 'demo/aadhaar_masked_sample.pdf',
    file_type: 'pdf',
    file_size: 1420000,
    created_at: new Date(Date.now() - 86400000 * 4).toISOString(),
  },
  {
    id: 'demo-doc-2',
    document_name: 'Permanent Account Number (PAN Card)',
    category: 'PAN',
    file_path: 'demo/pan_sample.png',
    file_type: 'png',
    file_size: 850000,
    created_at: new Date(Date.now() - 86400000 * 12).toISOString(),
  },
  {
    id: 'demo-doc-3',
    document_name: 'Annual Health Checkup & Blood Panel Report',
    category: 'Medical Records',
    file_path: 'demo/medical_summary.pdf',
    file_type: 'pdf',
    file_size: 2150000,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'demo-doc-4',
    document_name: 'University Degree Certificate',
    category: 'Educational Certificates',
    file_path: 'demo/degree_certificate.pdf',
    file_type: 'pdf',
    file_size: 3400000,
    created_at: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
];

export function getLocalDemoDocuments(): DocumentItem[] {
  try {
    const raw = localStorage.getItem(DEMO_DOCUMENTS_KEY);
    if (!raw) {
      localStorage.setItem(DEMO_DOCUMENTS_KEY, JSON.stringify(DEFAULT_DEMO_DOCS));
      return DEFAULT_DEMO_DOCS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_DEMO_DOCS;
  }
}

export function saveLocalDemoDocuments(docs: DocumentItem[]) {
  localStorage.setItem(DEMO_DOCUMENTS_KEY, JSON.stringify(docs));
}
