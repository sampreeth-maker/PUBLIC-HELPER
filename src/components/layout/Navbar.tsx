import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  ShieldAlert,
  Menu,
  X,
  User,
  LogOut,
  FolderLock,
  PhoneCall,
  Sparkles,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout, openAuthModal } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Help & Guide', href: '/help' },
    { name: 'Contact', href: '/contact' },
  ];

  const categoryQuickLinks = [
    { name: 'Fake Websites', href: '/fake-website-protection', color: 'text-red-600' },
    { name: 'Disaster Safety', href: '/disaster-awareness', color: 'text-orange-600' },
    { name: 'Mental Health', href: '/suicide-prevention', color: 'text-purple-600' },
    { name: 'Digital Detox', href: '/smartphone-addiction', color: 'text-blue-600' },
    { name: 'Secure Vault', href: '/document-storage', color: 'text-emerald-600' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Top Emergency Quick Bar */}
      <div className="bg-slate-900 text-slate-200 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">Emergency Helplines (India):</span>
            <span className="hidden sm:inline text-slate-400">Immediate citizen assistance 24/7</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="tel:1930"
              className="flex items-center gap-1.5 text-red-400 hover:text-red-300 font-medium transition-colors"
              title="National Cyber Financial Fraud Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Cyber Fraud: <strong>1930</strong></span>
            </a>
            <span className="text-slate-700">|</span>
            <a
              href="tel:112"
              className="flex items-center gap-1.5 text-orange-400 hover:text-orange-300 font-medium transition-colors"
              title="All-India Emergency Helpline"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency / Disaster: <strong>112</strong></span>
            </a>
            <span className="text-slate-700 hidden md:inline">|</span>
            <a
              href="tel:14416"
              className="hidden md:flex items-center gap-1.5 text-purple-400 hover:text-purple-300 font-medium transition-colors"
              title="Tele-MANAS Mental Health Support"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Tele-MANAS: <strong>14416</strong></span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo & Brand Name */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-blue-600 p-0.5 shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform flex items-center justify-center">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <ShieldAlert className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-extrabold tracking-tight text-slate-900 font-display">
                    SOLVEXA
                  </span>
                  <span className="px-1.5 py-0.5 text-[10px] font-bold tracking-wider uppercase bg-emerald-100 text-emerald-800 rounded">
                    CIVIC
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 font-medium tracking-tight -mt-0.5 hidden sm:block">
                  Public Problem Solver
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? 'text-emerald-700 bg-emerald-50 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-5 w-px bg-slate-200 mx-2" />

              <Link
                to="/document-storage"
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/document-storage')
                    ? 'text-emerald-800 bg-emerald-100/70 font-semibold'
                    : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100/60'
                }`}
              >
                <FolderLock className="w-4 h-4 text-emerald-600" />
                <span>Vault</span>
              </Link>
            </nav>

            {/* User Profile / Auth Action */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <Link
                    to="/document-storage"
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center font-bold text-xs">
                      {user.fullName.charAt(0)}
                    </div>
                    <div className="text-left text-xs leading-tight">
                      <p className="font-semibold text-slate-800 truncate max-w-[120px]">{user.fullName}</p>
                      <p className="text-[10px] text-slate-500">{user.isDemo ? 'Demo Mode' : 'Connected'}</p>
                    </div>
                  </Link>
                  <button
                    type="button"
                    onClick={() => logout()}
                    className="p-2 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    aria-label="Logout"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openAuthModal('login')}
                    className="px-4 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => openAuthModal('signup')}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-all cursor-pointer"
                  >
                    <User className="w-4 h-4" />
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-medium ${
                    isActive(link.href)
                      ? 'text-emerald-700 bg-emerald-50 font-bold'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-2 pb-1 border-t border-slate-100">
                <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Public Problem Modules
                </p>
                <div className="grid grid-cols-1 gap-1 mt-1">
                  {categoryQuickLinks.map((cat) => (
                    <Link
                      key={cat.name}
                      to={cat.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <span className="text-[10px] text-slate-400">Explore →</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100">
                {user ? (
                  <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                        {user.fullName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">{user.fullName}</p>
                        <p className="text-[10px] text-slate-500">{user.email}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg text-xs font-semibold cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal('login');
                      }}
                      className="w-full py-2.5 rounded-xl font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 text-xs text-center cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        openAuthModal('signup');
                      }}
                      className="w-full py-2.5 rounded-xl font-semibold text-white bg-slate-900 hover:bg-slate-800 text-xs text-center cursor-pointer"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
