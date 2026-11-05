import { DetoxDay } from '../types';

export interface ScreenTimeEvaluation {
  hours: number;
  status: 'OPTIMAL' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  statusLabel: string;
  colorClass: string;
  percentOfHealthyLimit: number; // base 2 hours as healthy baseline
  recommendation: string;
}

export const INITIAL_DETOX_CHALLENGES: Omit<DetoxDay, 'completed'>[] = [
  { day: 1, title: 'Mindful Unlocking', description: 'Avoid unnecessary phone checking. Note down every time you reach for your phone without a clear purpose.' },
  { day: 2, title: 'Social Media Fast', description: 'Take a continuous 1-hour break from all social media and short-form video apps.' },
  { day: 3, title: 'Screen-Free Dining', description: 'Avoid using or keeping smartphones on the table during lunch and dinner.' },
  { day: 4, title: 'Nature & Motion', description: 'Spend at least 30 minutes outdoors, walking or exercising without headphones or screen distraction.' },
  { day: 5, title: 'Bedtime Curfew', description: 'Power down or turn on airplane mode on screens 60 minutes before going to sleep.' },
  { day: 6, title: 'Real Connection', description: 'Spend quality undistracted time with family or friends in person or over an audio call.' },
  { day: 7, title: 'Half-Day Digital Detox', description: 'Complete a consecutive 4-hour detox during the day without non-urgent smartphone use.' },
];

export function evaluateScreenTime(hours: number): ScreenTimeEvaluation {
  const safeHours = Math.max(0, isNaN(hours) ? 0 : hours);
  const baseline = 2; // Recommended non-work baseline
  const percent = Math.min(200, Math.round((safeHours / baseline) * 100));

  if (safeHours <= 2) {
    return {
      hours: safeHours,
      status: 'OPTIMAL',
      statusLabel: 'Mindful & Healthy',
      colorClass: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      percentOfHealthyLimit: percent,
      recommendation: 'Excellent balance! You are spending healthy time away from digital screens.',
    };
  }

  if (safeHours <= 4) {
    return {
      hours: safeHours,
      status: 'MODERATE',
      statusLabel: 'Moderate Screen Time',
      colorClass: 'text-blue-600 bg-blue-50 border-blue-200',
      percentOfHealthyLimit: percent,
      recommendation: 'Good, but watch out for mindless scrolling. Try setting 30-minute app timers on social media.',
    };
  }

  if (safeHours <= 6) {
    return {
      hours: safeHours,
      status: 'HIGH',
      statusLabel: 'High Screen Time Warning',
      colorClass: 'text-amber-600 bg-amber-50 border-amber-200',
      percentOfHealthyLimit: percent,
      recommendation: 'High digital exposure detected. This can cause eye strain, sleep disruption, and reduced focus. Consider taking 15-minute breaks every hour.',
    };
  }

  return {
    hours: safeHours,
    status: 'CRITICAL',
    statusLabel: 'Critical Usage Alert',
    colorClass: 'text-red-600 bg-red-50 border-red-200',
    percentOfHealthyLimit: percent,
    recommendation: 'Exceeds 6 hours daily. Strongly recommend scheduling screen-free slots, removing addictive apps, and turning on grayscale display mode.',
  };
}

export function calculateDetoxProgress(days: { completed: boolean }[]): {
  completedCount: number;
  totalDays: number;
  percentage: number;
  streakBadge: string;
} {
  const totalDays = days.length || 7;
  const completedCount = days.filter((d) => d.completed).length;
  const percentage = Math.round((completedCount / totalDays) * 100);

  let streakBadge = 'Getting Started';
  if (completedCount === totalDays) {
    streakBadge = 'Detox Champion! 🌟';
  } else if (completedCount >= 5) {
    streakBadge = 'Digital Master';
  } else if (completedCount >= 3) {
    streakBadge = 'Great Momentum';
  } else if (completedCount >= 1) {
    streakBadge = 'Pathfinder';
  }

  return {
    completedCount,
    totalDays,
    percentage,
    streakBadge,
  };
}
