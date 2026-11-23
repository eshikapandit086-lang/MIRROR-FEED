export type PatternCategoryId =
  | 'comparison'
  | 'urgency'
  | 'beauty_standard'
  | 'achievement_pressure'
  | 'other';

export interface PatternCategory {
  id: PatternCategoryId;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string; // Tailwind color or hex
  bgTint: string;
  borderTint: string;
  badgeColor: string;
  examples: string[];
  narrativeImpact: string;
  counterScript: string; // The gentle reframe
}

export interface AuditLogItem {
  id: string;
  categoryId: PatternCategoryId;
  timestamp: number;
  note?: string;
  customCategoryName?: string;
}

export interface AuditState {
  logs: AuditLogItem[];
  startTime: number;
  sessionGoal?: string;
}

export type ScreenState = 'landing' | 'audit' | 'map';

export interface CategorySummary {
  category: PatternCategory;
  count: number;
  percentage: number;
  notes: string[];
}

export interface NarrativeAnalysis {
  totalLogs: number;
  topCategories: CategorySummary[];
  dominantNarrative: string;
  scriptInterpretation: string;
  bodyEchoPrompt: string;
  narrativeAuthorPrompt: string;
  unseenLifePrompt: string;
  reframeInsight: string;
}
