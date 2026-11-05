export interface UrlAnalysisResult {
  url: string;
  isSuspicious: boolean;
  score: number; // 0 to 100, 100 is safest, lower is riskier
  riskLevel: 'SAFE' | 'MODERATE_RISK' | 'HIGH_RISK';
  warnings: string[];
  recommendations: string[];
}

const SUSPICIOUS_TLDS = ['.xyz', '.top', '.tk', '.ga', '.cf', '.gq', '.work', '.click', '.monster', '.loan', '.buzz'];
const COMMON_TARGETS = ['sbi', 'hdfc', 'icici', 'paytm', 'amazon', 'flipkart', 'google', 'apple', 'netflix', 'incometax', 'uidai'];

export function analyzeUrlSafety(rawInput: string): UrlAnalysisResult {
  const warnings: string[] = [];
  const recommendations: string[] = [];
  let score = 100;

  const trimmed = rawInput.trim();
  if (!trimmed) {
    return {
      url: '',
      isSuspicious: true,
      score: 0,
      riskLevel: 'HIGH_RISK',
      warnings: ['No URL or domain provided.'],
      recommendations: ['Enter a valid URL to analyze.'],
    };
  }

  // Prepend protocol if missing for URL parsing
  let parsedUrl: URL | null = null;
  let hasExplicitProtocol = false;
  try {
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      parsedUrl = new URL(trimmed);
      hasExplicitProtocol = true;
    } else {
      parsedUrl = new URL(`https://${trimmed}`);
    }
  } catch {
    return {
      url: trimmed,
      isSuspicious: true,
      score: 10,
      riskLevel: 'HIGH_RISK',
      warnings: ['Invalid URL format.'],
      recommendations: ['Check for typos or strange special characters.'],
    };
  }

  const hostname = parsedUrl.hostname.toLowerCase();
  const pathname = parsedUrl.pathname.toLowerCase();

  // Check 1: Insecure HTTP protocol
  if (hasExplicitProtocol && parsedUrl.protocol === 'http:') {
    score -= 30;
    warnings.push('Uses insecure HTTP instead of encrypted HTTPS.');
    recommendations.push('Do not enter passwords or personal details on unencrypted HTTP pages.');
  }

  // Check 2: IP address instead of domain name
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipPattern.test(hostname)) {
    score -= 50;
    warnings.push('URL points directly to an IP address rather than a registered domain name.');
    recommendations.push('Legitimate organizations almost never ask users to access banking or shopping via raw IP addresses.');
  }

  // Check 3: Suspicious TLD
  for (const tld of SUSPICIOUS_TLDS) {
    if (hostname.endsWith(tld)) {
      score -= 35;
      warnings.push(`Uses high-risk top-level domain (${tld}) frequently associated with disposable phishing campaigns.`);
      recommendations.push('Double-check official contact channels before trusting this link.');
      break;
    }
  }

  // Check 4: Brand impersonation / typosquatting in subdomains or paths
  for (const brand of COMMON_TARGETS) {
    const parts = hostname.split('.');
    const isExactBrandDomain = parts.length >= 2 && parts[parts.length - 2] === brand;
    if (hostname.includes(brand) && !isExactBrandDomain) {
      score -= 40;
      warnings.push(`Contains known brand keyword "${brand}" inside an unofficial host or subdomain.`);
      recommendations.push(`Go directly to the official ${brand} website by typing the address yourself.`);
      break;
    }
  }

  // Check 5: Excessive subdomains or hyphenated deceptive words
  const suspiciousKeywords = ['login', 'verify', 'account', 'banking', 'free-gift', 'lottery', 'kyc-update', 'claim-prize', 'secure-update'];
  const matchedKeywords = suspiciousKeywords.filter((kw) => hostname.includes(kw) || pathname.includes(kw));
  if (matchedKeywords.length > 0) {
    score -= 25;
    warnings.push(`Contains phishing trigger keywords: [${matchedKeywords.join(', ')}].`);
    recommendations.push('Financial and government entities never require urgent KYC updates through unsolicited SMS/WhatsApp links.');
  }

  // Check 6: Hyphenated brand spoofing (e.g. amazon-login-secure)
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 2) {
    score -= 15;
    warnings.push('Domain uses multiple hyphens, a common technique to mimic authentic brand URLs.');
  }

  // Final score clamping
  score = Math.max(0, Math.min(100, score));

  let riskLevel: 'SAFE' | 'MODERATE_RISK' | 'HIGH_RISK' = 'SAFE';
  if (score < 50) {
    riskLevel = 'HIGH_RISK';
  } else if (score < 80) {
    riskLevel = 'MODERATE_RISK';
  }

  if (warnings.length === 0) {
    warnings.push('No obvious phishing signatures detected based on domain heuristics.');
    recommendations.push('Always remember: HTTPS and valid certificates do not guarantee the website owner is legitimate. Never share OTPs or banking PINs.');
  }

  return {
    url: trimmed,
    isSuspicious: score < 75,
    score,
    riskLevel,
    warnings,
    recommendations,
  };
}
