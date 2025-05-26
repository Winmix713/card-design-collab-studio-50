
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Palette, Layers, Box, Undo, Redo, RotateCcw, Grid, Shuffle, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../ui/tooltip';

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
  const floatingPanels = [
    { id: 'style', icon: Palette, label: 'Style', position: { top: '10%', left: '2%' } },
    { id: 'gradient', icon: Layers, label: 'Gradient', position: { top: '25%', left: '2%' } },
    { id: 'shadow', icon: Box, label: '3D Shadow', position: { top: '40%', left: '2%' } },
    { id: 'presets', icon: Settings, label: 'Presets', position: { top: '55%', left: '2%' } }
  ];

  const quickActions = [
    { id: 'templates', icon: Grid, label: 'Templates', action: onTemplateGallery, shortcut: 'Ctrl+T' },
    { id: 'randomize', icon: Shuffle, label: 'Randomize', action: onRandomize, shortcut: 'Ctrl+R' },
    { id: 'export', icon: Download, label: 'Export', action: onExport, shortcut: 'Ctrl+S' }
  ];

  // Enhanced keyboard shortcuts with error handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      try {
        if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
          e.preventDefault();
          if (canUndo && undo) {
            undo();
            console.log('Undo triggered via keyboard');
          }
        } else if (((e.ctrlKey || e.metaKey) && e.key === 'y') || 
                   ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z')) {
          e.preventDefault();
          if (canRedo && redo) {
            redo();
            console.log('Redo triggered via keyboard');
          }
        }
      } catch (error) {
        console.warn('Error in keyboard shortcut handler:', error);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  return (
    <TooltipProvider>
      {/* Enhanced Undo/Redo section */}
      <motion.div
        className="fixed z-20"
        style={{ top: '2%', left: '2%' }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={undo}
                  disabled={!canUndo}
                  className={`p-3 rounded-xl backdrop-blur-md transition-all duration-300 ${
                    canUndo
                      ? 'bg-white/10 border border-white/20 hover:bg-white/15 text-white'
                      : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <Undo className="w-5 h-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Undo (Ctrl+Z)</p>
                {historySize && <p className="text-xs text-gray-400">
                  {historySize.past} steps available
                </p>}
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={redo}
                  disabled={!canRedo}
                  className={`p-3 rounded-xl backdrop-blur-md transition-all duration-300 ${
                    canRedo
                      ? 'bg-white/10 border border-white/20 hover:bg-white/15 text-white'
                      : 'bg-white/5 border border-white/10 text-white/30 cursor-not-allowed'
                  }`}
                >
                  <Redo className="w-5 h-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Redo (Ctrl+Y)</p>
                {historySize && <p className="text-xs text-gray-400">
                  {historySize.future} steps available
                </p>}
              </TooltipContent>
            </Tooltip>

            {clearHistory && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={clearHistory}
                    className="p-3 rounded-xl backdrop-blur-md transition-all duration-300 bg-white/10 border border-white/20 hover:bg-red-500/20 text-white"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Clear History</p>
                  <p className="text-xs text-gray-400">Reset all changes</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* History info indicator */}
          {historySize && historySize.total > 1 && (
            <div className="text-xs text-white/60 text-center bg-white/5 rounded-lg px-2 py-1">
              {historySize.total}/50 steps
              {lastAction && (
                <div className="text-white/40 truncate">
                  {lastAction.replace(/_/g, ' ')}
                </div>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        className="fixed z-20"
        style={{ top: '2%', right: '2%' }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex space-x-2">
          {quickActions.map((action) => (
            <Tooltip key={action.id}>
              <TooltipTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={action.action}
                  className="p-3 rounded-xl backdrop-blur-md transition-all duration-300 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 hover:from-purple-500/30 hover:to-pink-500/30 text-white"
                >
                  <action.icon className="w-5 h-5" />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label} ({action.shortcut})</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </motion.div>

      {/* Enhanced panel buttons with tooltips */}
      {floatingPanels.map((panel) => (
        <motion.div
          key={panel.id}
          className="fixed z-20"
          style={panel.position}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setActivePanel(activePanel === panel.id ? '' : panel.id)}
                className={`p-4 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                  activePanel === panel.id
                    ? 'bg-white/20 border-2 border-purple-400 shadow-lg shadow-purple-500/25'
                    : 'bg-white/10 border border-white/20 hover:bg-white/15'
                }`}
              >
                <panel.icon className="w-6 h-6 text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{panel.label}</p>
              <p className="text-xs text-gray-400">
                Click to {activePanel === panel.id ? 'close' : 'open'} panel
              </p>
            </TooltipContent>
          </Tooltip>
          <div className="text-xs text-white/70 text-center mt-2">{panel.label}</div>
        </motion.div>
      ))}
    </TooltipProvider>
  );
};
