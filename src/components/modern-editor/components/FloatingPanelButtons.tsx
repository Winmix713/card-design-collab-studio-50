import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Settings, Palette, Layers, Box, Undo, Redo } from 'lucide-react';

interface FloatingPanelButtonsProps {
  activePanel: string;
  setActivePanel: (panel: string) => void;
  undo?: () => void;
  redo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
}

export const FloatingPanelButtons: React.FC<FloatingPanelButtonsProps> = ({
  activePanel,
  setActivePanel,
  undo,
  redo,
  canUndo = false,
  canRedo = false
}) => {
  const floatingPanels = [
    { id: 'style', icon: Palette, label: 'Style', position: { top: '10%', left: '2%' } },
    { id: 'gradient', icon: Layers, label: 'Gradient', position: { top: '30%', left: '2%' } },
    { id: 'shadow', icon: Box, label: '3D Shadow', position: { top: '50%', left: '2%' } },
    { id: 'presets', icon: Settings, label: 'Presets', position: { top: '70%', left: '2%' } }
  ];

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        if (canUndo && undo) undo();
      } else if (((e.ctrlKey || e.metaKey) && e.key === 'y') || 
                 ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'Z')) {
        e.preventDefault();
        if (canRedo && redo) redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo]);

  return (
    <>
      {/* Undo/Redo buttons */}
      <motion.div
        className="fixed z-20"
        style={{ top: '2%', left: '2%' }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex space-x-2">
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
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-5 h-5" />
          </motion.button>
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
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-5 h-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Existing panel buttons */}
      {floatingPanels.map((panel) => (
        <motion.div
          key={panel.id}
          className="fixed z-20"
          style={panel.position}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
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
          <div className="text-xs text-white/70 text-center mt-2">{panel.label}</div>
        </motion.div>
      ))}
    </>
  );
};
