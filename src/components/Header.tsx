import React from 'react';
import { Sparkles, Compass, RefreshCw, Award } from 'lucide-react';
import { ScreenState } from '../types';

interface HeaderProps {
  currentScreen: ScreenState;
  onNavigate: (screen: ScreenState) => void;
  totalLogs: number;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  totalLogs,
  onReset,
}) => {
  return (
    <header
      id="app-header"
      className="w-full border-b border-[#E8DFC8]/70 bg-[#FAF7F2]/90 backdrop-blur-sm sticky top-0 z-40 transition-all duration-200"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand Logo & Tag */}
        <div
          id="brand-logo-container"
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div
            id="brand-icon-gem"
            className="w-9 h-9 rounded-full bg-[#382620] text-[#FAF7F2] flex items-center justify-center shadow-xs transition-transform duration-300 group-hover:scale-105"
          >
            <Sparkles className="w-4 h-4 text-[#E6BC9D]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2B211D]">
                Mirror Feed
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-[#EFE8DA] text-[#6B5A52] border border-[#DDD3BF]">
                <Award className="w-3 h-3 text-[#A8576A]" /> UNESCO MIL Hackathon
              </span>
            </div>
            <p className="hidden md:block text-[11px] text-[#78675E] tracking-wide italic font-serif">
              Media literacy for the subconscious self
            </p>
          </div>
        </div>

        {/* Status / Quick Action */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {currentScreen !== 'landing' && (
            <div
              id="live-audit-counter-badge"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#F3ECE0] border border-[#E5DAC6] text-xs text-[#524138] font-medium"
            >
              <span className="w-2 h-2 rounded-full bg-[#B4654A] animate-pulse" />
              <span>{totalLogs} {totalLogs === 1 ? 'script' : 'scripts'} logged</span>
            </div>
          )}

          {currentScreen === 'map' && (
            <button
              id="btn-header-re-audit"
              onClick={() => onNavigate('audit')}
              className="flex items-center gap-1.5 text-xs font-medium text-[#4A3B34] hover:text-[#1F1714] px-3 py-1.5 rounded-full bg-[#EAE0D0] hover:bg-[#DFCDB8] transition-colors"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Continue Audit</span>
            </button>
          )}

          {totalLogs > 0 && (
            <button
              id="btn-header-reset"
              onClick={onReset}
              title="Reset current audit session"
              className="p-1.5 text-[#8A7970] hover:text-[#382620] rounded-full hover:bg-[#EFE7D8] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
