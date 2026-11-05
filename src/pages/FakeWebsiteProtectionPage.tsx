import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ArrowLeft,
  AlertTriangle,
  Lock,
  ExternalLink,
  PhoneCall,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  AlertCircle,
  FileText,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react';
import { Accordion } from '../components/common/Accordion';
import { analyzeUrlSafety, UrlAnalysisResult } from '../utils/scamChecker';

export const FakeWebsiteProtectionPage: React.FC = () => {
  const [urlInput, setUrlInput] = useState('');
  const [analysisResult, setAnalysisResult] = useState<UrlAnalysisResult | null>(null);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    const res = analyzeUrlSafety(urlInput);
    setAnalysisResult(res);
  };

  const handleSampleClick = (sample: string) => {
    setUrlInput(sample);
    const res = analyzeUrlSafety(sample);
    setAnalysisResult(res);
  };

  const commonProblems = [
    {
      title: '1. Fake Shopping Websites',
      desc: 'Cloned e-commerce storefronts offering branded electronics, apparel, or gold at 80–90% unbelievable discounts to steal card numbers or take upfront UPI payments without delivering goods.',
      impact: 'Financial loss, stolen debit/credit credentials, clone card risks.',
    },
    {
      title: '2. Phishing Websites',
      desc: 'Lookalike login pages mimicking Google, Microsoft, social media, or banks designed to capture user credentials, session cookies, and security questions.',
      impact: 'Full account takeover, identity theft, unauthorized data leakage.',
    },
    {
      title: '3. Fake Job Portals',
      desc: 'Fraudulent employment platforms targeting students and job-seekers with fake appointment letters from MNCs, charging "registration fees", "training deposits", or collecting Aadhaar/PAN scans.',
      impact: 'Financial exploitation of vulnerable youth, misuse of identity documents.',
    },
    {
      title: '4. Fake Banking & Payment Websites',
      desc: 'Pages designed to copy SBI, HDFC, ICICI, or payment gateways with deceptive forms asking for Net Banking User ID, Transaction Passwords, and OTPs.',
      impact: 'Instant draining of life savings, unauthorized fund transfers via IMPS/NEFT.',
    },
    {
      title: '5. Fraudulent Investment Websites',
      desc: 'Bogus crypto trading platforms, fake stock IPO allotments, and Ponzi schemes promising 200–500% guaranteed returns within days.',
      impact: 'Devastating financial ruin, psychological trauma, family distress.',
    },
    {
      title: '6. Fake Links & Online Scams',
      desc: 'Shortened URLs sent via SMS, WhatsApp, or Telegram claiming "Electricity bill unpaid – power will be cut tonight" or "Speed Post parcel delivery address error – click here".',
      impact: 'Installation of remote access malware (e.g. AnyDesk/RustDesk APKs) and automated bank theft.',
    },
  ];

  const practicalSolutions = [
    {
      title: '1. Verify Website URLs & Domain Names',
      desc: 'Inspect the address bar letter by letter. Scammers substitute letters (e.g., using "0" instead of "O", or "sbi-update.top" instead of "onlinesbi.sbi"). Always verify the top-level domain.',
    },
    {
      title: '2. Check HTTPS (With Critical Nuance)',
      desc: 'HTTPS only encrypts the connection between your device and the server—it DOES NOT guarantee the owner is legitimate. Scammers obtain free SSL certificates easily. Never assume a padlock icon equals safety.',
    },
    {
      title: '3. Never Share OTPs, Passwords, or PINs',
      desc: 'No bank, government agency, or reputable company will ever contact you asking for your one-time password (OTP), UPI PIN, or card CVV. An OTP is the final barrier protecting your funds.',
    },
    {
      title: '4. Avoid Suspicious Links & Unknown Downloads',
      desc: 'Never click on urgent WhatsApp, Telegram, or SMS links asking you to install APK files or third-party screen-sharing applications (TeamViewer, AnyDesk).',
    },
    {
      title: '5. Verify Websites Using Official Sources',
      desc: 'Bookmark official government and banking portals directly. If an SMS claims to be from your electricity board or courier, call the customer service number listed on your physical bill or official website.',
    },
    {
      title: '6. Report Cybercrime Immediately',
      desc: 'Report fraudulent websites and suspicious numbers to the National Cyber Crime Reporting Portal (cybercrime.gov.in) and call India’s 1930 helpline within the golden hour.',
    },
  ];

  const faqs = [
    {
      question: 'Does the padlock icon (HTTPS) mean a website is 100% genuine and safe?',
      answer:
        'No. A green padlock or HTTPS simply means the data in transit between your browser and the website is encrypted. Modern cybercriminals routinely register free SSL/TLS certificates for phishing sites. You must verify the exact domain name and authenticity of the organization.',
    },
    {
      question: 'What is the "Golden Hour" in cyber financial fraud?',
      answer:
        'The first 2 to 3 hours after unauthorized money is debited from your account are known as the Golden Hour. If you dial 1930 immediately, police nodal officers can freeze the illicit transaction in the recipient bank or wallet before the scammer withdraws the cash.',
    },
    {
      question: 'Can scammers steal money if I only receive an SMS without clicking anything?',
      answer:
        'Merely receiving an SMS cannot debit your money. Fraud occurs when you click malicious links inside the message, download APK files, or enter your banking credentials and OTPs on fraudulent web pages.',
    },
    {
      question: 'How do fake job portals obtain my phone number and resume?',
      answer:
        'Scammers scrape public job boards, social platforms, or create bogus recruitment listings on legitimate classifieds to harvest resumes. Legitimate companies never charge "security deposits" or "interview processing fees".',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Category Header */}
      <section className="bg-white border-b border-slate-200 pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>Pillar 01 • Cyber Defense & Online Safety</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Fake Website Protection
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                Learn how fraudulent websites, phishing pages, and financial impersonation schemes operate—and equip yourself with practical verification methods to stay safe online.
              </p>
            </div>

            <div className="shrink-0 p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 max-w-xs">
              <div className="flex items-center gap-2 font-bold text-sm mb-1 text-red-800">
                <PhoneCall className="w-4 h-4" />
                <span>Cyber Helpline (India)</span>
              </div>
              <p className="text-2xl font-black text-red-600">1930</p>
              <p className="text-[11px] text-red-700/90 mt-1">
                Call immediately if money is fraudulently deducted from your bank.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Interactive URL Scam Checker Tool */}
        <section className="bg-white rounded-2xl border border-red-200 p-6 sm:p-8 shadow-sm">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-2">
              <Search className="w-3.5 h-3.5" />
              <span>Interactive Safety Tool</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Website Safety &amp; Scam Analyzer
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Paste or type any suspicious link, domain, or message URL to run our heuristic domain safety audit.
            </p>
          </div>

          <form onSubmit={handleAnalyze} className="mt-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="e.g. sbi-kyc-update.xyz or http://192.168.1.1/banking"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:outline-none focus:border-red-500 focus:bg-white transition-all font-mono"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-xl font-bold text-white bg-red-600 hover:bg-red-700 shadow-sm transition-all text-sm shrink-0 cursor-pointer"
            >
              Analyze Safety
            </button>
          </form>

          {/* Quick test samples */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-500">
            <span className="font-semibold">Try sample tests:</span>
            <button
              type="button"
              onClick={() => handleSampleClick('http://sbi-login-verify.xyz/account')}
              className="text-red-600 hover:underline cursor-pointer font-mono"
            >
              Phishing lookalike (.xyz)
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleSampleClick('http://192.168.4.12/free-gift')}
              className="text-red-600 hover:underline cursor-pointer font-mono"
            >
              Raw IP address
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => handleSampleClick('https://cybercrime.gov.in')}
              className="text-emerald-700 hover:underline cursor-pointer font-mono"
            >
              Official Government Portal
            </button>
          </div>

          {/* Analysis Result Display */}
          {analysisResult && (
            <div
              className={`mt-6 p-5 sm:p-6 rounded-xl border transition-all ${
                analysisResult.riskLevel === 'HIGH_RISK'
                  ? 'bg-red-50/80 border-red-300 text-red-950'
                  : analysisResult.riskLevel === 'MODERATE_RISK'
                  ? 'bg-amber-50/80 border-amber-300 text-amber-950'
                  : 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-black/10">
                <div className="flex items-center gap-3">
                  {analysisResult.riskLevel === 'HIGH_RISK' ? (
                    <div className="p-2 rounded-xl bg-red-600 text-white">
                      <XCircle className="w-6 h-6" />
                    </div>
                  ) : analysisResult.riskLevel === 'MODERATE_RISK' ? (
                    <div className="p-2 rounded-xl bg-amber-500 text-white">
                      <AlertTriangle className="w-6 h-6" />
                    </div>
                  ) : (
                    <div className="p-2 rounded-xl bg-emerald-600 text-white">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                  )}
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider block opacity-75">
                      Security Assessment
                    </span>
                    <h3 className="text-lg font-extrabold tracking-tight">
                      {analysisResult.riskLevel === 'HIGH_RISK' && 'High Risk Phishing Signature Detected!'}
                      {analysisResult.riskLevel === 'MODERATE_RISK' && 'Moderate Risk – Proceed With Caution'}
                      {analysisResult.riskLevel === 'SAFE' && 'Clean Heuristic Profile'}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-2xl font-black">{analysisResult.score}/100</span>
                  <span className="block text-[11px] opacity-75">Trust Score</span>
                </div>
              </div>

              {/* Warnings and recommendations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-xs sm:text-sm">
                <div>
                  <h4 className="font-bold mb-2 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-red-600" />
                    <span>Detected Warning Indicators:</span>
                  </h4>
                  <ul className="space-y-1.5 pl-5 list-disc">
                    {analysisResult.warnings.map((w, idx) => (
                      <li key={idx} className="leading-snug">
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Recommended Safeguards:</span>
                  </h4>
                  <ul className="space-y-1.5 pl-5 list-disc">
                    {analysisResult.recommendations.map((r, idx) => (
                      <li key={idx} className="leading-snug">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Common Problems Section */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Six Common Cyber Deception Problems
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Cybercriminals continuously innovate fraudulent tactics to mimic legitimate institutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {commonProblems.map((prob, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-red-300 transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-red-100 text-red-700 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{prob.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{prob.desc}</p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-red-700 font-medium">
                  <strong>Risk:</strong> {prob.impact}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why the Problem Happens & Societal Effects */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Why Does This Problem Happen?
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>Cheap Domain & Hosting Tools:</strong> Scammers can register disposable domains and obtain free SSL certificates in minutes using stolen credentials.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>Psychological Urgency & Fear:</strong> Scammers use artificial pressure (&quot;Account blocked in 2 hours&quot;, &quot;Electricity cut off&quot;, &quot;Lottery prize expired&quot;) to trigger panic rather than rational verification.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>High-Fidelity Cloning:</strong> Modern web scrapers mirror official bank UI, logos, and fonts with pixel perfection.
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Effects on Individuals &amp; Society
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>Depletion of Life Savings:</strong> Pensioners, students, and small business owners frequently lose critical savings overnight.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>Erosion of Digital Trust:</strong> Victims develop lasting fear and distrust towards online banking, UPI, and e-governance services.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0" />
                <span>
                  <strong>Secondary Criminal Misuse:</strong> Stolen Aadhaar, PAN, and identity docs are repurposed to open mule bank accounts and fraudulent SIM cards.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Practical Solutions & Prevention Tips */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Practical Solutions &amp; Prevention Tips
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Apply these six golden cybersecurity habits to defend your household and colleagues.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {practicalSolutions.map((sol, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600 shrink-0">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900">{sol.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{sol.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Section: What Should I Do If I Get Scammed? */}
        <section className="bg-gradient-to-br from-red-600 to-rose-700 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-white" />
              <span>Immediate Emergency Protocol</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              What Should I Do If I Get Scammed?
            </h2>

            <p className="text-sm sm:text-base text-red-100 max-w-3xl leading-relaxed">
              If money has been deducted or you shared banking credentials, act immediately within the &quot;Golden Hour&quot;. Follow these prioritized emergency actions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-white text-red-700 font-extrabold flex items-center justify-center text-xs">
                  1
                </div>
                <h4 className="font-bold text-sm text-white">Call 1930 Helpline Immediately</h4>
                <p className="text-xs text-red-100">
                  India’s National Cyber Financial Fraud helpline will coordinate with recipient banks to freeze the funds.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-white text-red-700 font-extrabold flex items-center justify-center text-xs">
                  2
                </div>
                <h4 className="font-bold text-sm text-white">Contact Your Bank &amp; Freeze Cards</h4>
                <p className="text-xs text-red-100">
                  Call your bank’s official 24/7 hotline to freeze debit cards, credit cards, and Net Banking login access.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-white text-red-700 font-extrabold flex items-center justify-center text-xs">
                  3
                </div>
                <h4 className="font-bold text-sm text-white">Change Compromised Passwords</h4>
                <p className="text-xs text-red-100">
                  Reset passwords for all your email, UPI apps, and payment platforms from a secure secondary device.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-white text-red-700 font-extrabold flex items-center justify-center text-xs">
                  4
                </div>
                <h4 className="font-bold text-sm text-white">Secure Email &amp; Cloud Accounts</h4>
                <p className="text-xs text-red-100">
                  Enable two-factor authentication (2FA) using an authenticator app, not SMS OTPs if phone is compromised.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-white text-red-700 font-extrabold flex items-center justify-center text-xs">
                  5
                </div>
                <h4 className="font-bold text-sm text-white">Preserve Evidence &amp; Screenshots</h4>
                <p className="text-xs text-red-100">
                  Save transaction IDs, bank SMS statements, WhatsApp chat logs, phone numbers, and URLs as proof.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/20 space-y-2">
                <div className="w-7 h-7 rounded-lg bg-white text-red-700 font-extrabold flex items-center justify-center text-xs">
                  6
                </div>
                <h4 className="font-bold text-sm text-white">File Official Complaint at Cybercrime.gov.in</h4>
                <p className="text-xs text-red-100">
                  Register a formal cyber incident complaint on the national portal to receive an acknowledgment receipt.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="https://cybercrime.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-red-700 font-bold text-sm hover:bg-red-50 shadow-md transition-all"
              >
                <span>Open Cybercrime.gov.in Portal</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="tel:1930"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-red-950/80 text-white font-bold text-sm hover:bg-black transition-all border border-white/20"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call 1930 Helpline</span>
              </a>
            </div>
          </div>
        </section>

        {/* Useful Resources and Official Links */}
        <section className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Official Cybersecurity Portals &amp; Verification Resources
          </h3>
          <p className="text-sm text-slate-600">
            Verify official advisories and register fraud through verified government channels.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <a
              href="https://cybercrime.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/40 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-red-700">
                  National Cyber Crime Portal
                </h4>
                <p className="text-xs text-slate-500">Official reporting authority</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
            </a>

            <a
              href="https://www.cert-in.org.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/40 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-red-700">
                  CERT-In (Indian Computer Emergency Response)
                </h4>
                <p className="text-xs text-slate-500">Security advisories & alerts</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
            </a>

            <a
              href="https://sancharsaathi.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/40 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-red-700">
                  Sanchar Saathi Portal
                </h4>
                <p className="text-xs text-slate-500">Block lost/stolen mobile phones</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-red-600" />
            </a>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Common questions about fake links, phishing, and scam recovery.
            </p>
          </div>
          <Accordion items={faqs} />
        </section>

        {/* Back to Home Button */}
        <div className="pt-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to SOLVEXA Homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
