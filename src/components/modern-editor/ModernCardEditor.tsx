import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useCardAttributes } from './hooks/useCardAttributes';
import { AnimatedBackground } from './components/AnimatedBackground';
import { FloatingPanelButtons } from './components/FloatingPanelButtons';
import { ActionButtons } from './components/ActionButtons';
import { CardPreview } from './components/CardPreview';
import { FloatingControlPanel } from './FloatingControlPanel';
import { LiveStyleMixer } from './LiveStyleMixer';
import { EnhancedExportHub } from './EnhancedExportHub';
import { TemplateGallery } from './TemplateGallery';
import { generateRandomCard } from './utils/cardUtils';

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
    lastAction,
    cardStyle
  } = useCardAttributes();
  
  const [activePanel, setActivePanel] = useState('style');
  const [showMixer, setShowMixer] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [showTemplateGallery, setShowTemplateGallery] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              redo();
            } else {
              undo();
            }
            break;
          case 'y':
            e.preventDefault();
            redo();
            break;
          case 's':
            e.preventDefault();
            setShowExport(true);
            break;
          case 't':
            e.preventDefault();
            setShowTemplateGallery(true);
            break;
          case 'r':
            e.preventDefault();
            handleRandomize();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo]);

  const handleRandomize = useCallback(() => {
    const randomData = generateRandomCard();
    Object.keys(randomData).forEach(key => {
      if (key === 'primaryShadow') {
        Object.keys(randomData.primaryShadow).forEach(shadowKey => {
          updateShadow('primaryShadow', shadowKey, randomData.primaryShadow[shadowKey as keyof typeof randomData.primaryShadow]);
        });
      } else {
        updateAttribute(key, randomData[key as keyof typeof randomData]);
      }
    });
  }, [updateAttribute, updateShadow]);

  const handleApplyTemplate = useCallback((templateData: any) => {
    Object.keys(templateData).forEach(key => {
      if (key === 'primaryShadow') {
        Object.keys(templateData.primaryShadow).forEach(shadowKey => {
          updateShadow('primaryShadow', shadowKey, templateData.primaryShadow[shadowKey]);
        });
      } else {
        updateAttribute(key, templateData[key]);
      }
    });
  }, [updateAttribute, updateShadow]);

  const handleSave = useCallback(() => {
    // Implement save functionality
    console.log('Saving project...');
  }, []);

  const handleShare = useCallback(() => {
    // Implement share functionality
    console.log('Sharing project...');
  }, []);

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
        onTemplateGallery={() => setShowTemplateGallery(true)}
        onRandomize={handleRandomize}
        onExport={() => setShowExport(true)}
      />

      <ActionButtons
        showPreview={showPreview}
        setShowPreview={setShowPreview}
        showSettings={showSettings}
        setShowSettings={setShowSettings}
        onSave={handleSave}
        onShare={handleShare}
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
          <EnhancedExportHub
            cardAttributes={cardAttributes}
            onClose={() => setShowExport(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTemplateGallery && (
          <TemplateGallery
            onClose={() => setShowTemplateGallery(false)}
            onApplyTemplate={handleApplyTemplate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernCardEditor;
