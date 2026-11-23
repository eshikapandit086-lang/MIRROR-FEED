import React from 'react';
import { motion } from 'motion/react';
import { CategorySummary, PatternCategoryId } from '../types';

interface RadialChartProps {
  categories: CategorySummary[];
  totalLogs: number;
}

export const RadialChart: React.FC<RadialChartProps> = ({ categories, totalLogs }) => {
  const size = 380;
  const center = size / 2;
  const maxRadius = 135;
  const numAxes = categories.length;

  // Compute angles for each axis (starting from top - 90 deg)
  const getCoordinates = (index: number, valueRatio: number) => {
    const angle = (index * 2 * Math.PI) / numAxes - Math.PI / 2;
    const r = Math.max(20, valueRatio * maxRadius);
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      angle,
    };
  };

  const getAxisEndpoint = (index: number) => {
    const angle = (index * 2 * Math.PI) / numAxes - Math.PI / 2;
    return {
      x: center + maxRadius * Math.cos(angle),
      y: center + maxRadius * Math.sin(angle),
      labelX: center + (maxRadius + 34) * Math.cos(angle),
      labelY: center + (maxRadius + 24) * Math.sin(angle),
    };
  };

  // Find max count to scale appropriately or percentage
  const maxCount = Math.max(...categories.map((c) => c.count), 1);

  // Polygon points
  const points = categories.map((cat, i) => {
    const ratio = totalLogs > 0 ? (cat.count / maxCount) * 0.85 + 0.15 : 0.2;
    return getCoordinates(i, ratio);
  });

  const polygonPath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Web rings (25%, 50%, 75%, 100%)
  const rings = [0.25, 0.5, 0.75, 1.0];

  return (
    <div className="w-full flex flex-col items-center justify-center relative select-none">
      <div className="w-full max-w-[400px] aspect-square relative flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible drop-shadow-xs"
        >
          <defs>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#A8576A" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#B4654A" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
            </radialGradient>

            <linearGradient id="polygonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A8576A" stopOpacity="0.55" />
              <stop offset="50%" stopColor="#B4654A" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#5D4F78" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background subtle radial glow */}
          <circle cx={center} cy={center} r={maxRadius + 20} fill="url(#mapGlow)" />

          {/* Concentric Guide Webs */}
          {rings.map((ringScale, idx) => {
            const ringPath = categories
              .map((_, i) => {
                const pt = getCoordinates(i, ringScale);
                return `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`;
              })
              .join(' ') + ' Z';

            return (
              <path
                key={`ring-${idx}`}
                d={ringPath}
                fill="none"
                stroke="#D6C8B5"
                strokeWidth={idx === rings.length - 1 ? '1.5' : '1'}
                strokeDasharray={idx === rings.length - 1 ? 'none' : '3 3'}
                opacity={0.65}
              />
            );
          })}

          {/* Radial Spokes / Axes */}
          {categories.map((cat, i) => {
            const end = getAxisEndpoint(i);
            return (
              <line
                key={`axis-${cat.category.id}`}
                x1={center}
                y1={center}
                x2={end.x}
                y2={end.y}
                stroke="#CEBFAC"
                strokeWidth="1"
                opacity={0.7}
              />
            );
          })}

          {/* Filled Narrative Polygon Area with motion animation */}
          <motion.path
            d={polygonPath}
            fill="url(#polygonGrad)"
            stroke="#8B3E52"
            strokeWidth="2.5"
            strokeLinejoin="round"
            initial={{ scale: 0.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: `${center}px ${center}px` }}
          />

          {/* Center anchor pin */}
          <circle cx={center} cy={center} r={4} fill="#382620" />
          <circle cx={center} cy={center} r={2} fill="#FAF7F2" />

          {/* Data Points / Nodes */}
          {points.map((pt, i) => {
            const cat = categories[i];
            return (
              <g key={`node-${cat.category.id}`}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={cat.count > 0 ? 6 : 4}
                  fill={cat.category.accentColor}
                  stroke="#FAF7F2"
                  strokeWidth="2"
                  className="transition-all duration-300 hover:scale-125 cursor-pointer"
                />
                {cat.count > 0 && (
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={9}
                    fill="none"
                    stroke={cat.category.accentColor}
                    strokeWidth="1"
                    opacity={0.6}
                  />
                )}
              </g>
            );
          })}

          {/* Axis Labels */}
          {categories.map((cat, i) => {
            const end = getAxisEndpoint(i);
            const isTop = Math.abs(end.y - (center - maxRadius)) < 20;
            const isBottom = Math.abs(end.y - (center + maxRadius)) < 20;
            const isRight = end.x > center + 30;

            let textAnchor: 'middle' | 'start' | 'end' = 'middle';
            if (!isTop && !isBottom) {
              textAnchor = isRight ? 'start' : 'end';
            }

            return (
              <g key={`label-${cat.category.id}`}>
                <text
                  x={end.labelX}
                  y={end.labelY}
                  textAnchor={textAnchor}
                  className="font-serif text-[12px] sm:text-[13px] font-semibold fill-[#382620]"
                  dominantBaseline="central"
                >
                  {cat.category.title}
                </text>
                <text
                  x={end.labelX}
                  y={end.labelY + 14}
                  textAnchor={textAnchor}
                  className="text-[11px] font-sans font-medium fill-[#827168]"
                  dominantBaseline="central"
                >
                  {cat.count} {cat.count === 1 ? 'time' : 'times'} ({cat.percentage}%)
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <div className="text-center mt-2 text-xs text-[#7A6A61] italic font-serif">
        The shape above is your feed’s emotional gravitational pull this session.
      </div>
    </div>
  );
};
