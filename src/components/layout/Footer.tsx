import React from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  PhoneCall,
  Lock,
  ExternalLink,
  ShieldCheck,
  Heart,
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Emergency Assistance Callout Banner in Footer */}
      <div className="bg-gradient-to-r from-red-950/60 via-slate-900 to-purple-950/60 border-b border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30">
              <PhoneCall className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">In Immediate Distress or Facing Financial Fraud?</h3>
              <p className="text-xs text-slate-400">Emergency government hotlines are available 24/7 across India free of charge.</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="tel:1930"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs shadow-md transition-all"
            >
              <span>Cyber Fraud: 1930</span>
            </a>
            <a
              href="tel:112"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-600/90 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-all"
            >
              <span>Emergency/Disaster: 112</span>
            </a>
            <a
              href="tel:14416"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-purple-600/90 hover:bg-purple-600 text-white font-bold text-xs shadow-md transition-all"
            >
              <span>Tele-MANAS: 14416</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-900/30">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight font-display">
                SOLVEXA
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              &quot;Understand Problems. Discover Solutions. Build a Safer Society.&quot;
            </p>
            <p className="text-xs text-slate-500 leading-relaxed max-w-md">
              A comprehensive public problem-solving and civic awareness platform designed to protect, educate, and empower citizens against online scams, natural hazards, psychological distress, and device addiction while safeguarding personal identity documents.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Free Public Civic Education Initiative</span>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              5 Major Pillars
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/fake-website-protection" className="hover:text-red-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Fake Website Protection</span>
                </Link>
              </li>
              <li>
                <Link to="/disaster-awareness" className="hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <span>Disaster Awareness</span>
                </Link>
              </li>
              <li>
                <Link to="/suicide-prevention" className="hover:text-purple-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <span>Suicide Prevention</span>
                </Link>
              </li>
              <li>
                <Link to="/smartphone-addiction" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <span>Smartphone Addiction</span>
                </Link>
              </li>
              <li>
                <Link to="/document-storage" className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Secure Document Storage</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white transition-colors">About SOLVEXA</Link>
              </li>
              <li>
                <Link to="/help" className="hover:text-white transition-colors">Citizen Help Guide</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link>
              </li>
              <li>
                <Link to="/document-storage" className="hover:text-white transition-colors flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Encrypted Document Vault</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Official Portals */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4">
              Official Indian Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="https://cybercrime.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>National Cyber Crime Portal</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ndma.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>NDMA Disaster Authority</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://mausam.imd.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>India Meteorological Dept</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://mohfw.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>Ministry of Health (MOHFW)</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a
                  href="https://ndrf.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span>National Disaster Response Force</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer and Bottom Row */}
        <div className="mt-12 pt-8 border-t border-slate-800 text-xs text-slate-500 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-center md:text-left leading-relaxed max-w-2xl">
            <strong>Important Notice:</strong> SOLVEXA is an educational public awareness and digital safety platform. It does not replace professional emergency responders, medical professionals, or official law enforcement authorities. In an acute life-threatening emergency, always contact 112 or local emergency facilities immediately.
          </p>
          <div className="flex items-center gap-2 text-slate-400 text-center md:text-right shrink-0">
            <span>Built with care for public good</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};
