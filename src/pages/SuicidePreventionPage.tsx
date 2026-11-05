import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  HeartHandshake,
  ArrowLeft,
  PhoneCall,
  Heart,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  MessageCircle,
} from 'lucide-react';
import { Accordion } from '../components/common/Accordion';

export const SuicidePreventionPage: React.FC = () => {
  // Breathing exercise state (4s Inhale, 7s Hold, 8s Exhale)
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathSeconds, setBreathSeconds] = useState(4);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathSeconds((prev) => {
          if (prev > 1) return prev - 1;

          // Transition phase
          if (breathPhase === 'Inhale') {
            setBreathPhase('Hold');
            return 7;
          } else if (breathPhase === 'Hold') {
            setBreathPhase('Exhale');
            return 8;
          } else {
            setBreathPhase('Inhale');
            return 4;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isBreathingActive, breathPhase]);

  const toggleBreathing = () => {
    if (!isBreathingActive) {
      setBreathPhase('Inhale');
      setBreathSeconds(4);
    }
    setIsBreathingActive(!isBreathingActive);
  };

  const resetBreathing = () => {
    setIsBreathingActive(false);
    setBreathPhase('Inhale');
    setBreathSeconds(4);
  };

  const problems = [
    {
      title: '1. Depression & Deep Emotional Distress',
      desc: 'Persistent sadness, emptiness, or feelings of hopelessness that make daily tasks feel insurmountable.',
      support: 'Compassionate counseling, clinical psychiatric evaluation, structured routine.',
    },
    {
      title: '2. Loneliness & Social Isolation',
      desc: 'The feeling of being misunderstood, having no one to turn to, or feeling disconnected from community and peers.',
      support: 'Peer support groups, community engagement, regular phone or in-person check-ins.',
    },
    {
      title: '3. Academic & Career Pressure',
      desc: 'Overwhelming anxiety stemming from competitive examinations, parental expectations, job loss, or fear of failure.',
      support: 'Academic guidance, career re-orientation, decoupling personal self-worth from exam scores.',
    },
    {
      title: '4. Family & Relationship Breakdown',
      desc: 'Intense conflict, divorce, bereavement, domestic strain, or the painful end of important relationships.',
      support: 'Family therapy, safe spaces, trusted mentorship, mediator support.',
    },
    {
      title: '5. Financial Stress & Debt Burden',
      desc: 'Crushing financial difficulties, sudden business loss, or unmanageable loans causing immense mental fatigue.',
      support: 'Debt counseling, community welfare networks, mental health crisis hotlines.',
    },
    {
      title: '6. Bullying, Harassment & Discrimination',
      desc: 'Persistent psychological trauma caused by school bullying, workplace toxicity, cyberbullying, or social discrimination.',
      support: 'Institutional redressal mechanisms, legal reporting, affirming peer networks.',
    },
  ];

  const solutions = [
    {
      title: '1. Encourage Open Conversations Without Judgment',
      desc: 'Create safe, confidential spaces where individuals can share their pain without fear of criticism, moral judgment, or dismissal.',
    },
    {
      title: '2. Listen With Deep Empathy',
      desc: 'Offer a compassionate ear without rushing to give unsolicited advice or saying &quot;look on the bright side&quot;. Acknowledging pain validates human dignity.',
    },
    {
      title: '3. Reach Out to Trusted Family & Friends',
      desc: 'Speaking with someone you trust can break the heavy cycle of rumination and remind you that you do not have to carry everything alone.',
    },
    {
      title: '4. Seek Qualified Mental Health Professionals',
      desc: 'Psychologists and psychiatrists provide evidence-based psychotherapy (CBT, DBT) and medical care tailored to healing.',
    },
    {
      title: '5. Connect With Crisis Support Services',
      desc: 'Trained tele-counselors on India’s national Tele-MANAS hotline (14416) are ready 24/7 in multiple languages to de-escalate crisis moments.',
    },
    {
      title: '6. Promote Mental Health Education & De-stigmatization',
      desc: 'Normalizing discussions around mental wellness encourages early intervention before emotional distress becomes severe.',
    },
  ];

  const faqs = [
    {
      question: 'What is Tele-MANAS, and is the call confidential?',
      answer:
        'Tele-MANAS (14416) is the Government of India’s 24/7 comprehensive tele-mental health helpline, operated by the Ministry of Health and Family Welfare with apex guidance from NIMHANS. The service is free, available in over 20 languages, and strictly confidential.',
    },
    {
      question: 'What should I do if a friend or family member expresses suicidal thoughts?',
      answer:
        'Take them seriously. Stay calm and stay with them. Listen without judgment, express your care, and avoid arguing or minimizing their feelings. Help connect them with a trusted family member, healthcare professional, or call 14416 / 112 together.',
    },
    {
      question: 'Does talking about suicide encourage someone to attempt it?',
      answer:
        'No. Medical consensus confirms that asking directly and compassionately (&quot;Are you having thoughts of hurting yourself?&quot;) reduces stigma, relieves intense internal pressure, and opens the door for life-saving professional help.',
    },
    {
      question: 'Is SOLVEXA a replacement for therapy or emergency care?',
      answer:
        'No. SOLVEXA is strictly an educational awareness and directory platform. In any active emergency or imminent danger, immediately dial 112, call Tele-MANAS at 14416, or visit the nearest hospital emergency department.',
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Pillar 03 • Mental Health &amp; Crisis Support</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Suicide Prevention &amp; Mental Health Support
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                Promote emotional wellness, compassion without judgment, and swift access to professional crisis assistance. Your life and well-being matter deeply.
              </p>
            </div>

            <div className="shrink-0 p-5 rounded-2xl bg-purple-50 border border-purple-200 text-purple-950 max-w-xs">
              <div className="flex items-center gap-2 font-bold text-sm mb-1 text-purple-800">
                <PhoneCall className="w-4 h-4" />
                <span>Tele-MANAS Mental Health</span>
              </div>
              <p className="text-2xl font-black text-purple-600">14416</p>
              <p className="text-[11px] text-purple-800/90 mt-1">
                Toll-free 24/7 mental health counseling in 20+ languages across India.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* PROMINENT YOU ARE NOT ALONE SECTION */}
        <section className="bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-7">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-xs text-white text-xs font-bold uppercase tracking-wider">
              <Heart className="w-4 h-4 text-purple-200 fill-purple-200" />
              <span>Compassionate Crisis Support</span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                YOU ARE NOT ALONE
              </h2>
              <p className="text-base sm:text-lg text-purple-100 max-w-3xl leading-relaxed">
                Whatever pain, burden, or exhaustion you are carrying right now, you do not have to carry it in silence. There are trained, compassionate people ready to listen and support you without judgment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
              <div className="bg-white/10 backdrop-blur-xs p-6 rounded-2xl border border-white/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-white text-purple-900 font-extrabold flex items-center justify-center text-sm">
                  01
                </div>
                <h4 className="font-bold text-base text-white">Call Tele-MANAS (14416)</h4>
                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                  Connect immediately with a certified counselor in your preferred language. Free, 24/7, and confidential.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-6 rounded-2xl border border-white/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-white text-purple-900 font-extrabold flex items-center justify-center text-sm">
                  02
                </div>
                <h4 className="font-bold text-base text-white">Reach Out to a Trusted Person</h4>
                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                  Call or text a family member, close friend, teacher, or mentor. Tell them honestly: &quot;I am going through a difficult time and need someone to be with me.&quot;
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-6 rounded-2xl border border-white/20 space-y-3">
                <div className="w-8 h-8 rounded-lg bg-white text-purple-900 font-extrabold flex items-center justify-center text-sm">
                  03
                </div>
                <h4 className="font-bold text-base text-white">Immediate Danger: Call 112</h4>
                <p className="text-xs sm:text-sm text-purple-100 leading-relaxed">
                  If you or someone you know is in immediate danger of self-harm, call 112 immediately or visit the nearest hospital emergency department.
                </p>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                href="tel:14416"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-purple-900 font-bold text-sm sm:text-base hover:bg-purple-50 shadow-lg transition-all"
              >
                <PhoneCall className="w-5 h-5 text-purple-700" />
                <span>Call Tele-MANAS: 14416</span>
              </a>

              <a
                href="tel:112"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-purple-950/80 text-white font-bold text-sm sm:text-base hover:bg-black transition-all border border-white/25"
              >
                <PhoneCall className="w-5 h-5" />
                <span>Emergency Services: 112</span>
              </a>

              <a
                href="https://mohfw.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-purple-200 hover:text-white underline underline-offset-4"
              >
                <span>Official Tele-MANAS Portal (MOHFW)</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>

        {/* Guided 4-7-8 Breathing & Calming Grounding Exercise */}
        <section className="bg-white rounded-2xl border border-purple-200 p-6 sm:p-8 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mindfulness &amp; In-the-Moment Grounding</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                4-7-8 Calming Breath Exercise
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                When nervous system arousal peaks during panic or distress, controlled rhythmic breathing activates the parasympathetic vagus nerve, reducing heart rate and physical tension.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={toggleBreathing}
                  className="px-5 py-2.5 rounded-xl font-bold text-white bg-purple-600 hover:bg-purple-700 text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer"
                >
                  {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  <span>{isBreathingActive ? 'Pause Breath Guide' : 'Start 4-7-8 Breathing'}</span>
                </button>
                <button
                  type="button"
                  onClick={resetBreathing}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                  aria-label="Reset Breathing"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Breathing Visualizer */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-purple-50/50 rounded-2xl border border-purple-100">
              <div
                className={`w-40 h-40 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-lg ${
                  breathPhase === 'Inhale'
                    ? 'scale-110 bg-purple-600 text-white shadow-purple-500/30'
                    : breathPhase === 'Hold'
                    ? 'scale-110 bg-indigo-600 text-white shadow-indigo-500/30'
                    : 'scale-95 bg-purple-100 text-purple-900 border-2 border-purple-300'
                }`}
              >
                <span className="text-xs font-extrabold uppercase tracking-widest opacity-80">
                  {breathPhase}
                </span>
                <span className="text-4xl font-black mt-1">{breathSeconds}s</span>
              </div>
              <p className="text-xs text-slate-500 mt-4 text-center">
                {breathPhase === 'Inhale' && 'Slowly breathe in through your nose (4 seconds)...'}
                {breathPhase === 'Hold' && 'Gently hold your breath calmly (7 seconds)...'}
                {breathPhase === 'Exhale' && 'Slowly release breath completely through your mouth (8 seconds)...'}
              </p>
            </div>
          </div>
        </section>

        {/* How Friends and Family Can Support Someone */}
        <section className="bg-white p-7 sm:p-9 rounded-2xl border border-purple-200 space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              How Friends &amp; Family Can Support Someone in Distress
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Guidelines for listening with empathy, spotting subtle warning signs, and responding safely.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-3">
              <h4 className="font-bold text-base text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Helpful &amp; Supportive Actions (Do This)</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-emerald-950">
                <li>• <strong>Ask directly and gently:</strong> &quot;I care about you, and I notice you seem overwhelmed. How are you holding up?&quot;</li>
                <li>• <strong>Validate their feelings:</strong> Say &quot;It makes complete sense that you feel exhausted right now.&quot;</li>
                <li>• <strong>Stay present:</strong> Sit with them in silence if they cannot speak. Physical or emotional presence is anchoring.</li>
                <li>• <strong>Help remove immediate dangers:</strong> Secure medications or unsafe items calmly.</li>
                <li>• <strong>Encourage professional counseling:</strong> Offer to sit beside them while dialing 14416.</li>
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-3">
              <h4 className="font-bold text-base text-rose-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span>What to Avoid (Do Not Do This)</span>
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-rose-950">
                <li>• <strong>Do not minimize their pain:</strong> Avoid saying &quot;Others have it worse&quot; or &quot;You have so much to be grateful for.&quot;</li>
                <li>• <strong>Do not argue or lecture:</strong> Avoid debating whether their problems are &quot;big enough&quot; or lecturing on morals.</li>
                <li>• <strong>Do not promise total secrecy:</strong> If someone&apos;s life is in danger, you must involve trusted professionals or family.</li>
                <li>• <strong>Do not leave them alone:</strong> If they express immediate intent, stay with them until help arrives.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Six Common Mental Health Challenges */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Six Common Psychological Challenges
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Understanding the roots of emotional distress helps de-stigmatize mental healthcare.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((p, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-purple-300 transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-purple-900 font-medium">
                  <strong>Path to Support:</strong> {p.support}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Solutions */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Practical Emotional &amp; Community Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Actions you can take today for yourself or for someone in your circle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((sol, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 shrink-0">
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

        {/* Important Disclaimer Card */}
        <section className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-950 text-xs sm:text-sm flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block text-amber-900 font-bold mb-1">
              Important Medical &amp; Emergency Disclaimer:
            </strong>
            SOLVEXA is a public awareness platform and is not a licensed healthcare provider, therapy clinic, or replacement for professional medical diagnosis, emergency interventions, or psychiatric treatment. If you or someone you know is in immediate crisis, contact emergency services at <strong>112</strong> or call the <strong>Tele-MANAS hotline at 14416</strong> right now.
          </div>
        </section>

        {/* FAQs */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Common questions about crisis support, counseling, and confidentiality.
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
