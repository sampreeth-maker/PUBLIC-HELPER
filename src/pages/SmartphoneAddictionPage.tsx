import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  ArrowLeft,
  CheckCircle2,
  Clock,
  BatteryCharging,
  Moon,
  Sparkles,
  Trophy,
  RotateCcw,
  AlertCircle,
  Eye,
  Activity,
  Flame,
  Award,
  Calendar,
} from 'lucide-react';
import { Accordion } from '../components/common/Accordion';
import {
  evaluateScreenTime,
  calculateDetoxProgress,
  INITIAL_DETOX_CHALLENGES,
} from '../utils/digitalWellness';
import { DetoxDay } from '../types';

export const SmartphoneAddictionPage: React.FC = () => {
  // Screen time state
  const [screenTimeInput, setScreenTimeInput] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('solvexa_screentime_hours');
      return saved ? parseFloat(saved) : 3.5;
    } catch {
      return 3.5;
    }
  });

  // Detox challenge state
  const [detoxChallenges, setDetoxChallenges] = useState<DetoxDay[]>(() => {
    try {
      const saved = localStorage.getItem('solvexa_detox_challenges');
      if (saved) return JSON.parse(saved);
      return INITIAL_DETOX_CHALLENGES.map((c) => ({
        ...c,
        completed: c.day <= 2, // 2 completed by default for demo
      }));
    } catch {
      return INITIAL_DETOX_CHALLENGES.map((c) => ({
        ...c,
        completed: c.day <= 2,
      }));
    }
  });

  useEffect(() => {
    localStorage.setItem('solvexa_screentime_hours', screenTimeInput.toString());
  }, [screenTimeInput]);

  useEffect(() => {
    localStorage.setItem('solvexa_detox_challenges', JSON.stringify(detoxChallenges));
  }, [detoxChallenges]);

  const toggleChallenge = (dayNum: number) => {
    setDetoxChallenges((prev) =>
      prev.map((c) => (c.day === dayNum ? { ...c, completed: !c.completed } : c))
    );
  };

  const resetChallenges = () => {
    setDetoxChallenges(INITIAL_DETOX_CHALLENGES.map((c) => ({ ...c, completed: false })));
  };

  const screenEval = evaluateScreenTime(screenTimeInput);
  const detoxStats = calculateDetoxProgress(detoxChallenges);

  const problems = [
    {
      title: '1. Excessive Social Media Usage',
      desc: 'Compulsive infinite scrolling on reels, shorts, and feeds driven by intermittent dopamine hits and fear of missing out (FOMO).',
      symptom: 'Losing 2–4 hours unnoticed, comparison anxiety, diminished self-esteem.',
    },
    {
      title: '2. Mobile Gaming Addiction',
      desc: 'Inability to stop gaming sessions due to predatory monetization, streak pressure, and in-game peer obligations.',
      symptom: 'Neglecting meals, financial spending on micro-transactions, irritability when interrupted.',
    },
    {
      title: '3. Reduced Concentration & Brain Fog',
      desc: 'Constant notifications fragment attention spans, impairing deep cognitive work and retention.',
      symptom: 'Switching tasks every 90 seconds, inability to finish reading books or long articles.',
    },
    {
      title: '4. Severe Sleep Disturbances',
      desc: 'Blue light emission suppresses melatonin synthesis, while stimulating late-night content prevents slow-wave restorative sleep.',
      symptom: 'Insomnia, morning fatigue, chronic daytime grogginess.',
    },
    {
      title: '5. Reduced Physical Activity & Sedentary Strain',
      desc: 'Hours of static forward neck bending (&quot;Tech Neck&quot;), lower back pain, eye strain, and lack of cardiovascular exercise.',
      symptom: 'Cervical spine compression, dry eyes, weight gain.',
    },
    {
      title: '6. Poor Academic & Work Performance',
      desc: 'Procrastination, missed deadlines, and passive video consumption replacing study hours and career advancement.',
      symptom: 'Dropping grades, uncompleted workplace projects, persistent burnout.',
    },
    {
      title: '7. Social Isolation & Phubbing',
      desc: 'Ignoring friends and family in physical presence (&quot;phone snubbing&quot; or phubbing) in favor of virtual feeds.',
      symptom: 'Deteriorating relationships, loneliness despite thousands of online followers.',
    },
  ];

  const solutions = [
    {
      title: '1. Set Daily Screen-Time Limits',
      desc: 'Establish strict daily caps on entertainment applications using native iOS Screen Time or Android Digital Wellbeing.',
    },
    {
      title: '2. Use App Timers & Focus Mode',
      desc: 'Configure automated 30-minute timers on Instagram, YouTube, and games. Enable Work Focus to silence non-critical pings.',
    },
    {
      title: '3. Avoid Smartphones Before Bedtime',
      desc: 'Keep mobile devices outside the bedroom or at least 10 feet away from the mattress 60 minutes prior to sleeping.',
    },
    {
      title: '4. Take Regular Digital Breaks',
      desc: 'Follow the 20-20-20 rule: Every 20 minutes of screen work, look at an object 20 feet away for at least 20 seconds.',
    },
    {
      title: '5. Spend More Time Outdoors',
      desc: 'Recharge natural attention networks through morning sunlight exposure, park walks, and outdoor physical sports.',
    },
    {
      title: '6. Develop Offline Hobbies',
      desc: 'Cultivate tangible interests that do not involve illuminated pixels: reading physical books, painting, cooking, or playing an instrument.',
    },
    {
      title: '7. Prioritize Face-to-Face Communication',
      desc: 'Keep phones tucked away inside bags during dining, family conversations, and gatherings to build deep interpersonal bonds.',
    },
  ];

  const habits = [
    {
      icon: Moon,
      title: 'Sleep Sanctum',
      desc: 'Use a physical analogue alarm clock rather than your smartphone so you do not start and end your day looking at a screen.',
    },
    {
      icon: Eye,
      title: 'Grayscale Mode',
      desc: 'Turn your screen display to grayscale (black and white) under Accessibility settings. Colorful app icons lose 80% of their psychological pull.',
    },
    {
      icon: BatteryCharging,
      title: 'No-Phone Meal Rule',
      desc: 'Never eat while watching videos. Mindful eating improves digestion, prevents over-consumption, and fosters real conversation.',
    },
    {
      icon: Activity,
      title: 'Batch Notification Slots',
      desc: 'Check emails and messages only at 3 designated windows daily (e.g. 10 AM, 2 PM, 6 PM) rather than reacting to every ping.',
    },
  ];

  const faqs = [
    {
      question: 'How much screen time per day is considered healthy for adults?',
      answer:
        'Health and ergonomic authorities generally recommend limiting non-occupational recreational screen time to under 2 hours daily. Excessive continuous leisure screen time exceeding 4–5 hours correlates strongly with mood disorders, sleep disturbance, and eye strain.',
    },
    {
      question: 'Why does scrolling short-form video feels so difficult to stop?',
      answer:
        'Short-form algorithms (reels, shorts, TikTok) use a variable reward schedule identical to slot machines. Each flick delivers unexpected visual dopamine, keeping the brain in anticipation of the &quot;next best video&quot; while bypassing executive self-control.',
    },
    {
      question: 'How does grayscale display mode help reduce phone usage?',
      answer:
        'App developers spend millions testing bright, warm notification badges and colorful icons specifically engineered to capture attention. Grayscale strips the stimulus, making phone displays look bland and functional like an e-reader.',
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>Pillar 04 • Digital Wellness &amp; Habit Mastery</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Smartphone Addiction &amp; Digital Wellness
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                Reclaim your attention, rebuild deep concentration, improve restorative sleep, and cultivate a healthy, balanced relationship with modern technology.
              </p>
            </div>

            <div className="shrink-0 p-5 rounded-2xl bg-blue-50 border border-blue-200 text-blue-950 max-w-xs">
              <div className="flex items-center gap-2 font-bold text-sm mb-1 text-blue-800">
                <Clock className="w-4 h-4" />
                <span>Healthy Daily Benchmark</span>
              </div>
              <p className="text-2xl font-black text-blue-600">&lt; 2.0 hrs</p>
              <p className="text-[11px] text-blue-800/90 mt-1">
                Recommended maximum daily non-work recreational screen time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* DIGITAL WELLNESS DASHBOARD */}
        <section className="bg-white rounded-2xl border border-blue-200 p-6 sm:p-9 shadow-sm space-y-10">
          <div className="border-b border-slate-200 pb-5">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Dashboard</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Personal Digital Wellness Dashboard
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Track daily smartphone hours, analyze your exposure score, and complete the 7-day digital detox challenge.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* DAILY SCREEN TIME TRACKER */}
            <div className="lg:col-span-5 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>Daily Screen-Time Tracker</span>
                </h3>
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700">
                  Local Storage
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
                  Enter Your Daily Hours: <strong className="text-blue-600 text-sm">{screenTimeInput} hrs</strong>
                </label>
                <input
                  type="range"
                  min="0.5"
                  max="12"
                  step="0.5"
                  value={screenTimeInput}
                  onChange={(e) => setScreenTimeInput(parseFloat(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 rounded-lg"
                />
                <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                  <span>0.5h (Low)</span>
                  <span>4h (Average)</span>
                  <span>8h+ (High)</span>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Exposure vs 2h Healthy Baseline:</span>
                  <span className="font-bold text-slate-900">{screenEval.percentOfHealthyLimit}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
                  <div
                    className={`h-3 rounded-full transition-all duration-300 ${
                      screenEval.status === 'OPTIMAL'
                        ? 'bg-emerald-500'
                        : screenEval.status === 'MODERATE'
                        ? 'bg-blue-500'
                        : screenEval.status === 'HIGH'
                        ? 'bg-amber-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, (screenTimeInput / 8) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Status Box */}
              <div className={`p-4 rounded-xl border ${screenEval.colorClass} space-y-1.5`}>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase tracking-wider">Status:</span>
                  <span className="font-bold text-xs">{screenEval.statusLabel}</span>
                </div>
                <p className="text-xs leading-relaxed">{screenEval.recommendation}</p>
              </div>
            </div>

            {/* 7-DAY DIGITAL DETOX CHALLENGE */}
            <div className="lg:col-span-7 p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <div>
                  <h3 className="font-bold text-base text-slate-900 flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-amber-500" />
                    <span>7-Day Digital Detox Challenge</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    Complete one intentional habit each day to rewire your digital boundaries.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className="text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded">
                      {detoxStats.streakBadge}
                    </span>
                    <span className="block text-[11px] text-slate-500 mt-0.5">
                      {detoxStats.completedCount}/{detoxStats.totalDays} Days ({detoxStats.percentage}%)
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={resetChallenges}
                    className="p-1.5 text-slate-400 hover:text-blue-600 rounded-lg hover:bg-slate-200 transition-colors"
                    title="Reset Detox Challenge"
                    aria-label="Reset challenge"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Challenge List */}
              <div className="space-y-2.5">
                {detoxChallenges.map((challenge) => (
                  <button
                    key={challenge.day}
                    type="button"
                    onClick={() => toggleChallenge(challenge.day)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                      challenge.completed
                        ? 'bg-blue-50/80 border-blue-300 text-slate-900'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                    aria-pressed={challenge.completed}
                  >
                    <span className="mt-0.5 shrink-0 text-blue-600">
                      <CheckCircle2
                        className={`w-5 h-5 ${
                          challenge.completed ? 'text-blue-600 fill-blue-100' : 'text-slate-300'
                        }`}
                      />
                    </span>
                    <div className="space-y-0.5 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">
                          Day {challenge.day}: {challenge.title}
                        </span>
                        {challenge.completed && (
                          <span className="text-[10px] font-bold text-blue-700 uppercase">Done ✓</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 leading-snug">{challenge.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Healthy Habits and Productivity Tips */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Healthy Smartphone Habits &amp; Daily Productivity Tips
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Science-backed behavioral nudges to break compulsive checking cycles.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {habits.map((h, idx) => {
              const Icon = h.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900">{h.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{h.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Seven Common Smartphone Problems */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Seven Detrimental Effects of Device Addiction
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              How unchecked screen time compromises psychological and physical well-being.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((prob, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-blue-300 transition-all space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{prob.title}</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{prob.desc}</p>
                <div className="pt-2 border-t border-slate-100 text-[11px] text-blue-800 font-medium">
                  <strong>Observable Symptom:</strong> {prob.symptom}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Solutions */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Practical Digital Wellness Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Actionable rules to restore boundaries between life and screens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((sol, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 shrink-0">
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

        {/* FAQs */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Common questions on overcoming screen dependency and regaining focus.
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
