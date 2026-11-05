import React from 'react';
import { Link } from 'react-router-dom';
import {
  LifeBuoy,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  CloudLightning,
  HeartHandshake,
  Smartphone,
  FolderLock,
  PhoneCall,
  Search,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Accordion } from '../components/common/Accordion';

export const HelpPage: React.FC = () => {
  const guides = [
    {
      title: '1. Navigating Fake Website Protection',
      icon: ShieldAlert,
      color: 'text-red-600 bg-red-100',
      route: '/fake-website-protection',
      steps: [
        'Open the Fake Website Protection page.',
        'Enter or paste any suspicious web address into the Website Safety & Scam Analyzer.',
        'Review the Trust Score (0–100) and specific warning flags (unsecured HTTP, raw IP hosts, suspicious TLDs).',
        'If money has been deducted, review the "What Should I Do If I Get Scammed?" section and immediately dial 1930.',
      ],
    },
    {
      title: '2. Using Disaster Awareness & Checklists',
      icon: CloudLightning,
      color: 'text-orange-600 bg-orange-100',
      route: '/disaster-awareness',
      steps: [
        'Explore the 3-phase preparedness matrix: Before, During, and After calamity.',
        'Check off items in the Household Emergency Go-Bag Kit as you pack them at home.',
        'Your completion percentage is saved automatically in your browser for future reference.',
        'Keep emergency number 112 written down on physical paper inside your go-bag.',
      ],
    },
    {
      title: '3. Accessing Mental Health Crisis Support',
      icon: HeartHandshake,
      color: 'text-purple-600 bg-purple-100',
      route: '/suicide-prevention',
      steps: [
        'Read the prominent "YOU ARE NOT ALONE" section for immediate compassionate guidance.',
        'Dial 14416 toll-free to reach certified counselors at the National Tele-MANAS helpline.',
        'If experiencing rapid panic or hyperventilation, activate the interactive 4-7-8 Calming Breath Guide.',
        'Review the communication guidelines on how to support loved ones in distress without judgment.',
      ],
    },
    {
      title: '4. Tracking Digital Wellness & Detox',
      icon: Smartphone,
      color: 'text-blue-600 bg-blue-100',
      route: '/smartphone-addiction',
      steps: [
        'Move the slider on the Daily Screen-Time Tracker to see your usage status and personalized health recommendations.',
        'Follow the 7-Day Digital Detox Challenge, marking each completed day to build your streak badge.',
        'Review the practical habit suggestions such as turning your device to Grayscale Mode and keeping phones away from the bed.',
      ],
    },
    {
      title: '5. Managing the Encrypted Document Vault',
      icon: FolderLock,
      color: 'text-emerald-600 bg-emerald-100',
      route: '/document-storage',
      steps: [
        'Sign in with your email or use the 1-click Quick Demo account.',
        'Click "Upload Document" to store your Aadhaar, PAN, medical records, or educational certificates (PDF, JPG, PNG, DOC, DOCX up to 10MB).',
        'Filter documents by category or use the instant search bar.',
        'Click the Eye icon to preview files, or the Download icon to retrieve files with secure signed URLs.',
        'Open the Supabase Setup tab to review the SQL migrations and configure your live backend.',
      ],
    },
  ];

  const generalFaqs = [
    {
      question: 'Is SOLVEXA completely free for all citizens?',
      answer:
        'Yes. SOLVEXA is an open public civic awareness initiative. All five problem-solving modules, interactive tools, checklists, and calculators are 100% free with no hidden charges or subscriptions.',
    },
    {
      question: 'Do I need to create an account to use the educational tools?',
      answer:
        'No. The URL Scam Checker, Disaster Emergency Checklist, 4-7-8 Breathing Guide, and Screen-Time Tracker work immediately without logging in. An account is only required if you wish to store private documents in the encrypted cloud vault.',
    },
    {
      question: 'Are the emergency hotlines listed on SOLVEXA official?',
      answer:
        'Yes. All emergency hotlines listed on SOLVEXA are official Government of India toll-free numbers: Cyber Financial Fraud (1930), National Emergency & Police/Fire/Rescue (112), and Tele-MANAS Mental Health Support (14416).',
    },
    {
      question: 'How do I report a bug or suggest an additional civic feature?',
      answer:
        'You can reach our team directly using the Contact form. We welcome suggestions from citizens, civic organizations, and cybersecurity researchers.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold uppercase tracking-wider mb-4">
            <LifeBuoy className="w-4 h-4 text-blue-600" />
            <span>Citizen Navigation Guide</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            How to Use SOLVEXA
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Step-by-step instructions to get the most out of every public safety module and interactive tool.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Five Guides */}
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Module Walkthroughs
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Select any pillar below to understand its capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {guides.map((guide, idx) => {
              const Icon = guide.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:border-slate-300 transition-all space-y-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${guide.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">{guide.title}</h3>
                    </div>

                    <Link
                      to={guide.route}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors shrink-0"
                    >
                      <span>Open Module</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2 border-t border-slate-100">
                    {guide.steps.map((step, sIdx) => (
                      <div key={sIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                        <span className="text-xs font-black text-slate-400">Step {sIdx + 1}</span>
                        <p className="text-xs text-slate-700 leading-relaxed font-medium">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Universal Helplines Quick Reference */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl space-y-6">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Immediate Assistance Reference
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
              National Emergency Helplines (India)
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              All numbers below are free, toll-free, and operational 24 hours a day, 365 days a year.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
              <span className="text-xs font-bold text-red-400 uppercase tracking-wider">Cyber Financial Fraud</span>
              <p className="text-3xl font-black text-white">1930</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Report online money theft, fake banking links, UPI scams, and card fraud within the golden hour.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">National Emergency (All-in-One)</span>
              <p className="text-3xl font-black text-white">112</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connect directly to Police, Fire Brigade, Medical Ambulance, and NDRF disaster rescue operations.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/10 space-y-2">
              <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Tele-MANAS Mental Health</span>
              <p className="text-3xl font-black text-white">14416</p>
              <p className="text-xs text-slate-300 leading-relaxed">
                Confidential emotional support, suicide prevention counseling, and psychological assistance in 20+ languages.
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              General Platform FAQs
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Frequently asked questions about SOLVEXA features and privacy.
            </p>
          </div>
          <Accordion items={generalFaqs} />
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
