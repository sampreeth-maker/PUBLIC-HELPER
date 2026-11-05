import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CloudLightning,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  PhoneCall,
  ExternalLink,
  Shield,
  LifeBuoy,
  Flame,
  Waves,
  Wind,
  Compass,
  CheckSquare,
  Square,
  RotateCcw,
} from 'lucide-react';
import { Accordion } from '../components/common/Accordion';

interface ChecklistItem {
  id: string;
  label: string;
  category: 'Essential Survival' | 'Medical & Health' | 'Identity & Tech';
}

const DEFAULT_CHECKLIST: ChecklistItem[] = [
  { id: 'water', label: 'Drinking water: Minimum 3 liters per person per day for 3 days', category: 'Essential Survival' },
  { id: 'food', label: 'Non-perishable food items (dry rations, canned food, energy bars)', category: 'Essential Survival' },
  { id: 'flashlight', label: 'Waterproof LED flashlight with extra alkaline batteries', category: 'Essential Survival' },
  { id: 'whistle', label: 'Emergency whistle to signal rescue personnel under debris or floodwaters', category: 'Essential Survival' },
  { id: 'firstaid', label: 'First aid kit: Antiseptic, sterile bandages, burn cream, thermometer', category: 'Medical & Health' },
  { id: 'meds', label: '7-day supply of personal prescription medicines (asthma, BP, diabetes)', category: 'Medical & Health' },
  { id: 'docs', label: 'Waterproof ziplock pouch with laminated Aadhaar, PAN, insurance & deeds', category: 'Identity & Tech' },
  { id: 'powerbank', label: 'Fully charged 20,000mAh power bank and durable charging cables', category: 'Identity & Tech' },
  { id: 'cash', label: 'Emergency physical cash in small denominations (ATMs lose power during disasters)', category: 'Identity & Tech' },
  { id: 'radio', label: 'Battery or hand-crank portable radio for official AM/FM disaster bulletins', category: 'Essential Survival' },
];

