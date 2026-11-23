import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  RefreshCw,
  Share2,
  Copy,
  Check,
  Feather,
  Heart,
  Quote,
  ShieldCheck,
  Compass,
  Award,
  Activity,
  Layers,
} from 'lucide-react';
import { RadialChart } from './RadialChart';
import { ConstellationNarrativeMap } from './ConstellationNarrativeMap';
import { analyzeNarrative } from '../data/categories';
import { AuditLogItem } from '../types';

interface NarrativeMapViewProps {
  logs: AuditLogItem[];
  onRestart: () => void;
  onContinueAudit: () => void;
}

export const NarrativeMapView: React.FC<NarrativeMapViewProps> = ({
  logs,
  onRestart,
  onContinueAudit,
}) => {
  const [copied, setCopied] = useState(false);
  const [viewStyle, setViewStyle] = useState<'artistic' | 'geometric'>('artistic');
  const analysis = analyzeNarrative(logs);

  const topCat = analysis.topCategories[0];
  const secondCat = analysis.topCategories[1];

  const handleCopySummary = () => {
    const lines = [
      `✦ Mirror Feed — Subconscious Narrative Audit`,
      `Total Cues Logged: ${analysis.totalLogs}`,
      `Dominant Narrative: ${analysis.dominantNarrative}`,
      ``,
      `Top Algorithmic Pressure Weights:`,
      ...analysis.topCategories
        .filter((c) => c.count > 0)
        .map((c) => `• ${c.category.title}: ${c.count} instances (${c.percentage}%)`),
      ``,
      `Core Reflection Prompts:`,
      `1. How did you feel after scrolling, most days?`,
      `2. If your feed were narrating who you should be, what would it say?`,
      `3. What part of your real, uncurated life did the algorithm treat as invisible today?`,
      ``,
      `Grounding Reframe: ${analysis.reframeInsight}`,
      `https://mirror-feed.unesco-mil.app`,
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div id="narrative-map-screen" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12 space-y-12">
      {/* Top Banner / Emotional Hook */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF0E6] border border-[#E9DACB] text-xs font-medium text-[#7C4838]">
          <Feather className="w-3.5 h-3.5 text-[#B4654A]" />
          <span>Your Algorithmic Identity Map</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#241A16] leading-tight">
          The Subconscious Story Told to You
        </h1>

        <p className="text-sm sm:text-base text-[#65544B] leading-relaxed">
          Based on the cues you logged, this is the psychological gravity your feed created in your mind.
        </p>
      </motion.div>

      {/* Main Narrative Synthesis & Artistic Map Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="bg-[#FAF4EB] border border-[#E8DEC9] rounded-3xl p-6 sm:p-10 subtle-shadow space-y-8"
      >
        {/* Dynamic Reflective Sentence (High-emphasis editorial quote box) */}
        <div className="bg-[#FFFFFF]/80 border border-[#E8DFD0] rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-xs relative overflow-hidden">
          <div className="absolute top-3 left-4 text-[#D8C7B5] opacity-40">
            <Quote className="w-12 h-12" />
          </div>

          <div className="relative z-10 space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#947D72] block">
              Core Narrative Finding
            </span>

            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#2B1D17] font-semibold leading-snug">
              “{analysis.dominantNarrative}”
            </p>

            <p className="text-xs sm:text-sm text-[#6B5A51] max-w-xl mx-auto leading-relaxed pt-1">
              {analysis.scriptInterpretation}
            </p>
          </div>
        </div>

        {/* View Toggle Bar (Artistic Resonance Map vs Radar Geometry) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <div>
            <h3 className="font-serif font-bold text-lg sm:text-xl text-[#261B16]">
              Subconscious Gravity Field
            </h3>
            <p className="text-xs text-[#7A6A61]">
              Explore the interconnected emotional weight and counter-scripts of your scroll.
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#EFE3D3] p-1 rounded-xl border border-[#DDCFC0]">
            <button
              id="btn-switch-artistic"
              onClick={() => setViewStyle('artistic')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                viewStyle === 'artistic'
                  ? 'bg-white text-[#2B1D17] shadow-xs font-semibold'
                  : 'text-[#6D5A50] hover:text-[#2B1D17]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B4654A]" />
              <span>Organic Constellation</span>
            </button>

            <button
              id="btn-switch-geometric"
              onClick={() => setViewStyle('geometric')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                viewStyle === 'geometric'
                  ? 'bg-white text-[#2B1D17] shadow-xs font-semibold'
                  : 'text-[#6D5A50] hover:text-[#2B1D17]'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-[#5D4F78]" />
              <span>Geometric Radar</span>
            </button>
          </div>
        </div>

        {/* Primary Interactive Map (Artistic Constellation or Geometric Radar) */}
        {viewStyle === 'artistic' ? (
          <ConstellationNarrativeMap
            categories={analysis.topCategories}
            totalLogs={analysis.totalLogs}
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
            {/* Radial Chart Visual */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center p-4 bg-[#FAF7F2]/60 rounded-2xl border border-[#EADBCA]/60">
              <RadialChart categories={analysis.topCategories} totalLogs={analysis.totalLogs} />
            </div>

            {/* Category Weight Bars */}
            <div className="lg:col-span-5 space-y-4">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-base text-[#261B16]">
                  Relative Narrative Weight
                </h3>
                <p className="text-xs text-[#7A6A61]">
                  Distribution of pressures across {analysis.totalLogs} logged cues.
                </p>
              </div>

              <div className="space-y-3 pt-1">
                {analysis.topCategories.map((item) => (
                  <div key={item.category.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-medium">
                      <span className="text-[#362721] font-serif font-semibold">
                        {item.category.title}
                      </span>
                      <span className="text-[#78665E]">
                        {item.count} cues ({item.percentage}%)
                      </span>
                    </div>

                    <div className="w-full h-2.5 bg-[#EAE0D2] rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.category.accentColor }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Subtext insight */}
              <div className="p-3.5 rounded-xl bg-[#F4EDE2] border border-[#E5DAC8] text-xs text-[#635249] space-y-1 mt-4">
                <div className="font-serif font-bold text-[#382620] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#B4654A]" />
                  <span>The Counter-Script</span>
                </div>
                <p className="italic">{analysis.reframeInsight}</p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* 2-3 Reflection Prompts (Styled in deep journal cards) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="space-y-5"
      >
        <div className="text-center sm:text-left space-y-1">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2A1E19]">
            Reflection Prompts
          </h2>
          <p className="text-xs sm:text-sm text-[#73635A]">
            Take a moment to sit with these questions before opening any social app again.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Prompt 1 */}
          <div className="bg-[#FAF3EB] border border-[#EADBCA] p-6 rounded-2xl space-y-3 flex flex-col justify-between subtle-shadow">
            <div className="space-y-3">
              <span className="w-7 h-7 rounded-full bg-[#EADDC9] text-[#55433A] flex items-center justify-center font-serif text-xs font-bold">
                1
              </span>
              <h3 className="font-serif font-semibold text-lg text-[#251B16] leading-snug">
                “How did you feel after scrolling, most days?”
              </h3>
            </div>
            <p className="text-xs text-[#6F5F57] leading-relaxed pt-2 border-t border-[#E8DFC8]">
              Notice somatic clues: tight jaw, shallow breathing, sudden dissatisfaction with your room, body, or day.
            </p>
          </div>

          {/* Prompt 2 */}
          <div className="bg-[#FAF3EB] border border-[#EADBCA] p-6 rounded-2xl space-y-3 flex flex-col justify-between subtle-shadow">
            <div className="space-y-3">
              <span className="w-7 h-7 rounded-full bg-[#EADDC9] text-[#55433A] flex items-center justify-center font-serif text-xs font-bold">
                2
              </span>
              <h3 className="font-serif font-semibold text-lg text-[#251B16] leading-snug">
                “If your feed were narrating who you should be, what would it say?”
              </h3>
            </div>
            <p className="text-xs text-[#6F5F57] leading-relaxed pt-2 border-t border-[#E8DFC8]">
              Consider the fictional protagonist your algorithm wants you to perform: tireless, flawless, constantly upgrading.
            </p>
          </div>

          {/* Prompt 3 */}
          <div className="bg-[#FAF3EB] border border-[#EADBCA] p-6 rounded-2xl space-y-3 flex flex-col justify-between subtle-shadow">
            <div className="space-y-3">
              <span className="w-7 h-7 rounded-full bg-[#EADDC9] text-[#55433A] flex items-center justify-center font-serif text-xs font-bold">
                3
              </span>
              <h3 className="font-serif font-semibold text-lg text-[#251B16] leading-snug">
                “What part of your real life was invisible to the algorithm?”
              </h3>
            </div>
            <p className="text-xs text-[#6F5F57] leading-relaxed pt-2 border-t border-[#E8DFC8]">
              Your quiet contentment, slow conversations, messy creativity, and unmonetized joy that algorithms cannot measure.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Logged Notes / Examples Section (If user attached notes) */}
      {logs.some((l) => l.note) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-[#F8F1E7] border border-[#E6DBCB] rounded-2xl p-6 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-[#E2D5C3] pb-3">
            <h3 className="font-serif font-bold text-base text-[#2C1F1A]">
              Your Feed Evidence Trail
            </h3>
            <span className="text-xs text-[#7A6A61] font-serif italic">
              Recorded post observations
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {logs
              .filter((l) => l.note)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white/75 p-3.5 rounded-xl border border-[#E6DCCA] text-xs space-y-1"
                >
                  <span className="font-serif font-bold text-[#874A36] block">
                    {item.note}
                  </span>
                  <span className="text-[11px] text-[#7C6C63]">
                    Category: {item.categoryId.replace('_', ' ')}
                  </span>
                </div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Action Bar / Bottom CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#E8DFC8]"
      >
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            id="btn-restart-audit"
            onClick={onRestart}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FAF3EB] hover:bg-[#EFE4D4] text-[#4A3B33] font-medium text-sm border border-[#DACDC0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-[#8C5441]" />
            <span>Restart Audit</span>
          </button>

          <button
            id="btn-continue-audit-map"
            onClick={onContinueAudit}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#FAF3EB] hover:bg-[#EFE4D4] text-[#4A3B33] font-medium text-sm border border-[#DACDC0] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Compass className="w-4 h-4 text-[#5D4F78]" />
            <span>Add More Posts</span>
          </button>
        </div>

        {/* Copy / Share Reflection */}
        <button
          id="btn-copy-reflection-summary"
          onClick={handleCopySummary}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#382620] hover:bg-[#201410] text-[#FAF7F2] font-medium text-sm shadow-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-[#9EE493]" />
              <span>Copied Reflection to Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-[#E6BC9D]" />
              <span>Copy Narrative Summary</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Footer Note */}
      <div className="text-center pt-4 pb-8">
        <p className="text-xs text-[#877870] font-serif italic max-w-md mx-auto">
          UNESCO Youth Hackathon — Media and Information Literacy (MIL) Track Prototype.
        </p>
      </div>
    </div>
  );
};

