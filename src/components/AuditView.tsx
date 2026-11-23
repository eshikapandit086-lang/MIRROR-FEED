import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Scale,
  Clock,
  Sparkles,
  TrendingUp,
  Bookmark,
  Plus,
  Minus,
  MessageSquarePlus,
  Trash2,
  ArrowRight,
  HelpCircle,
  X,
  Check,
  Zap,
} from 'lucide-react';
import { PATTERN_CATEGORIES, DEMO_PRESET_LOGS } from '../data/categories';
import { AuditLogItem, PatternCategoryId } from '../types';

interface AuditViewProps {
  logs: AuditLogItem[];
  onAddLog: (categoryId: PatternCategoryId, note?: string) => void;
  onRemoveLog: (id: string) => void;
  onDecrementCategory: (categoryId: PatternCategoryId) => void;
  onSeeMap: () => void;
  onLoadDemo: () => void;
}

export const AuditView: React.FC<AuditViewProps> = ({
  logs,
  onAddLog,
  onRemoveLog,
  onDecrementCategory,
  onSeeMap,
  onLoadDemo,
}) => {
  const [activeNoteCategory, setActiveNoteCategory] = useState<PatternCategoryId | null>(null);
  const [noteText, setNoteText] = useState('');
  const [showLogDrawer, setShowLogDrawer] = useState(false);
  const [infoModalCategory, setInfoModalCategory] = useState<PatternCategoryId | null>(null);

  // Group counts
  const categoryCounts = (Object.keys(PATTERN_CATEGORIES) as PatternCategoryId[]).reduce(
    (acc, catId) => {
      acc[catId] = logs.filter((l) => l.categoryId === catId).length;
      return acc;
    },
    {} as Record<PatternCategoryId, number>
  );

  const totalLogs = logs.length;
  const isMapReady = totalLogs >= 3;

  const handleCardTap = (catId: PatternCategoryId) => {
    onAddLog(catId);
  };

  const handleOpenNoteModal = (e: React.MouseEvent, catId: PatternCategoryId) => {
    e.stopPropagation();
    setActiveNoteCategory(catId);
    setNoteText('');
  };

  const handleSaveNote = () => {
    if (activeNoteCategory) {
      onAddLog(activeNoteCategory, noteText.trim() ? noteText.trim() : undefined);
      setActiveNoteCategory(null);
      setNoteText('');
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="w-5 h-5" />;
      case 'Clock':
        return <Clock className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5" />;
      case 'Bookmark':
      default:
        return <Bookmark className="w-5 h-5" />;
    }
  };

  const categoryKeys = Object.keys(PATTERN_CATEGORIES) as PatternCategoryId[];

  return (
    <div id="self-audit-screen" className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Sticky Progress & Running Tally Bar */}
      <div className="bg-[#FAF3EA] border border-[#E9DFCF] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 subtle-shadow">
        <div className="flex items-center gap-3.5 w-full sm:w-auto">
          <div className="w-11 h-11 rounded-full bg-[#382620] text-[#FAF7F2] flex items-center justify-center font-serif text-lg font-bold shadow-xs">
            {totalLogs}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-lg text-[#251A15]">
                Detected Feed Scripts
              </h2>
              {totalLogs > 0 && (
                <button
                  id="btn-toggle-log-drawer"
                  onClick={() => setShowLogDrawer(!showLogDrawer)}
                  className="text-xs text-[#874A36] underline hover:text-[#5E3224] transition-colors"
                >
                  {showLogDrawer ? 'Hide notes' : `View ${totalLogs} logged`}
                </button>
              )}
            </div>
            <p className="text-xs text-[#706057]">
              {totalLogs < 3
                ? `Log at least ${3 - totalLogs} more to map your subconscious narrative.`
                : 'Ready to synthesize your narrative map!'}
            </p>
          </div>
        </div>

        {/* Action Button & Demo Fill */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
          {totalLogs === 0 && (
            <button
              id="btn-fast-fill-demo"
              onClick={onLoadDemo}
              className="text-xs font-medium text-[#7D493A] hover:text-[#382620] px-3 py-2 rounded-lg bg-[#EFE4D6] hover:bg-[#E2D2C0] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Sample Feed</span>
            </button>
          )}

          <button
            id="btn-see-narrative-map"
            onClick={onSeeMap}
            disabled={!isMapReady}
            className={`w-full sm:w-auto px-6 py-3 rounded-full font-medium text-sm flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
              isMapReady
                ? 'bg-[#382620] hover:bg-[#201410] text-[#FAF7F2] shadow-md hover:scale-[1.02]'
                : 'bg-[#E3D9CD] text-[#8C7E76] cursor-not-allowed'
            }`}
          >
            <span>See My Narrative Map</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expanded Logs Drawer */}
      <AnimatePresence>
        {showLogDrawer && logs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-[#F8F1E7] border border-[#E5DACB] rounded-xl p-4 overflow-hidden space-y-3"
          >
            <div className="flex items-center justify-between text-xs font-serif font-bold text-[#453730] border-b border-[#E2D4C3] pb-2">
              <span>Recorded Instances in This Session</span>
              <span>{logs.length} items</span>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
              {logs.map((item) => {
                const cat = PATTERN_CATEGORIES[item.categoryId];
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-3 text-xs bg-white/60 p-2 rounded-lg border border-[#E9DECة border-[#E8DCCF]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: cat.accentColor }}
                      />
                      <span className="font-semibold text-[#2D211C] shrink-0">
                        {cat.title}:
                      </span>
                      <span className="text-[#65554C] truncate italic">
                        {item.note || 'Tapped counter'}
                      </span>
                    </div>
                    <button
                      onClick={() => onRemoveLog(item.id)}
                      className="text-[#9E8E84] hover:text-[#B4654A] p-1 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instruction Banner */}
      <div className="text-center sm:text-left space-y-1">
        <h3 className="font-serif text-2xl font-bold text-[#2A1E19]">
          Tap whenever your feed triggers one of these scripts:
        </h3>
        <p className="text-sm text-[#73635A]">
          Tap anywhere on a card to count an instance, or use the note button to capture a specific post example.
        </p>
      </div>

      {/* 5 Pattern Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        {categoryKeys.map((catId) => {
          const cat = PATTERN_CATEGORIES[catId];
          const count = categoryCounts[catId] || 0;

          return (
            <motion.div
              key={cat.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => handleCardTap(cat.id)}
              id={`card-category-${cat.id}`}
              className={`rounded-2xl p-5 border transition-all duration-200 cursor-pointer relative overflow-hidden flex flex-col justify-between select-none ${
                count > 0 ? 'subtle-shadow ring-1 ring-black/5' : 'hover:border-[#CDB8A6]'
              }`}
              style={{
                backgroundColor: cat.bgTint,
                borderColor: count > 0 ? cat.accentColor : cat.borderTint,
              }}
            >
              {/* Top Row: Icon, Title, Counter Badge */}
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shadow-xs"
                      style={{
                        backgroundColor: '#FFFFFF',
                        color: cat.accentColor,
                        border: `1px solid ${cat.borderTint}`,
                      }}
                    >
                      {getIconComponent(cat.iconName)}
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-lg text-[#261B16] leading-tight">
                        {cat.title}
                      </h4>
                      <span className="text-[11px] font-medium tracking-wide text-[#7C6960]">
                        {cat.tagline}
                      </span>
                    </div>
                  </div>

                  {/* Active Count Badge */}
                  <div className="flex items-center gap-1.5">
                    {count > 0 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDecrementCategory(cat.id);
                        }}
                        className="w-7 h-7 rounded-full bg-white/80 border border-[#DACDC0] flex items-center justify-center text-[#68554B] hover:bg-white hover:text-[#B4654A] transition-colors"
                        title="Decrease count"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div
                      className={`min-w-8 h-8 px-2.5 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        count > 0
                          ? 'bg-[#382620] text-[#FAF7F2] shadow-xs'
                          : 'bg-white/80 border border-[#DDD0C0] text-[#807067]'
                      }`}
                    >
                      {count}
                    </div>
                  </div>
                </div>

                {/* Subtitle / Subconscious quote */}
                <p className="font-serif italic text-sm text-[#7F4433] leading-snug">
                  {cat.subtitle}
                </p>

                {/* Description */}
                <p className="text-xs text-[#594B44] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              {/* Bottom Row: Quick Add Note & Examples */}
              <div className="pt-4 mt-3 border-t border-black/5 flex items-center justify-between gap-2">
                <button
                  id={`btn-add-note-${cat.id}`}
                  onClick={(e) => handleOpenNoteModal(e, cat.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#65534A] hover:text-[#251814] px-2.5 py-1.5 rounded-lg bg-white/70 hover:bg-white border border-[#E0D3C3] transition-colors"
                >
                  <MessageSquarePlus className="w-3.5 h-3.5 text-[#A8576A]" />
                  <span>+ Add note / quote</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setInfoModalCategory(cat.id);
                  }}
                  className="text-xs text-[#8A7970] hover:text-[#382620] flex items-center gap-1 transition-colors"
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Examples</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Note Attachment Modal */}
      <AnimatePresence>
        {activeNoteCategory && (
          <div
            id="modal-note-backdrop"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF7F2] border border-[#E5DACB] rounded-2xl p-6 max-w-lg w-full subtle-shadow space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: PATTERN_CATEGORIES[activeNoteCategory].accentColor,
                    }}
                  />
                  <h4 className="font-serif font-bold text-lg text-[#261B16]">
                    Log Note: {PATTERN_CATEGORIES[activeNoteCategory].title}
                  </h4>
                </div>
                <button
                  onClick={() => setActiveNoteCategory(null)}
                  className="text-[#88786F] hover:text-[#2A1E19] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-2">
                <label className="text-xs text-[#6B5A51] font-medium block">
                  What specific caption, image, or feeling triggered this? (Optional)
                </label>
                <textarea
                  id="input-audit-note-text"
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="e.g., '19yo real estate creator saying work 18 hours/day', or 'flawless filtered skin routine ad'..."
                  rows={3}
                  className="w-full text-sm p-3 rounded-xl border border-[#D8CCBD] bg-white focus:outline-none focus:ring-2 focus:ring-[#B4654A]/30 text-[#2D211C]"
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  onClick={() => setActiveNoteCategory(null)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-[#726259] hover:bg-[#EFE5D6] transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="btn-save-audit-note"
                  onClick={handleSaveNote}
                  className="px-5 py-2 rounded-xl text-xs font-medium bg-[#382620] hover:bg-[#231713] text-[#FAF7F2] transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Log Instance</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Examples Info Modal */}
      <AnimatePresence>
        {infoModalCategory && (
          <div
            id="modal-examples-backdrop"
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#FAF7F2] border border-[#E5DACB] rounded-2xl p-6 max-w-md w-full subtle-shadow space-y-4"
            >
              <div className="flex items-center justify-between border-b border-[#E8DFC8] pb-3">
                <h4 className="font-serif font-bold text-lg text-[#261B16]">
                  Examples: {PATTERN_CATEGORIES[infoModalCategory].title}
                </h4>
                <button
                  onClick={() => setInfoModalCategory(null)}
                  className="text-[#88786F] hover:text-[#2A1E19] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#6F5E56] italic">
                Common ways algorithms package this narrative script:
              </p>

              <ul className="space-y-2">
                {PATTERN_CATEGORIES[infoModalCategory].examples.map((ex, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-[#4A3B34] bg-white/70 p-2.5 rounded-lg border border-[#E8DFC8] flex items-start gap-2"
                  >
                    <span className="text-[#A8576A] font-bold">•</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  onClick={() => setInfoModalCategory(null)}
                  className="w-full py-2.5 rounded-xl text-xs font-medium bg-[#EFE5D6] hover:bg-[#E3D6C4] text-[#42332B] transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
