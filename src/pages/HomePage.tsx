import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  CloudLightning,
  HeartHandshake,
  Smartphone,
  FolderLock,
  ArrowRight,
  ShieldCheck,
  Search,
  BookOpen,
  LifeBuoy,
  Users,
  CheckCircle2,
  Lock,
  ExternalLink,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const categories = [
    {
      id: 'fake-website-protection',
      title: 'FAKE WEBSITE PROTECTION',
      color: '#EF4444',
      bgLight: 'bg-red-50',
      borderClass: 'border-red-200 hover:border-red-400 hover:shadow-red-500/10',
      badgeClass: 'bg-red-100 text-red-800',
      btnClass: 'bg-red-600 hover:bg-red-700 text-white shadow-red-600/20',
      icon: ShieldAlert,
      description:
        'Identify fraudulent websites, phishing attempts, fake job portals, and online financial scams.',
      buttonText: 'Explore Protection',
      route: '/fake-website-protection',
      highlights: ['URL scam detector', 'Cyber fraud 1930 guide', 'Phishing traps'],
    },
    {
      id: 'natural-disaster-awareness',
      title: 'NATURAL DISASTER AWARENESS',
      color: '#F97316',
      bgLight: 'bg-orange-50',
      borderClass: 'border-orange-200 hover:border-orange-400 hover:shadow-orange-500/10',
      badgeClass: 'bg-orange-100 text-orange-800',
      btnClass: 'bg-orange-600 hover:bg-orange-700 text-white shadow-orange-600/20',
      icon: CloudLightning,
      description:
        'Learn disaster preparedness, safety measures, emergency responses, and recovery strategies.',
      buttonText: 'Explore Safety',
      route: '/disaster-awareness',
      highlights: ['Interactive emergency kit checklist', 'Before/During/After phases', 'NDMA & 112 hotline'],
    },
    {
      id: 'suicide-prevention',
      title: 'SUICIDE PREVENTION',
      color: '#8B5CF6',
      bgLight: 'bg-purple-50',
      borderClass: 'border-purple-200 hover:border-purple-400 hover:shadow-purple-500/10',
      badgeClass: 'bg-purple-100 text-purple-800',
      btnClass: 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-600/20',
      icon: HeartHandshake,
      description:
        'Promote mental health awareness, emotional support, and access to professional crisis assistance.',
      buttonText: 'Find Support',
      route: '/suicide-prevention',
      highlights: ['You Are Not Alone guidance', 'Tele-MANAS 14416 line', 'Guided calming exercises'],
    },
    {
      id: 'smartphone-addiction',
      title: 'SMARTPHONE ADDICTION',
      color: '#3B82F6',
      bgLight: 'bg-blue-50',
      borderClass: 'border-blue-200 hover:border-blue-400 hover:shadow-blue-500/10',
      badgeClass: 'bg-blue-100 text-blue-800',
      btnClass: 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-600/20',
      icon: Smartphone,
      description:
        'Build healthier digital habits, improve productivity, and maintain a balanced lifestyle.',
      buttonText: 'Improve Wellness',
      route: '/smartphone-addiction',
      highlights: ['Daily screen-time calculator', '7-Day digital detox challenge', 'Sleep hygiene tips'],
    },
    {
      id: 'secure-document-storage',
      title: 'SECURE DOCUMENT STORAGE',
      color: '#22C55E',
      bgLight: 'bg-emerald-50',
      borderClass: 'border-emerald-200 hover:border-emerald-400 hover:shadow-emerald-500/10',
      badgeClass: 'bg-emerald-100 text-emerald-800',
      btnClass: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20',
      icon: FolderLock,
      description:
        'Organize and securely manage your important personal documents in one place.',
      buttonText: 'Store Documents',
      route: '/document-storage',
      highlights: ['Aadhaar, PAN & certificates', 'Supabase private storage RLS', 'Encrypted file preview'],
    },
  ];

  const scrollToSolutions = () => {
    const el = document.getElementById('solutions-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100/60 pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200/80">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold tracking-wide shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>SOLVEXA • Public Safety & Problem-Solving Platform</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Understand Problems.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-600 to-blue-600">
                  Discover Solutions.
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Explore important public challenges, learn how they affect our society, and discover practical ways to protect yourself and others.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  type="button"
                  onClick={scrollToSolutions}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg hover:shadow-emerald-600/25 transition-all text-base flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Explore Solutions</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <Link
                  to="/about"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 hover:border-slate-300 shadow-xs transition-all text-base flex items-center justify-center gap-2"
                >
                  <span>Learn About SOLVEXA</span>
                </Link>
              </div>

              {/* Quick Trust Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0 border-t border-slate-200 text-left">
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">5</p>
                  <p className="text-xs text-slate-500 font-medium">Critical Social Pillars</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">100%</p>
                  <p className="text-xs text-slate-500 font-medium">Free Public Awareness</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">24/7</p>
                  <p className="text-xs text-slate-500 font-medium">Verified Helplines</p>
                </div>
              </div>
            </div>

            {/* Right Column: Modern Civic Impact Visual Element */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Background glow card */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-emerald-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl opacity-75" />

                <div className="relative bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                      Civic Protection Matrix
                    </span>
                  </div>

                  {/* Visual module highlights */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-red-50/70 border border-red-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-red-500 text-white shadow-xs">
                          <ShieldAlert className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Cyber Crime & Scams</p>
                          <p className="text-[11px] text-slate-500">Heuristic scam check & 1930 line</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-700">
                        High Priority
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50/70 border border-orange-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-500 text-white shadow-xs">
                          <CloudLightning className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Natural Disasters</p>
                          <p className="text-[11px] text-slate-500">Floods, storms, interactive prep kit</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-orange-100 text-orange-700">
                        Checklist
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/70 border border-purple-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500 text-white shadow-xs">
                          <HeartHandshake className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Mental Crisis Support</p>
                          <p className="text-[11px] text-slate-500">Tele-MANAS 14416 & breathing</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-700">
                        Support
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500 text-white shadow-xs">
                          <Smartphone className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Digital Wellness</p>
                          <p className="text-[11px] text-slate-500">Screen-time tracker & 7-day challenge</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700">
                        Active
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-100">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-emerald-600 text-white shadow-xs">
                          <FolderLock className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Encrypted Document Vault</p>
                          <p className="text-[11px] text-slate-500">Aadhaar, PAN & certificates</p>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        Secure
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Five Interactive Category Cards Grid */}
      <section id="solutions-section" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            Core Modules
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Five Pillars of Public Protection
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3">
            Select a critical civic domain to access problem breakdowns, practical solutions, interactive tools, and official emergency hotlines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isFifth = idx === 4;
            return (
              <div
                key={cat.id}
                className={`flex flex-col justify-between bg-white rounded-2xl border ${cat.borderClass} p-7 shadow-xs hover:shadow-xl transition-all duration-300 group ${
                  isFifth ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="w-13 h-13 rounded-2xl flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105"
                      style={{ backgroundColor: cat.color }}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold tracking-wide ${cat.badgeClass}`}>
                      MODULE {idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2">
                    {cat.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {cat.description}
                  </p>

                  <div className="space-y-2 mb-6 pt-2 border-t border-slate-100">
                    {cat.highlights.map((h, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  to={cat.route}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${cat.btnClass}`}
                >
                  <span>{cat.buttonText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* About SOLVEXA Section */}
      <section className="bg-white py-16 sm:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                Our Purpose
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                About SOLVEXA
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">
                SOLVEXA is an independent public problem-solving initiative created to bridge the knowledge gap between everyday citizens and life-saving civic solutions. Whether facing online financial deception, natural crises, emotional turmoil, digital burnout, or the loss of crucial identity records, citizens deserve clear, compassionate, and immediate answers.
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Actionable, Not Academic</h4>
                    <p className="text-xs text-slate-600">Step-by-step guidance anyone can execute during an emergency or daily routine.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Verified Emergency Protocols</h4>
                    <p className="text-xs text-slate-600">Directly connected to national toll-free helplines including 1930, 112, and Tele-MANAS 14416.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded-full bg-emerald-100 text-emerald-700 mt-0.5">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Zero Commercial Exploitation</h4>
                    <p className="text-xs text-slate-600">Built purely for public welfare, free from intrusive advertisements or data tracking.</p>
                  </div>
                </div>
              </div>
              <div className="pt-3">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 font-bold text-sm text-emerald-700 hover:text-emerald-800"
                >
                  <span>Read our complete story & mission statement</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Visual Stats & Mission Box */}
            <div className="lg:col-span-6 bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-6">
                <span className="text-xs font-bold tracking-widest text-emerald-400 uppercase">
                  Civic Mission Statement
                </span>
                <blockquote className="text-xl sm:text-2xl font-semibold leading-snug text-slate-100">
                  &ldquo;A safer society is built not by waiting for crises to occur, but by equipping every citizen with the awareness, composure, and tools to respond decisively.&rdquo;
                </blockquote>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <p className="text-3xl font-extrabold text-white">5</p>
                    <p className="text-xs text-slate-400">Interlinked Public Crisis Domains</p>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-white">24/7</p>
                    <p className="text-xs text-slate-400">Accessible Awareness & Tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-200/80 text-slate-700 text-xs font-bold uppercase tracking-wider mb-3">
            Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            How SOLVEXA Empowers You
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Three simple steps to transform public risk into citizen resilience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-extrabold flex items-center justify-center text-sm mb-4">
              01
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Understand the Threat</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Learn the psychological manipulation behind scams, disaster vulnerabilities, mental health triggers, and addictive algorithms.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">
              02
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Deploy Practical Tools</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Use our heuristic URL scanner, interactive disaster kits, screen-time calculators, grounding guides, and secure document vault.
            </p>
          </div>

          <div className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-xs relative">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold flex items-center justify-center text-sm mb-4">
              03
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Protect &amp; Recover</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Connect directly with official hotlines (1930, 112, 14416) and secure your family&apos;s identity data against unforeseen loss.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
