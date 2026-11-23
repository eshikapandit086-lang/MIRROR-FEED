import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { LandingView } from './components/LandingView';
import { AuditView } from './components/AuditView';
import { NarrativeMapView } from './components/NarrativeMapView';
import { DEMO_PRESET_LOGS } from './data/categories';
import { AuditLogItem, PatternCategoryId, ScreenState } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('landing');
  const [logs, setLogs] = useState<AuditLogItem[]>([]);

  // Add a new logged cue
  const handleAddLog = (categoryId: PatternCategoryId, note?: string) => {
    const newItem: AuditLogItem = {
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      categoryId,
      timestamp: Date.now(),
      note,
    };
    setLogs((prev) => [newItem, ...prev]);
  };

  // Remove a specific log
  const handleRemoveLog = (id: string) => {
    setLogs((prev) => prev.filter((item) => item.id !== id));
  };

  // Decrement the most recent entry of a category
  const handleDecrementCategory = (categoryId: PatternCategoryId) => {
    setLogs((prev) => {
      const idx = prev.findIndex((item) => item.categoryId === categoryId);
      if (idx !== -1) {
        const next = [...prev];
        next.splice(idx, 1);
        return next;
      }
      return prev;
    });
  };

  // Load sample demo data for pitch video recording
  const handleLoadDemo = () => {
    setLogs(DEMO_PRESET_LOGS);
    setCurrentScreen('audit');
  };

  // Restart / Reset
  const handleReset = () => {
    setLogs([]);
    setCurrentScreen('landing');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#2D2522] paper-grain selection:bg-[#EBD6CE] selection:text-[#381E25]">
      {/* Universal Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
        totalLogs={logs.length}
        onReset={handleReset}
      />

      {/* Main Flow Content with page transitions */}
      <main className="flex-1 w-full flex flex-col">
        <AnimatePresence mode="wait">
          {currentScreen === 'landing' && (
            <motion.div
              key="screen-landing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1"
            >
              <LandingView
                onStart={() => setCurrentScreen('audit')}
                onLoadDemo={handleLoadDemo}
              />
            </motion.div>
          )}

          {currentScreen === 'audit' && (
            <motion.div
              key="screen-audit"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1"
            >
              <AuditView
                logs={logs}
                onAddLog={handleAddLog}
                onRemoveLog={handleRemoveLog}
                onDecrementCategory={handleDecrementCategory}
                onSeeMap={() => setCurrentScreen('map')}
                onLoadDemo={handleLoadDemo}
              />
            </motion.div>
          )}

          {currentScreen === 'map' && (
            <motion.div
              key="screen-map"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="w-full flex-1"
            >
              <NarrativeMapView
                logs={logs}
                onRestart={handleReset}
                onContinueAudit={() => setCurrentScreen('audit')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
