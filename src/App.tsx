/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AuthModal } from './components/auth/AuthModal';

import { HomePage } from './pages/HomePage';
import { FakeWebsiteProtectionPage } from './pages/FakeWebsiteProtectionPage';
import { DisasterAwarenessPage } from './pages/DisasterAwarenessPage';
import { SuicidePreventionPage } from './pages/SuicidePreventionPage';
import { SmartphoneAddictionPage } from './pages/SmartphoneAddictionPage';
import { DocumentStoragePage } from './pages/DocumentStoragePage';
import { AboutPage } from './pages/AboutPage';
import { HelpPage } from './pages/HelpPage';
import { ContactPage } from './pages/ContactPage';

// Scroll to top on every route navigation
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-500 selection:text-white">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/fake-website-protection" element={<FakeWebsiteProtectionPage />} />
              <Route path="/disaster-awareness" element={<DisasterAwarenessPage />} />
              <Route path="/suicide-prevention" element={<SuicidePreventionPage />} />
              <Route path="/smartphone-addiction" element={<SmartphoneAddictionPage />} />
              <Route path="/document-storage" element={<DocumentStoragePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/help" element={<HelpPage />} />
              <Route path="/contact" element={<ContactPage />} />
              {/* Catch-all fallback */}
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
          <AuthModal />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}
