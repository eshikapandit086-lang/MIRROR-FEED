import { PatternCategory, PatternCategoryId, AuditLogItem, NarrativeAnalysis } from '../types';

export const PATTERN_CATEGORIES: Record<PatternCategoryId, PatternCategory> = {
  comparison: {
    id: 'comparison',
    title: 'Comparison',
    subtitle: '"Someone else has, is, or does more than me"',
    tagline: 'The Highlight Reel Contrast',
    description: 'Content highlighting another person’s vacation, relationship status, financial milestone, or seamless life that invites subconscious self-ranking.',
    iconName: 'Scale',
    accentColor: '#B4654A', // Terracotta / Warm Clay
    bgTint: '#FBF3EE',
    borderTint: '#EEDCD2',
    badgeColor: 'bg-[#F4DFD3] text-[#7A331E]',
    examples: [
      'Lifestyle & travel reels showing effortless luxury',
      'Peer announcements making you calculate your timeline',
      'Romantic or social circle highlight reels',
      'Curated "a day in my life" showing friction-free living',
    ],
    narrativeImpact: 'Quietly insists your pace is insufficient and your ordinary days are deficient.',
    counterScript: 'Algorithms show curated peaks, not backstage realities. Your life is not a race against a montage.',
  },
  urgency: {
    id: 'urgency',
    title: 'Urgency',
    subtitle: '"Act now, you’re falling behind"',
    tagline: 'The Manufactured Panic',
    description: 'Framing trends, career moves, or biological timelines as emergency deadlines you must urgently meet or miss out on.',
    iconName: 'Clock',
    accentColor: '#B57B36', // Warm Amber / Mustard Ochre
    bgTint: '#FCF8EE',
    borderTint: '#F2E8CD',
    badgeColor: 'bg-[#F9ECC9] text-[#734A14]',
    examples: [
      '"If you are in your 20s and not doing this..." warnings',
      'Flash trends demanding instant consumer reaction',
      'Career anxiety posts warning of rapid obsolescence',
      'Viral panic over micro-habits or aging milestones',
    ],
    narrativeImpact: 'Keeps your nervous system in low-grade fight-or-flight so you stay hooked to the stream.',
    counterScript: 'True personal growth unfolds in seasons, not algorithmic sprint cycles.',
  },
  beauty_standard: {
    id: 'beauty_standard',
    title: 'Beauty Standard',
    subtitle: '"Appearance as the measure of worth"',
    tagline: 'The Aesthetic Evaluation',
    description: 'Subtle or overt messaging that looks, body shapes, filtered textures, and "glow-up" regimens are the gateway to being loved and respected.',
    iconName: 'Sparkles',
    accentColor: '#A8576A', // Dusty Rose / Mauve Wine
    bgTint: '#FAF2F4',
    borderTint: '#F0D8DF',
    badgeColor: 'bg-[#F4D9E2] text-[#692437]',
    examples: [
      '12-step morning aesthetic routine videos',
      'Subtle filter warping facial symmetry and poreless skin',
      '"What I eat in a day" disguised diet culture',
      'Micro-trend facial features or body optimization tips',
    ],
    narrativeImpact: 'Reduces your rich human presence down to an aesthetic object awaiting public appraisal.',
    counterScript: 'Your body is an instrument for living and feeling, not an ornament for the public eye.',
  },
  achievement_pressure: {
    id: 'achievement_pressure',
    title: 'Achievement Pressure',
    subtitle: '"Success as constant and visible"',
    tagline: 'The Relentless Optimization',
    description: 'Monetizing every hobby, 5 AM morning hustle routines, and glorifying burnout as proof of personal discipline.',
    iconName: 'TrendingUp',
    accentColor: '#5D4F78', // Deep Plum / Slate Purple
    bgTint: '#F5F3F9',
    borderTint: '#E2DEEE',
    badgeColor: 'bg-[#E5E0F2] text-[#3B2F57]',
    examples: [
      'Hustle culture videos mocking rest as laziness',
      'Monetize-your-passions productivity coaching',
      'Young tech/finance founders showcasing 80-hour grind',
      'Constant life-tracking, bio-hacking, and output obsession',
    ],
    narrativeImpact: 'Convinces you that unconditional rest is guilt-inducing and worth must be earned every hour.',
    counterScript: 'Rest is biological maintenance and joy is allowed to exist without producing capital.',
  },
  other: {
    id: 'other',
    title: 'Other Narrative',
    subtitle: '"Free text or your detected pattern"',
    tagline: 'Custom Feed Script',
    description: 'Any other subconscious script: moral perfectionism, doomscrolling news, consumerism triggers, or surveillance worry.',
    iconName: 'Bookmark',
    accentColor: '#526E63', // Soft Sage / Deep Eucalyptus
    bgTint: '#F2F6F4',
    borderTint: '#D7E5DF',
    badgeColor: 'bg-[#DEECE6] text-[#294B3F]',
    examples: [
      'Algorithmic doomscrolling & perpetual outrage',
      'Targeted consumer shopping that invents new insecurities',
      'Hyper-specific self-diagnoses and identity labeling',
      'Curated domesticity or romantic idealization',
    ],
    narrativeImpact: 'Creates subtle emotional gravity that shifts how you think about your daily choices.',
    counterScript: 'Noticing the script is the first step to authoring your own thoughts.',
  },
};