export const DisasterAwarenessPage: React.FC = () => {
  const [checkedIds, setCheckedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('solvexa_disaster_checklist');
      return saved ? JSON.parse(saved) : ['water', 'flashlight', 'docs'];
    } catch {
      return ['water', 'flashlight', 'docs'];
    }
  });

  useEffect(() => {
    localStorage.setItem('solvexa_disaster_checklist', JSON.stringify(checkedIds));
  }, [checkedIds]);

  const toggleCheck = (id: string) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetChecklist = () => {
    setCheckedIds([]);
  };

  const completionPercentage = Math.round((checkedIds.length / DEFAULT_CHECKLIST.length) * 100);

  const problems = [
    {
      title: '1. Floods & Flash Floods',
      desc: 'Rapid inundation of settlements caused by torrential cloudbursts, swollen rivers, dam discharges, or urban drainage collapse.',
      hazard: 'Waterborne diseases, structural collapse, electrocution risks.',
      icon: Waves,
    },
    {
      title: '2. Earthquakes & Tremors',
      desc: 'Sudden tectonic fault slippages causing violent ground shaking that collapses unreinforced masonry, bridges, and infrastructure.',
      hazard: 'Trapped survivors beneath debris, gas leaks, falling glass.',
      icon: Compass,
    },
    {
      title: '3. Cyclones & Coastal Storm Surges',
      desc: 'Extreme tropical vortexes delivering winds exceeding 120–200 km/h, seawater inundation of coastal villages, and widespread grid destruction.',
      hazard: 'Roofing tear-off, uprooted trees, total communication blackouts.',
      icon: Wind,
    },
    {
      title: '4. Landslides & Mudflows',
      desc: 'Saturated hill slopes giving way under prolonged monsoon rainfall or seismic vibration, burying roads, homes, and transport corridors.',
      hazard: 'Isolation of remote communities, rapid fatalities along mountain passes.',
      icon: AlertTriangle,
    },
    {
      title: '5. Tsunamis & Tidal Waves',
      desc: 'Massive undersea earthquake displacements triggering high-velocity ocean surges that devastate coastal settlements without advance visual warning.',
      hazard: 'Catastrophic maritime devastation, drowning, shoreline destruction.',
      icon: Waves,
    },
    {
      title: '6. Severe Storms & Extreme Heatwaves',
      desc: 'Intense lightning storms, hail, and wet-bulb heatwaves exceeding 45°C that push human thermoregulation beyond survivable thresholds.',
      hazard: 'Heat strokes, dehydration, wildfires, livestock mortality.',
      icon: Flame,
    },
  ];

  const solutions = [
    {
      title: '1. Follow Official Weather Alerts',
      desc: 'Rely exclusively on alerts issued by the India Meteorological Department (IMD) and State Disaster Management Authorities (SDMA). Avoid unverified social media forwards.',
    },
    {
      title: '2. Prepare an Emergency Kit in Advance',
      desc: 'Keep a pre-packed, grab-and-go waterproof bag containing essential food rations, pure water, medical kits, and portable batteries.',
    },
    {
      title: '3. Identify Safe Evacuation Routes',
      desc: 'Map out at least two elevated escape routes from your neighborhood to designated government relief shelters or sturdy high-ground buildings.',
    },
    {
      title: '4. Keep Emergency Contacts Available',
      desc: 'Write down key phone numbers on physical paper (National Emergency 112, NDRF, local hospital, nearest relatives) inside a waterproof pouch.',
    },
    {
      title: '5. Move to Safer Locations When Instructed',
      desc: 'Evacuate promptly when civic authorities order mandatory relocation. Delaying evacuation endangers both your family and rescue crews.',
    },
    {
      title: '6. Follow Disaster Management Authorities',
      desc: 'Adhere strictly to official advisories from NDRF, Civil Defence volunteers, and district magistrates until an official &quot;All Clear&quot; announcement is broadcast.',
    },
  ];

  const faqs = [
    {
      question: 'What is the universal emergency number for disaster rescue in India?',
      answer:
        'Dial 112 from any mobile or landline across India. It routes directly to the Emergency Response Support System (ERSS), coordinating police, fire services, ambulance, and disaster rescue teams.',
    },
    {
      question: 'What should I do during an earthquake if I am inside a multi-story building?',
      answer:
        'Drop, Cover, and Hold On! Drop to your hands and knees, take cover under a sturdy desk or table, and protect your head and neck with your arms. Never use elevators during or immediately after tremors.',
    },
    {
      question: 'How do I protect important documents from flood or rain damage?',
      answer:
        'Store original papers inside heavy-duty waterproof ziplock pouches in an elevated container. Maintain encrypted digital backups in SOLVEXA Document Storage for quick access from any relief center.',
    },
    {
      question: 'Why should I never walk or drive through moving floodwaters?',
      answer:
        'Just 15 cm (6 inches) of moving water can knock down an adult, and 30 cm (1 foot) can sweep away a car. Floodwaters also conceal collapsed manholes, live downed electric wires, and toxic sewage.',
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
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider">
                <CloudLightning className="w-4 h-4" />
                <span>Pillar 02 • Emergency Preparedness & Climate Resilience</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                Natural Disaster Awareness
              </h1>
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                Learn practical survival measures, emergency responses, and structured recovery strategies for floods, earthquakes, cyclones, and extreme hazards.
              </p>
            </div>

            <div className="shrink-0 p-5 rounded-2xl bg-orange-50 border border-orange-200 text-orange-950 max-w-xs">
              <div className="flex items-center gap-2 font-bold text-sm mb-1 text-orange-800">
                <PhoneCall className="w-4 h-4" />
                <span>All-India Disaster Hotline</span>
              </div>
              <p className="text-2xl font-black text-orange-600">112</p>
              <p className="text-[11px] text-orange-800/90 mt-1">
                Emergency Response Support System (ERSS) for immediate police, fire, &amp; NDRF rescue.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Disaster Preparedness: Before, During, After Section */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
              Action Plan
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Three-Phase Disaster Preparedness
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Actions taken before, during, and after an event determine survival outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {/* BEFORE CARD */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-orange-100">
                <span className="px-3 py-1 rounded-full bg-orange-600 text-white font-black text-xs uppercase tracking-wider">
                  PHASE 1: BEFORE
                </span>
                <span className="text-xs font-bold text-orange-700">Readiness</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Proactive Preparation</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Prepare an emergency kit:</strong> Stock 3 days of water, dry food, first aid, and batteries.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Identify evacuation routes:</strong> Locate nearby shelters and community safe zones.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Keep documents protected:</strong> Secure papers in waterproof bags and encrypted cloud storage.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                  <span><strong>Save emergency contacts:</strong> Store 112, NDRF, and close family on offline lists.</span>
                </li>
              </ul>
            </div>

            {/* DURING CARD */}
            <div className="bg-white rounded-2xl border-2 border-orange-400 p-6 sm:p-7 shadow-md hover:shadow-xl transition-all space-y-4 bg-orange-50/20">
              <div className="flex items-center justify-between pb-3 border-b border-orange-200">
                <span className="px-3 py-1 rounded-full bg-orange-700 text-white font-black text-xs uppercase tracking-wider">
                  PHASE 2: DURING
                </span>
                <span className="text-xs font-bold text-orange-800">Survival</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Active Survival</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
                  <span><strong>Stay calm:</strong> Panic impairs rational decision making. Guide children and elderly relatives calmly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
                  <span><strong>Follow official warnings:</strong> Monitor verified broadcast channels and sirens.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
                  <span><strong>Move to safe locations:</strong> Seek higher ground during floods or sturdy interior walls during quakes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-orange-700 shrink-0 mt-0.5" />
                  <span><strong>Avoid flooded roads &amp; areas:</strong> Never attempt to walk or drive through surging currents or downed wires.</span>
                </li>
              </ul>
            </div>

            {/* AFTER CARD */}
            <div className="bg-white rounded-2xl border-2 border-orange-200 p-6 sm:p-7 shadow-xs hover:shadow-lg transition-all space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-orange-100">
                <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-black text-xs uppercase tracking-wider">
                  PHASE 3: AFTER
                </span>
                <span className="text-xs font-bold text-slate-700">Recovery</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Safe Recovery</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                  <span><strong>Avoid damaged buildings:</strong> Beware structural instability, cracked walls, and electrical hazards.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                  <span><strong>Follow official instructions:</strong> Wait for official civil defense clearance before returning home.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                  <span><strong>Seek medical assistance:</strong> Treat injuries immediately and report casualties to relief camps.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0 mt-0.5" />
                  <span><strong>Contact family members:</strong> Use SMS or emergency status tags to conserve phone network bandwidth.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interactive Emergency Checklist */}
        <section className="bg-white rounded-2xl border border-orange-200 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-orange-100 text-orange-800 text-xs font-bold uppercase tracking-wider mb-2">
                <LifeBuoy className="w-3.5 h-3.5" />
                <span>Interactive Emergency Checklist</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Household Emergency Go-Bag Kit
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Check off items packed in your grab-and-go kit. Your progress is automatically stored locally in your browser.
              </p>
            </div>

            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <span className="text-2xl font-black text-orange-600">{completionPercentage}%</span>
                <span className="block text-[11px] text-slate-500 font-medium">Ready ({checkedIds.length}/{DEFAULT_CHECKLIST.length})</span>
              </div>
              <button
                type="button"
                onClick={resetChecklist}
                className="p-2 text-slate-400 hover:text-orange-600 rounded-lg hover:bg-orange-50 transition-colors"
                title="Reset Checklist"
                aria-label="Reset emergency checklist"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-100 rounded-full h-2.5 my-6 overflow-hidden">
            <div
              className="bg-orange-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          {/* Items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {DEFAULT_CHECKLIST.map((item) => {
              const isChecked = checkedIds.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleCheck(item.id)}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 cursor-pointer ${
                    isChecked
                      ? 'bg-orange-50/70 border-orange-300 text-slate-900'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                  }`}
                  aria-pressed={isChecked}
                >
                  <span className="mt-0.5 shrink-0 text-orange-600">
                    {isChecked ? <CheckSquare className="w-5 h-5 text-orange-600" /> : <Square className="w-5 h-5 text-slate-400" />}
                  </span>
                  <div className="space-y-0.5">
                    <span className="text-xs sm:text-sm font-medium leading-relaxed block">
                      {item.label}
                    </span>
                    <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-100/80 px-1.5 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Six Major Disaster Problems */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Six Common Natural Hazards
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Geographic vulnerability patterns and hazard dynamics across regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {problems.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:border-orange-300 transition-all space-y-3"
                >
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{p.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                  <div className="pt-2 border-t border-slate-100 text-[11px] text-orange-800 font-medium">
                    <strong>Primary Danger:</strong> {p.hazard}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Practical Solutions */}
        <section className="space-y-6">
          <div className="border-b border-slate-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Practical Disaster Solutions
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-1">
              Follow these six life-saving rules to safeguard your household and neighborhood.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {solutions.map((sol, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex items-start gap-4"
              >
                <div className="p-2.5 rounded-xl bg-orange-50 text-orange-600 shrink-0">
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

        {/* Official Resources & Emergency Contacts */}
        <section className="bg-white p-7 sm:p-8 rounded-2xl border border-slate-200 space-y-4">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Official Indian Disaster Management Portals
          </h3>
          <p className="text-sm text-slate-600">
            Rely exclusively on government warnings and real-time meteorological radar telemetry.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <a
              href="https://ndma.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/40 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-700">
                  NDMA (National Disaster Management Authority)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Guidelines & disaster relief</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-600 shrink-0 ml-2" />
            </a>

            <a
              href="https://mausam.imd.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/40 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-700">
                  IMD Mausam (Weather Dept)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Real-time cyclone & rainfall radar</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-600 shrink-0 ml-2" />
            </a>

            <a
              href="https://ndrf.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-xl border border-slate-200 hover:border-orange-300 hover:bg-orange-50/40 transition-all flex items-center justify-between group"
            >
              <div>
                <h4 className="font-bold text-sm text-slate-900 group-hover:text-orange-700">
                  NDRF (Disaster Response Force)
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">Specialized rescue battalions</p>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-orange-600 shrink-0 ml-2" />
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
              Disaster preparedness, shelter locations, and post-calamity recovery.
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
