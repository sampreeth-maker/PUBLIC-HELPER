export type CategoryId =
  | 'fake-website-protection'
  | 'natural-disaster-awareness'
  | 'suicide-prevention'
  | 'smartphone-addiction'
  | 'secure-document-storage';

export interface CategoryCardData {
  id: CategoryId;
  title: string;
  tagline: string;
  color: string;
  iconName: string;
  description: string;
  buttonText: string;
  route: string;
}

export interface ProblemItem {
  id: string;
  title: string;
  description: string;
  impact?: string;
}

export interface SolutionItem {
  id: string;
  title: string;
  steps: string[];
  recommendedAction: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export type DocumentCategory =
  | 'Aadhaar'
  | 'PAN'
  | 'Identity Documents'
  | 'Educational Certificates'
  | 'Medical Records'
  | 'Other Documents';

export interface DocumentItem {
  id: string;
  user_id?: string;
  document_name: string;
  category: DocumentCategory;
  file_path: string;
  file_type: string;
  file_size: number;
  created_at: string;
  preview_url?: string;
}

export interface DetoxDay {
  day: number;
  title: string;
  description: string;
  completed: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
}
