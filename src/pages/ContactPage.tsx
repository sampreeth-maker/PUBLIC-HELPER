import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  ArrowLeft,
  Send,
  AlertCircle,
  CheckCircle2,
  PhoneCall,
  MessageSquare,
  Building,
  Info,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [statusMessage, setStatusMessage] = useState<{
    type: 'info' | 'error';
    title: string;
    description: string;
  } | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!name.trim()) errs.name = 'Please provide your full name.';
    if (!email.trim() || !email.includes('@')) errs.email = 'Please provide a valid email address.';
    if (!subject.trim()) errs.subject = 'Please enter a message subject.';
    if (!message.trim() || message.trim().length < 10)
      errs.message = 'Please enter a message with at least 10 characters.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      // Strictly honest behavior as requested:
      // "If no backend email service is configured, clearly explain that the message has not been sent rather than showing a false success."
      setStatusMessage({
        type: 'info',
        title: 'Backend Mail Dispatcher Not Configured',
        description:
          'Your form was validated successfully. However, no live backend SMTP or transactional email provider (such as Resend or SendGrid) is provisioned in the current environment. Therefore, your message has NOT been dispatched over email. If you need urgent assistance, please contact the official toll-free emergency numbers directly.',
      });
    }, 600);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-800">
      {/* Header */}
      <section className="bg-white border-b border-slate-200 pt-12 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <Mail className="w-4 h-4 text-emerald-600" />
            <span>Citizen Feedback &amp; Inquiries</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact SOLVEXA
          </h1>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Have questions, partnership inquiries, or suggestions for improving our public problem-solving modules? Reach out to our civic initiative.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-white p-7 sm:p-9 rounded-2xl border border-slate-200 shadow-xs space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Send a Message</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                All fields are validated. In adherence to transparency, we clearly disclose backend email dispatch status.
              </p>
            </div>

            {statusMessage && (
              <div
                className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed ${
                  statusMessage.type === 'info'
                    ? 'bg-blue-50 border-blue-200 text-blue-900'
                    : 'bg-red-50 border-red-200 text-red-900'
                }`}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  <Info className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>{statusMessage.title}</span>
                </div>
                <p>{statusMessage.description}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sampreeth Goud"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                    errors.name ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-emerald-500'
                  }`}
                />
                {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="you@domain.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors({ ...errors, email: '' });
                  }}
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                    errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-emerald-500'
                  }`}
                />
                {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Suggestion for Cyber Deception Module"
                  value={subject}
                  onChange={(e) => {
                    setSubject(e.target.value);
                    if (errors.subject) setErrors({ ...errors, subject: '' });
                  }}
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                    errors.subject ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-emerald-500'
                  }`}
                />
                {errors.subject && <p className="text-xs text-red-600 mt-1">{errors.subject}</p>}
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Message Details *
                </label>
                <textarea
                  rows={5}
                  placeholder="Describe your inquiry, feedback, or suggestion in detail..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  className={`w-full px-4 py-2.5 text-sm bg-slate-50 border rounded-xl focus:outline-none focus:bg-white transition-all ${
                    errors.message ? 'border-red-400 bg-red-50/20' : 'border-slate-200 focus:border-emerald-500'
                  }`}
                />
                {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Right Column: Emergency Warning & Helplines */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Urgent Emergency Notice</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
                <strong>Do NOT use this contact form for active emergencies, acute mental health crises, or ongoing financial theft!</strong>
              </p>
              <p className="text-xs text-amber-900 leading-relaxed">
                Contact forms are not monitored in real time. For immediate assistance, use the official toll-free telephone helplines below.
              </p>
            </div>

            <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-5 shadow-lg">
              <h3 className="text-base font-bold text-white">Immediate Helpline Access</h3>

              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-red-400 font-bold uppercase">Cyber Financial Fraud</p>
                    <p className="text-lg font-black text-white">1930</p>
                  </div>
                  <a
                    href="tel:1930"
                    className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-bold text-xs hover:bg-red-500"
                  >
                    Call
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-orange-400 font-bold uppercase">National Emergency / Police / Fire</p>
                    <p className="text-lg font-black text-white">112</p>
                  </div>
                  <a
                    href="tel:112"
                    className="px-3 py-1.5 rounded-lg bg-orange-600 text-white font-bold text-xs hover:bg-orange-500"
                  >
                    Call
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-white/10 border border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-purple-400 font-bold uppercase">Tele-MANAS Mental Health</p>
                    <p className="text-lg font-black text-white">14416</p>
                  </div>
                  <a
                    href="tel:14416"
                    className="px-3 py-1.5 rounded-lg bg-purple-600 text-white font-bold text-xs hover:bg-purple-500"
                  >
                    Call
                  </a>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 space-y-2">
              <h4 className="text-sm font-bold text-slate-900">Civic Initiative Address</h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                SOLVEXA Public Awareness Project<br />
                Autonomous Civic Technology Initiative<br />
                Email inquiries: <code>contact@solvexa.org</code>
              </p>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="pt-12 text-center">
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
