
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCardAttributes } from './hooks/useCardAttributes';
import { AnimatedBackground } from './components/AnimatedBackground';
import { FloatingPanelButtons } from './components/FloatingPanelButtons';
import { ActionButtons } from './components/ActionButtons';
import { CardPreview } from './components/CardPreview';
import { FloatingControlPanel } from './FloatingControlPanel';
import { LiveStyleMixer } from './LiveStyleMixer';
import { ExportHub } from './ExportHub';

const ModernCardEditor = () => {
  const { 
    cardAttributes, 
    updateAttribute, 
    updateShadow,
    applyPreset,
    resetToDefault,
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
    historySize,
    lastAction
  } = useCardAttributes();
  const [activePanel, setActivePanel] = useState('style');
  const [showMixer, setShowMixer] = useState(false);
  const [showExport, setShowExport] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />

      <FloatingPanelButtons
        activePanel={activePanel}
        setActivePanel={setActivePanel}
        undo={undo}
        redo={redo}
        canUndo={canUndo}
        canRedo={canRedo}
        clearHistory={clearHistory}
        historySize={historySize}
        lastAction={lastAction}
      />

      <ActionButtons
        showMixer={showMixer}
        setShowMixer={setShowMixer}
        showExport={showExport}
        setShowExport={setShowExport}
      />

      <CardPreview
        cardAttributes={cardAttributes}
        activePanel={activePanel}
      />

      <AnimatePresence>
        {activePanel && (
          <FloatingControlPanel
            activePanel={activePanel}
            cardAttributes={cardAttributes}
            updateAttribute={updateAttribute}
            updateShadow={updateShadow}
            onClose={() => setActivePanel('')}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMixer && (
          <LiveStyleMixer
            cardAttributes={cardAttributes}
            updateAttribute={updateAttribute}
            onClose={() => setShowMixer(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showExport && (
          <ExportHub
            cardAttributes={cardAttributes}
            onClose={() => setShowExport(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernCardEditor;
