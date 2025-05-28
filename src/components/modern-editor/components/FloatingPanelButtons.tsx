
import React from 'react';
import { motion } from 'framer-motion';
import { TooltipProvider } from '../../ui/tooltip';
import { HistoryButtons } from '../buttons/HistoryButtons';
import { QuickActionButtons } from '../buttons/QuickActionButtons';
import { PanelButtons } from '../buttons/PanelButtons';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';

interface FloatingPanelButtonsProps {
  activePanel: string;
  setActivePanel: (panel: string) => void;
  undo?: () => void;
  redo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  clearHistory?: () => void;
  historySize?: { past: number; future: number; total: number };
  lastAction?: string | null;
  onTemplateGallery?: () => void;
  onRandomize?: () => void;
  onExport?: () => void;
}

export const FloatingPanelButtons: React.FC<FloatingPanelButtonsProps> = ({
  activePanel,
  setActivePanel,
  undo,
  redo,
  canUndo = false,
  canRedo = false,
  clearHistory,
  historySize,
  lastAction,
  onTemplateGallery,
  onRandomize,
  onExport
}) => {
  useKeyboardShortcuts({
    undo,
    redo,
    canUndo,
    canRedo,
    onExport,
    onTemplates: onTemplateGallery,
    onRandomize
  });

  return (
    <TooltipProvider>
      {/* History Controls */}
      <motion.div
        className="fixed z-20"
        style={{ top: '2%', left: '2%' }}
        whileHover={{ scale: 1.02 }}
      >
        <HistoryButtons
          undo={undo}
          redo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          clearHistory={clearHistory}
          historySize={historySize}
          lastAction={lastAction}
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="fixed z-20"
        style={{ top: '2%', right: '2%' }}
        whileHover={{ scale: 1.02 }}
      >
        <QuickActionButtons
          onTemplateGallery={onTemplateGallery}
          onRandomize={onRandomize}
          onExport={onExport}
        />
      </motion.div>

      {/* Panel Buttons */}
      <PanelButtons activePanel={activePanel} setActivePanel={setActivePanel} />
    </TooltipProvider>
  );
};
