import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ArrowRight,
  ShieldCheck,
  Heart,
  Target,
  Compass,
  Users,
  Award,
  Lock,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Hero */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Civic Purpose &amp; Public Good</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            About SOLVEXA
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 mt-4 leading-relaxed font-normal">
            &quot;Understand Problems. Discover Solutions. Build a Safer Society.&quot;
          </p>
          <p className="text-sm sm:text-base text-slate-500 mt-3 leading-relaxed">
            A public civic problem-solving platform created to educate, protect, and support ordinary citizens facing five of modern society’s most pervasive risks.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Mission & Vision Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Our Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To democratize critical survival, cybersecurity, emotional support, and digital literacy tools for every citizen. We believe that preventing cyber theft, surviving natural hazards, accessing mental health counseling, and safeguarding identity documents should be accessible to anyone with an internet connection, completely free from commercial paywalls or intrusive data farming.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Our Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              We envision a resilient society where citizens act with informed composure rather than panic. By equipping households with practical verification workflows, interactive emergency readiness checklists, and encrypted cloud vaults, SOLVEXA builds an enduring civic defense shield across communities.
            </p>
          </div>
        </section>

        {/* The 5 Pillars of Social Impact */}
        <section className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Why These Five Problem Areas?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Every pillar addresses a widespread, systemic vulnerability affecting millions of families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-red-50/50 border border-red-100 space-y-2">
              <span className="text-xs font-black text-red-600 uppercase">Pillar 1</span>
              <h3 className="font-bold text-base text-slate-900">Cyber Deception &amp; Scams</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                With India&apos;s digital payment revolution, financial phishing and fake websites have surged. We connect citizens to instant heuristic URL analysis and the 1930 fraud helpline.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-orange-50/50 border border-orange-100 space-y-2">
              <span className="text-xs font-black text-orange-600 uppercase">Pillar 2</span>
              <h3 className="font-bold text-base text-slate-900">Natural Disasters</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cyclones, flash floods, and seismic tremors cause preventable casualties when households lack proactive go-bags and knowledge of evacuation routes.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2">
              <span className="text-xs font-black text-purple-600 uppercase">Pillar 3</span>
              <h3 className="font-bold text-base text-slate-900">Mental Crisis Support</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Stigma around emotional distress delays life-saving care. We provide compassionate guidance, guided calming exercises, and the 24/7 Tele-MANAS (14416) hotline.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
              <span className="text-xs font-black text-blue-600 uppercase">Pillar 4</span>
              <h3 className="font-bold text-base text-slate-900">Digital Addiction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Addictive algorithmic feeds fragment human attention and disrupt deep sleep. We provide a screen-time calculator and an actionable 7-day detox challenge.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2 md:col-span-2 lg:col-span-1">
              <span className="text-xs font-black text-emerald-600 uppercase">Pillar 5</span>
              <h3 className="font-bold text-base text-slate-900">Secure Document Vault</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Identity documents are lost during displacements and crises. We implement zero-knowledge PostgreSQL Row Level Security to protect Aadhaar, PAN, and certificates.
              </p>
            </div>
          </div>
        </section>

        {/* Civic Ethics & Principles */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Guiding Principles
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight mt-1">Our Core Civic Commitments</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Zero Commercial Ads</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                SOLVEXA will never host deceptive pop-up advertisements, sponsored links, or tracking cookies.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Strict User Privacy</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Your personal documents and challenge progress belong entirely to you. We enforce PostgreSQL RLS policies to prevent multi-tenant data exposure.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span>Verified Public Data</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                All hotlines and emergency protocols are cross-verified against official portals: cybercrime.gov.in, ndma.gov.in, and mohfw.gov.in.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all"
          >
            <span>Explore Solutions on Homepage</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};
