
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { VisualGradientBuilder } from './VisualGradientBuilder';
import { Shadow3DController } from './Shadow3DController';
import { SmartPresetGallery } from './SmartPresetGallery';
import { StyleControls } from './StyleControls';

interface FloatingControlPanelProps {
  activePanel: string;
  cardAttributes: any;
  updateAttribute: (key: string, value: any) => void;
  updateShadow: (shadowType: string, key: string, value: any) => void;
  onClose: () => void;
}

export const FloatingControlPanel: React.FC<FloatingControlPanelProps> = ({
  activePanel,
  cardAttributes,
  updateAttribute,
  updateShadow,
  onClose
}) => {
  const panelVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      filter: 'blur(0px)',
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      filter: 'blur(10px)',
      transition: { duration: 0.2 }
    }
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'style':
        return (
          <StyleControls
            cardAttributes={cardAttributes}
            updateAttribute={updateAttribute}
          />
        );
      case 'gradient':
        return (
          <VisualGradientBuilder
            cardAttributes={cardAttributes}
            updateAttribute={updateAttribute}
          />
        );
      case 'shadow':
        return (
          <Shadow3DController
            cardAttributes={cardAttributes}
            updateShadow={updateShadow}
          />
        );
      case 'presets':
        return (
          <SmartPresetGallery
            cardAttributes={cardAttributes}
            updateAttribute={updateAttribute}
          />
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white capitalize">
            {activePanel} Controls
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </motion.button>
        </div>
        
        <div className="space-y-6">
          {renderPanelContent()}
        </div>
      </motion.div>
    </motion.div>
  );
};
