import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, BookOpen, Compass, Eye, ShieldAlert, HeartHandshake } from 'lucide-react';
import { PATTERN_CATEGORIES } from '../data/categories';
import { PatternCategoryId } from '../types';

interface LandingViewProps {
  onStart: () => void;
  onLoadDemo: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart, onLoadDemo }) => {
  const categoryKeys = Object.keys(PATTERN_CATEGORIES) as PatternCategoryId[];

  return (
    <div id="landing-screen" className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-14 space-y-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-6 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE8DC] border border-[#DDD3C2] text-xs font-medium text-[#65554B]">
          <Eye className="w-3.5 h-3.5 text-[#B4654A]" />
          <span>Identity-Literacy for the Algorithmic Age</span>
        </div>

        <div className="space-y-3">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#241A16] leading-[1.12]">
            Mirror Feed
          </h1>
          <p className="font-serif text-xl sm:text-2xl text-[#874A36] italic font-medium">
            “Your feed doesn’t just inform you. It narrates you.”
          </p>
        </div>

        <div className="text-base sm:text-lg text-[#554740] leading-relaxed space-y-3 font-normal max-w-xl mx-auto">
          <p>
            Most media literacy tools ask: <span className="font-serif italic font-semibold text-[#2D211C]">“Is this information true?”</span>
          </p>
          <p>
            Mirror Feed checks the deeper question: <span className="font-serif italic font-semibold text-[#2D211C]">“What is this stream telling me to become?”</span>
          </p>
          <p className="text-sm text-[#73635A]">
            Social algorithms quietly script our self-worth through relentless subtext — ranking our beauty, pacing our milestones, and fabricating urgency.
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            id="btn-start-audit-landing"
            onClick={onStart}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#382620] hover:bg-[#251814] text-[#FAF7F2] font-medium text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 group cursor-pointer"
          >
            <span>Start Your Audit</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            id="btn-load-demo-landing"
            onClick={onLoadDemo}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#EAE1D2] hover:bg-[#DECFC0] text-[#4A3A32] font-medium text-sm transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer border border-[#DACDC0]"
          >
            <Sparkles className="w-4 h-4 text-[#A8576A]" />
            <span>Load Sample Audit (Pitch Demo)</span>
          </button>
        </div>
      </motion.div>

      {/* The 5 Narratives Preview / Why It Matters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="bg-[#FAF3EB] border border-[#E8DCCB] rounded-2xl p-6 sm:p-8 space-y-6 subtle-shadow"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8DFC8] pb-4">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2A1E19]">
              The 5 Hidden Scripts We Unmask
            </h2>
            <p className="text-xs sm:text-sm text-[#73635A]">
              Notice what triggers your nervous system while you scroll.
            </p>
          </div>
          <span className="text-xs font-serif italic text-[#8B4834]">
            5 Archetypes
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryKeys.map((catId) => {
            const cat = PATTERN_CATEGORIES[catId];
            return (
              <div
                key={cat.id}
                className="p-4 rounded-xl border transition-all duration-200 hover:border-[#CDB8A6] flex flex-col justify-between"
                style={{ backgroundColor: cat.bgTint, borderColor: cat.borderTint }}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-sm text-[#2A1E19]">
                      {cat.title}
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-white/70 text-[#6B5A52]">
                      {cat.tagline}
                    </span>
                  </div>
                  <p className="font-serif italic text-xs text-[#7B4636]">
                    {cat.subtitle}
                  </p>
                  <p className="text-xs text-[#5D4E47] leading-relaxed">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* How the 2-Minute Audit Works */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.25 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 text-center md:text-left"
      >
        <div className="space-y-2 bg-[#F6EFE5] p-5 rounded-xl border border-[#E9DFD0]">
          <div className="w-8 h-8 rounded-full bg-[#EADCC8] text-[#4A3A32] flex items-center justify-center font-serif font-bold text-sm mx-auto md:mx-0">
            1
          </div>
          <h3 className="font-serif font-semibold text-base text-[#2A1E19]">
            Scroll & Notice
          </h3>
          <p className="text-xs text-[#685850] leading-relaxed">
            Open TikTok, Instagram, or Reels for 2 minutes. Notice the subtle bodily pinch of ranking or rushing.
          </p>
        </div>

        <div className="space-y-2 bg-[#F6EFE5] p-5 rounded-xl border border-[#E9DFD0]">
          <div className="w-8 h-8 rounded-full bg-[#EADCC8] text-[#4A3A32] flex items-center justify-center font-serif font-bold text-sm mx-auto md:mx-0">
            2
          </div>
          <h3 className="font-serif font-semibold text-base text-[#2A1E19]">
            Tap to Log Cues
          </h3>
          <p className="text-xs text-[#685850] leading-relaxed">
            Tap a card each time a post sells comparison, beauty standards, artificial urgency, or hustle guilt.
          </p>
        </div>

        <div className="space-y-2 bg-[#F6EFE5] p-5 rounded-xl border border-[#E9DFD0]">
          <div className="w-8 h-8 rounded-full bg-[#EADCC8] text-[#4A3A32] flex items-center justify-center font-serif font-bold text-sm mx-auto md:mx-0">
            3
          </div>
          <h3 className="font-serif font-semibold text-base text-[#2A1E19]">
            Read Your Narrative Map
          </h3>
          <p className="text-xs text-[#685850] leading-relaxed">
            Reveal the story your feed is trying to construct about who you should be — and reclaim your grounding.
          </p>
        </div>
      </motion.div>

      {/* Hackathon Context Note */}
      <div className="text-center pt-2 pb-6 border-t border-[#E8DFC8]/60">
        <p className="text-xs text-[#827269] font-serif italic max-w-lg mx-auto">
          Developed for the UNESCO Youth Hackathon (AI & MIL Track). Designed to foster emotional resilience, critical media awareness, and algorithmic autonomy among young women.
        </p>
      </div>
    </div>
  );
};
