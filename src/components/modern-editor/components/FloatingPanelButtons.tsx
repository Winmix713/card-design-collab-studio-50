
import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Palette, Layers, Box } from 'lucide-react';

interface FloatingPanelButtonsProps {
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

export const FloatingPanelButtons: React.FC<FloatingPanelButtonsProps> = ({
  activePanel,
  setActivePanel
}) => {
  const floatingPanels = [
    { id: 'style', icon: Palette, label: 'Style', position: { top: '10%', left: '2%' } },
    { id: 'gradient', icon: Layers, label: 'Gradient', position: { top: '30%', left: '2%' } },
    { id: 'shadow', icon: Box, label: '3D Shadow', position: { top: '50%', left: '2%' } },
    { id: 'presets', icon: Settings, label: 'Presets', position: { top: '70%', left: '2%' } }
  ];

  return (
    <>
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