// Preset demo scenarios for screen recordings and pitch presentations
export const DEMO_PRESET_LOGS: AuditLogItem[] = [
  {
    id: 'demo-1',
    categoryId: 'beauty_standard',
    timestamp: Date.now() - 1000 * 60 * 12,
    note: 'Video showing "correcting your facial symmetry" morning routine',
  },
  {
    id: 'demo-2',
    categoryId: 'achievement_pressure',
    timestamp: Date.now() - 1000 * 60 * 9,
    note: 'Post: "If you don’t have 3 income streams by 22 you are behind"',
  },
  {
    id: 'demo-3',
    categoryId: 'comparison',
    timestamp: Date.now() - 1000 * 60 * 7,
    note: 'College classmate posting Amalfi coast trip with seamless aesthetic',
  },
  {
    id: 'demo-4',
    categoryId: 'beauty_standard',
    timestamp: Date.now() - 1000 * 60 * 5,
    note: 'Targeted ad for collagen drops telling me my skin is aging prematurely',
  },
  {
    id: 'demo-5',
    categoryId: 'urgency',
    timestamp: Date.now() - 1000 * 60 * 3,
    note: 'Trend warning about a new AI tool: "Everyone is already using this, don\'t get left behind"',
  },
  {
    id: 'demo-6',
    categoryId: 'beauty_standard',
    timestamp: Date.now() - 1000 * 60 * 1,
    note: 'Filtered clip of a girl at the gym with impossible waist-to-hip ratio',
  },
];

export function analyzeNarrative(logs: AuditLogItem[]): NarrativeAnalysis {
  const counts: Record<PatternCategoryId, { count: number; notes: string[] }> = {
    comparison: { count: 0, notes: [] },
    urgency: { count: 0, notes: [] },
    beauty_standard: { count: 0, notes: [] },
    achievement_pressure: { count: 0, notes: [] },
    other: { count: 0, notes: [] },
  };

  logs.forEach((log) => {
    if (counts[log.categoryId]) {
      counts[log.categoryId].count += 1;
      if (log.note && log.note.trim()) {
        counts[log.categoryId].notes.push(log.note.trim());
      }
    }
  });

  const total = logs.length;
  const categoriesList = (Object.keys(counts) as PatternCategoryId[])
    .map((catId) => {
      const cat = PATTERN_CATEGORIES[catId];
      const count = counts[catId].count;
      return {
        category: cat,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
        notes: counts[catId].notes,
      };
    })
    .sort((a, b) => b.count - a.count);

  const topCategory = categoriesList[0];
  const secondCategory = categoriesList[1];

  let dominantNarrative = '';
  let scriptInterpretation = '';
  let reframeInsight = '';

  if (topCategory && topCategory.count > 0) {
    if (secondCategory && secondCategory.count > 0 && secondCategory.count >= topCategory.count * 0.6) {
      dominantNarrative = `This session, your feed spent the most time telling you a combined story about ${topCategory.category.title} (${topCategory.percentage}%) and ${secondCategory.category.title} (${secondCategory.percentage}%).`;
      scriptInterpretation = `The underlying algorithm was nudging you into dual pressures: both ${topCategory.category.tagline.toLowerCase()} and ${secondCategory.category.tagline.toLowerCase()}. It suggested your self-worth requires keeping pace with both exterior appearance and visible status.`;
      reframeInsight = `${topCategory.category.counterScript} ${secondCategory.category.counterScript}`;
    } else {
      dominantNarrative = `This session, your feed spent the most time telling you a story about ${topCategory.category.title}, making up ${topCategory.percentage}% of detected narrative cues.`;
      scriptInterpretation = `Your algorithm was actively scripting a feeling of ${topCategory.category.tagline.toLowerCase()}. It quietly insinuated that ${topCategory.category.narrativeImpact.toLowerCase()}`;
      reframeInsight = topCategory.category.counterScript;
    }
  } else {
    dominantNarrative = 'Your audit shows a quiet, balanced feed narrative.';
    scriptInterpretation = 'No single pressure dominated your scroll.';
    reframeInsight = 'Continue noticing how algorithmic suggestions feel in your body.';
  }

  return {
    totalLogs: total,
    topCategories: categoriesList,
    dominantNarrative,
    scriptInterpretation,
    bodyEchoPrompt: 'How did you feel in your shoulders, jaw, or breath after closing the app today?',
    narrativeAuthorPrompt: 'If your algorithm were an author writing your life story, what role were they trying to cast you in?',
    unseenLifePrompt: 'What peaceful, unmonetized, uncurated moment of your real day was completely invisible to your feed?',
    reframeInsight,
  };
}
