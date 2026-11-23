import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Scale,
  Clock,
  TrendingUp,
  Bookmark,
  Eye,
  Info,
  Layers,
  Activity,
  Maximize2,
  Waves,
  Sun,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { CategorySummary, PatternCategoryId, PatternCategory } from '../types';

interface ConstellationNarrativeMapProps {
  categories: CategorySummary[];
  totalLogs: number;
}

type VisualizationMode = 'constellation' | 'aura' | 'prism' | 'radar';

export const ConstellationNarrativeMap: React.FC<ConstellationNarrativeMapProps> = ({
  categories,
  totalLogs,
}) => {
  const [activeMode, setActiveMode] = useState<VisualizationMode>('constellation');
  const [selectedCategoryId, setSelectedCategoryId] = useState<PatternCategoryId | null>(
    categories.find((c) => c.count > 0)?.category.id || categories[0]?.category.id || null
  );
  const [hoveredCategoryId, setHoveredCategoryId] = useState<PatternCategoryId | null>(null);

  const selectedCategorySummary = useMemo(() => {
    return categories.find((c) => c.category.id === selectedCategoryId) || categories[0];
  }, [categories, selectedCategoryId]);

  const maxCount = Math.max(...categories.map((c) => c.count), 1);

  // Layout parameters for the Constellation
  const size = 520;
  const center = size / 2;
  const orbitRadius = 160;

  // Node positions in the constellation
  const nodePositions = useMemo(() => {
    const total = categories.length;
    return categories.map((cat, idx) => {
      const angle = (idx * 2 * Math.PI) / total - Math.PI / 2;
      // Proximity pull: nodes with higher weight gravitate slightly closer to the center self
      const weightRatio = totalLogs > 0 ? cat.count / maxCount : 0.2;
      const dynamicRadius = orbitRadius - weightRatio * 25;

      const x = center + dynamicRadius * Math.cos(angle);
      const y = center + dynamicRadius * Math.sin(angle);
      const nodeRadius = Math.max(22, 20 + (totalLogs > 0 ? (cat.count / maxCount) * 22 : 6));

      return {
        ...cat,
        x,
        y,
        angle,
        nodeRadius,
        weightRatio,
      };
    });
  }, [categories, totalLogs, maxCount, center]);

  // Interconnected cross-narrative filaments (e.g. Beauty connects to Comparison, Urgency to Achievement)
  const crossConnections = useMemo(() => {
    const links: { sourceId: PatternCategoryId; targetId: PatternCategoryId; strength: number }[] = [
      { sourceId: 'beauty_standard', targetId: 'comparison', strength: 0.8 },
      { sourceId: 'comparison', targetId: 'achievement_pressure', strength: 0.9 },
      { sourceId: 'urgency', targetId: 'achievement_pressure', strength: 0.85 },
      { sourceId: 'urgency', targetId: 'comparison', strength: 0.5 },
      { sourceId: 'other', targetId: 'urgency', strength: 0.4 },
    ];
    return links;
  }, []);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="w-4 h-4" />;
      case 'Clock':
        return <Clock className="w-4 h-4" />;
      case 'Sparkles':
        return <Sparkles className="w-4 h-4" />;
      case 'TrendingUp':
        return <TrendingUp className="w-4 h-4" />;
      case 'Bookmark':
      default:
        return <Bookmark className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6 select-none">
      {/* Mode Switcher Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E8DFD0] pb-3">
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-serif font-semibold text-[#382620] flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-[#B4654A]" />
            <span>Artistic Lens:</span>
          </span>
        </div>

        <div className="flex items-center gap-1 bg-[#F0E6D8] p-1 rounded-xl border border-[#E0D2C0]">
          <button
            id="btn-mode-constellation"
            onClick={() => setActiveMode('constellation')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'constellation'
                ? 'bg-white text-[#2B1D17] shadow-xs font-semibold'
                : 'text-[#6D5A50] hover:text-[#2B1D17]'
            }`}
          >
            <Sparkles className="w-3 h-3 text-[#B4654A]" />
            <span>Subconscious Constellation</span>
          </button>

          <button
            id="btn-mode-aura"
            onClick={() => setActiveMode('aura')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'aura'
                ? 'bg-white text-[#2B1D17] shadow-xs font-semibold'
                : 'text-[#6D5A50] hover:text-[#2B1D17]'
            }`}
          >
            <Waves className="w-3 h-3 text-[#5D4F78]" />
            <span>Resonance Aura Rings</span>
          </button>

          <button
            id="btn-mode-prism"
            onClick={() => setActiveMode('prism')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
              activeMode === 'prism'
                ? 'bg-white text-[#2B1D17] shadow-xs font-semibold'
                : 'text-[#6D5A50] hover:text-[#2B1D17]'
            }`}
          >
            <Eye className="w-3 h-3 text-[#526E63]" />
            <span>Inner Mirror Prism</span>
          </button>
        </div>
      </div>

      {/* Main Visual Stage */}
      <div className="relative w-full min-h-[460px] flex items-center justify-center bg-[#FAF6F0] rounded-2xl border border-[#EADBCA] p-4 overflow-hidden shadow-xs">
        {/* Ambient Watercolor Background Texture */}
        <div className="absolute inset-0 bg-radial from-white/70 via-[#FAF4EB]/40 to-[#F2E6D8]/20 pointer-events-none" />

        {/* MODE 1: SUBCONSCIOUS CONSTELLATION & INTERCONNECTED FILAMENTS */}
        {activeMode === 'constellation' && (
          <div className="w-full max-w-[500px] aspect-square relative flex items-center justify-center">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full overflow-visible drop-shadow-xs"
            >
              <defs>
                {/* Center Core Glow */}
                <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E9BCA2" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#C97858" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
                </radialGradient>

                {/* Node Aura Gradients */}
                {nodePositions.map((node) => (
                  <radialGradient
                    key={`grad-${node.category.id}`}
                    id={`orbGlow-${node.category.id}`}
                    cx="50%"
                    cy="50%"
                    r="50%"
                  >
                    <stop offset="0%" stopColor={node.category.accentColor} stopOpacity="0.45" />
                    <stop offset="70%" stopColor={node.category.accentColor} stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
                  </radialGradient>
                ))}

                {/* Animated Particle Gradient */}
                <linearGradient id="tendrilGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B4654A" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#A8576A" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#5D4F78" stopOpacity="0.6" />
                </linearGradient>
              </defs>

              {/* Concentric Subtle Mental Space Rings */}
              <circle
                cx={center}
                cy={center}
                r={orbitRadius + 45}
                fill="none"
                stroke="#E5DAC9"
                strokeWidth="1"
                strokeDasharray="4 6"
                opacity="0.4"
              />
              <circle
                cx={center}
                cy={center}
                r={orbitRadius}
                fill="none"
                stroke="#DECDBA"
                strokeWidth="1"
                strokeDasharray="3 4"
                opacity="0.6"
              />
              <circle
                cx={center}
                cy={center}
                r={orbitRadius - 55}
                fill="none"
                stroke="#E8DFCE"
                strokeWidth="1"
                opacity="0.5"
              />

              {/* Cross-Category Tension Filaments (Interconnected Synaptic Arcs) */}
              {crossConnections.map((link, idx) => {
                const source = nodePositions.find((n) => n.category.id === link.sourceId);
                const target = nodePositions.find((n) => n.category.id === link.targetId);
                if (!source || !target) return null;

                const isConnectedToSelected =
                  selectedCategoryId === link.sourceId || selectedCategoryId === link.targetId;
                const isHovered =
                  hoveredCategoryId === link.sourceId || hoveredCategoryId === link.targetId;

                // Bezier curve midpoint with subtle curvature toward the center
                const midX = (source.x + target.x) / 2 + (center - (source.x + target.x) / 2) * 0.25;
                const midY = (source.y + target.y) / 2 + (center - (source.y + target.y) / 2) * 0.25;
                const pathD = `M ${source.x} ${source.y} Q ${midX} ${midY} ${target.x} ${target.y}`;

                return (
                  <g key={`cross-${idx}`}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={
                        isConnectedToSelected || isHovered
                          ? '#A8576A'
                          : '#DAC8B5'
                      }
                      strokeWidth={isConnectedToSelected || isHovered ? '2' : '1'}
                      strokeDasharray={isConnectedToSelected ? 'none' : '3 3'}
                      opacity={isConnectedToSelected ? 0.85 : isHovered ? 0.7 : 0.25}
                      className="transition-all duration-300"
                    />
                  </g>
                );
              })}

              {/* Core Gravitational Tendrils (Connects Center Self to each narrative node) */}
              {nodePositions.map((node) => {
                const isSelected = selectedCategoryId === node.category.id;
                const isHovered = hoveredCategoryId === node.category.id;
                const isActive = isSelected || isHovered;

                // Dynamic curvature
                const curveFactor = 0.15;
                const perpX = -(node.y - center) * curveFactor;
                const perpY = (node.x - center) * curveFactor;
                const ctrlX = (center + node.x) / 2 + perpX;
                const ctrlY = (center + node.y) / 2 + perpY;

                const pathD = `M ${center} ${center} Q ${ctrlX} ${ctrlY} ${node.x} ${node.y}`;

                return (
                  <g key={`filament-${node.category.id}`}>
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isActive ? node.category.accentColor : '#D8C7B5'}
                      strokeWidth={isActive ? Math.max(2, node.weightRatio * 4) : '1.2'}
                      opacity={isActive ? 0.9 : 0.35}
                      className="transition-all duration-300"
                    />

                    {/* Flowing Energy Pulse on Active Filaments */}
                    {isActive && (
                      <circle r="3" fill={node.category.accentColor}>
                        <animateMotion
                          path={pathD}
                          dur="2.4s"
                          repeatCount="indefinite"
                          keyPoints="0;1"
                          keyTimes="0;1"
                        />
                      </circle>
                    )}
                  </g>
                );
              })}

              {/* Center Core: The Uncurated Self / Anchor of Awareness */}
              <g className="cursor-pointer">
                {/* Radiating atmospheric aura */}
                <circle cx={center} cy={center} r={42} fill="url(#centerGlow)" />
                <circle
                  cx={center}
                  cy={center}
                  r={26}
                  fill="#FAF4EB"
                  stroke="#C97858"
                  strokeWidth="1.5"
                />
                <circle
                  cx={center}
                  cy={center}
                  r={18}
                  fill="#EEDCD0"
                />
                <circle cx={center} cy={center} r={6} fill="#382620" />

                <text
                  x={center}
                  y={center + 38}
                  textAnchor="middle"
                  className="font-serif text-[11px] font-bold fill-[#5C453B]"
                >
                  Subconscious Core
                </text>
                <text
                  x={center}
                  y={center + 49}
                  textAnchor="middle"
                  className="text-[9px] font-sans fill-[#8A786E]"
                >
                  (Your Awareness)
                </text>
              </g>

              {/* Narrative Gravitational Nodes (Interactive Orbs) */}
              {nodePositions.map((node) => {
                const isSelected = selectedCategoryId === node.category.id;
                const isHovered = hoveredCategoryId === node.category.id;

                return (
                  <g
                    key={`node-${node.category.id}`}
                    className="cursor-pointer transition-transform duration-300"
                    onClick={() => setSelectedCategoryId(node.category.id)}
                    onMouseEnter={() => setHoveredCategoryId(node.category.id)}
                    onMouseLeave={() => setHoveredCategoryId(null)}
                    style={{
                      transformOrigin: `${node.x}px ${node.y}px`,
                      transform: isSelected || isHovered ? 'scale(1.08)' : 'scale(1)',
                    }}
                  >
                    {/* Outer Ambient Glow Aura */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.nodeRadius + 18}
                      fill={`url(#orbGlow-${node.category.id})`}
                      opacity={isSelected || isHovered ? 1 : 0.5}
                    />

                    {/* Secondary Rippling Membrane */}
                    {node.count > 0 && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.nodeRadius + 6}
                        fill="none"
                        stroke={node.category.accentColor}
                        strokeWidth="1.2"
                        strokeDasharray={isSelected ? 'none' : '2 3'}
                        opacity={isSelected ? 0.8 : 0.4}
                      />
                    )}

                    {/* Main Orb Body */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.nodeRadius}
                      fill="#FFFFFF"
                      stroke={node.category.accentColor}
                      strokeWidth={isSelected ? '2.5' : '1.5'}
                      className="shadow-xs"
                    />

                    {/* Inner Tint Layer */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.nodeRadius - 3}
                      fill={node.category.accentColor}
                      opacity={isSelected ? 0.22 : 0.12}
                    />

                    {/* Count Indicator Inside Node */}
                    <text
                      x={node.x}
                      y={node.y - (node.count > 0 ? 3 : 0)}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className="font-serif font-bold text-[13px] fill-[#2B1D17]"
                    >
                      {node.count}
                    </text>

                    {node.count > 0 && (
                      <text
                        x={node.x}
                        y={node.y + 11}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="text-[9px] font-mono font-medium fill-[#7A6A61]"
                      >
                        {node.percentage}%
                      </text>
                    )}

                    {/* Label Outside Node */}
                    <g>
                      {/* Determine optimal label placement based on quadrant */}
                      {(() => {
                        const isTop = node.y < center - 30;
                        const isBottom = node.y > center + 30;
                        const isRight = node.x > center;

                        let labelY = node.y + (isTop ? -node.nodeRadius - 16 : node.nodeRadius + 18);
                        if (!isTop && !isBottom) {
                          labelY = node.y + 4;
                        }

                        let textAnchor: 'middle' | 'start' | 'end' = 'middle';
                        let labelX = node.x;

                        if (!isTop && !isBottom) {
                          textAnchor = isRight ? 'start' : 'end';
                          labelX = node.x + (isRight ? node.nodeRadius + 10 : -node.nodeRadius - 10);
                        }

                        return (
                          <>
                            <text
                              x={labelX}
                              y={labelY}
                              textAnchor={textAnchor}
                              className={`font-serif text-[12px] ${
                                isSelected ? 'font-bold fill-[#2B1D17]' : 'font-semibold fill-[#4A3B33]'
                              }`}
                            >
                              {node.category.title}
                            </text>
                            <text
                              x={labelX}
                              y={labelY + 12}
                              textAnchor={textAnchor}
                              className="text-[10px] font-sans fill-[#827168] italic"
                            >
                              {node.category.tagline}
                            </text>
                          </>
                        );
                      })()}
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>
        )}

        {/* MODE 2: AURA RIPPLE FIELD (CONCENTRIC EMOTIONAL ECHOES) */}
        {activeMode === 'aura' && (
          <div className="w-full max-w-[480px] aspect-square relative flex items-center justify-center p-4">
            <div className="absolute inset-0 flex items-center justify-center">
              {nodePositions.map((cat, idx) => {
                const ringSize = 100 + (idx + 1) * 60;
                const isSelected = selectedCategoryId === cat.category.id;
                const isHovered = hoveredCategoryId === cat.category.id;

                return (
                  <motion.div
                    key={`ring-aura-${cat.category.id}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    onClick={() => setSelectedCategoryId(cat.category.id)}
                    onMouseEnter={() => setHoveredCategoryId(cat.category.id)}
                    onMouseLeave={() => setHoveredCategoryId(null)}
                    style={{
                      width: `${ringSize}px`,
                      height: `${ringSize}px`,
                      borderColor: cat.category.accentColor,
                    }}
                    className={`absolute rounded-full border flex items-start justify-center cursor-pointer transition-all duration-300 ${
                      isSelected || isHovered
                        ? 'border-2 shadow-sm'
                        : 'border-dashed opacity-50'
                    }`}
                  >
                    {/* Ring Label Tag */}
                    <div
                      style={{
                        backgroundColor: isSelected ? cat.category.accentColor : '#FAF4EB',
                        color: isSelected ? '#FFFFFF' : '#382620',
                        borderColor: cat.category.accentColor,
                      }}
                      className="px-2.5 py-0.5 rounded-full border text-[11px] font-serif font-semibold -translate-y-1/2 shadow-2xs transition-colors flex items-center gap-1.5"
                    >
                      <span>{cat.category.title}</span>
                      <span className="text-[10px] font-mono opacity-85 font-normal">
                        ({cat.count} cues • {cat.percentage}%)
                      </span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Center Meditative Pebble */}
              <div className="z-10 w-24 h-24 rounded-full bg-white border border-[#DAC6B2] flex flex-col items-center justify-center p-2 text-center shadow-xs">
                <Sun className="w-4 h-4 text-[#B4654A] mb-1" />
                <span className="font-serif text-[11px] font-bold text-[#382620]">Inner Self</span>
                <span className="text-[9px] text-[#8C7A70]">{totalLogs} Total Cues</span>
              </div>
            </div>
          </div>
        )}

        {/* MODE 3: INNER MIRROR PRISM (ALGORITHMIC DISTORTION VS GROUNDED REALITY) */}
        {activeMode === 'prism' && (
          <div className="w-full py-4 px-2 sm:px-6 space-y-5">
            <div className="text-center space-y-1 max-w-md mx-auto">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9A8276]">
                The Subconscious Split
              </span>
              <h4 className="font-serif font-bold text-lg text-[#2B1D17]">
                Algorithmic Projection vs. Grounded Self
              </h4>
              <p className="text-xs text-[#705E54]">
                Select any narrative thread to reveal how the feed warped your perspective.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {/* Algorithmic Lens */}
              <div className="bg-[#FAF0E6]/90 border border-[#E9DAC8] rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#8C4A36]">
                  <Layers className="w-4 h-4 text-[#B4654A]" />
                  <span>The Algorithmic Projection</span>
                </div>
                <div className="space-y-3">
                  {categories.map((item) => {
                    const isSelected = selectedCategoryId === item.category.id;
                    return (
                      <div
                        key={`prism-left-${item.category.id}`}
                        onClick={() => setSelectedCategoryId(item.category.id)}
                        className={`p-3 rounded-xl border transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-white border-[#B4654A] shadow-xs'
                            : 'bg-white/50 border-[#E8DDCF] hover:bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-bold text-xs text-[#2B1D17]">
                            {item.category.title}
                          </span>
                          <span className="text-[11px] font-mono text-[#8C5441]">
                            {item.count} cues ({item.percentage}%)
                          </span>
                        </div>
                        <p className="text-xs text-[#6F5E56] italic mt-1 leading-snug">
                          {item.category.subtitle}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Grounded Reality Lens */}
              <div className="bg-[#F0F5F2]/90 border border-[#D5E3DC] rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#355B4F]">
                  <Shield className="w-4 h-4 text-[#526E63]" />
                  <span>Your Grounded Counter-Script</span>
                </div>

                {selectedCategorySummary && (
                  <motion.div
                    key={selectedCategorySummary.category.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-white border border-[#D2E2DA] space-y-3"
                  >
                    <div className="flex items-center gap-2 text-xs font-serif font-semibold text-[#29483E]">
                      <Sparkles className="w-3.5 h-3.5 text-[#526E63]" />
                      <span>{selectedCategorySummary.category.title} Reframe</span>
                    </div>

                    <p className="font-serif text-sm text-[#1F332C] font-semibold leading-relaxed">
                      “{selectedCategorySummary.category.counterScript}”
                    </p>

                    <div className="pt-2 border-t border-[#E1ECE6] text-xs text-[#526E63] space-y-1">
                      <span className="font-medium text-[#29483E] block">Psychological Impact:</span>
                      <p>{selectedCategorySummary.category.narrativeImpact}</p>
                    </div>
                  </motion.div>
                )}

                <div className="p-3.5 rounded-xl bg-white/70 border border-[#D5E4DD] text-xs text-[#486359] leading-relaxed italic">
                  💡 When scrolling, ask yourself: “Am I reacting to my real life right now, or to the script this algorithm is selling me?”
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Narrative Node Interactive Inspector / Illuminated Card */}
      {selectedCategorySummary && (
        <motion.div
          key={`inspector-${selectedCategorySummary.category.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white/90 border border-[#E6DCCA] rounded-2xl p-5 sm:p-6 subtle-shadow space-y-4 relative overflow-hidden"
        >
          {/* Accent top ribbon */}
          <div
            className="absolute top-0 left-0 right-0 h-1.5"
            style={{ backgroundColor: selectedCategorySummary.category.accentColor }}
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFE5D8] pb-3">
            <div className="flex items-center gap-3">
              <div
                style={{ backgroundColor: selectedCategorySummary.category.bgTint }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-[#2B1D17] border border-[#E2D2C2]"
              >
                {getCategoryIcon(selectedCategorySummary.category.iconName)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-serif font-bold text-base sm:text-lg text-[#261A15]">
                    {selectedCategorySummary.category.title}
                  </h4>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#FAF0E6] text-[#7A4533] border border-[#EADBCE]">
                    {selectedCategorySummary.count} cues ({selectedCategorySummary.percentage}%)
                  </span>
                </div>
                <p className="text-xs text-[#7A6A61] italic font-serif">
                  {selectedCategorySummary.category.tagline}
                </p>
              </div>
            </div>

            <span className="text-xs text-[#8F7E75] font-serif">
              Click any node in the constellation to inspect
            </span>
          </div>

          {/* Detailed Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-1">
            {/* The Subconscious Story */}
            <div className="bg-[#FAF5EE] p-4 rounded-xl border border-[#EADFCF] space-y-2">
              <span className="font-serif font-bold text-[#7A3F2E] flex items-center gap-1.5 text-xs">
                <Info className="w-3.5 h-3.5 text-[#B4654A]" />
                <span>The Story It Was Telling You</span>
              </span>
              <p className="text-[#55433A] leading-relaxed font-serif italic text-xs">
                {selectedCategorySummary.category.subtitle}
              </p>
              <p className="text-[#6D5A50] leading-relaxed pt-1 border-t border-[#E8DEC9]">
                {selectedCategorySummary.category.narrativeImpact}
              </p>
            </div>

            {/* The Grounded Reframe */}
            <div className="bg-[#F3F7F5] p-4 rounded-xl border border-[#D5E5DE] space-y-2">
              <span className="font-serif font-bold text-[#2A4D41] flex items-center gap-1.5 text-xs">
                <Sparkles className="w-3.5 h-3.5 text-[#526E63]" />
                <span>The Grounding Counter-Script</span>
              </span>
              <p className="text-[#1D332B] leading-relaxed font-serif font-semibold text-xs">
                “{selectedCategorySummary.category.counterScript}”
              </p>
              <p className="text-[#4E685E] leading-relaxed pt-1 border-t border-[#DBE9E3]">
                Notice that you do not need to adopt the urgency or comparison projected by this post format.
              </p>
            </div>
          </div>

          {/* User's logged notes for this specific category if any */}
          {selectedCategorySummary.notes.length > 0 && (
            <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#EAE1D3] space-y-2">
              <span className="text-[11px] font-serif font-bold text-[#3B2B24] block">
                Your Logged Post Observations ({selectedCategorySummary.notes.length}):
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedCategorySummary.notes.map((note, nIdx) => (
                  <span
                    key={`note-pill-${nIdx}`}
                    className="inline-block px-3 py-1 bg-white border border-[#E0D3C2] rounded-lg text-xs text-[#524137] italic"
                  >
                    “{note}”
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
};
