
import React from 'react';
import { motion } from 'framer-motion';
import { CardAttributes } from './hooks/useCardAttributes';
import { PanelHeader } from './panels/PanelHeader';
import { StylePanel, GradientPanel, ShadowPanel, PresetsPanel, TypographyPanel, EffectsPanel } from './panels';
import { PanelType } from './panels/PanelConfig';

interface FloatingControlPanelProps {
  activePanel: string;
  cardAttributes: CardAttributes;
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
      x: -300,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: 'blur(0px)',
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300 
      }
    },
    exit: { 
      opacity: 0, 
      x: -300,
      filter: 'blur(10px)',
      transition: { duration: 0.2 }
    }
  };

  const renderPanelContent = () => {
    switch (activePanel) {
      case 'style':
        return <StylePanel cardAttributes={cardAttributes} updateAttribute={updateAttribute} />;
      case 'gradient':
        return <GradientPanel cardAttributes={cardAttributes} updateAttribute={updateAttribute} />;
      case 'shadow':
        return <ShadowPanel cardAttributes={cardAttributes} updateShadow={updateShadow} />;
      case 'presets':
        return <PresetsPanel cardAttributes={cardAttributes} updateAttribute={updateAttribute} />;
      case 'typography':
        return <TypographyPanel cardAttributes={cardAttributes} updateAttribute={updateAttribute} />;
      case 'effects':
        return <EffectsPanel cardAttributes={cardAttributes} updateAttribute={updateAttribute} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      className="fixed left-4 top-1/2 transform -translate-y-1/2 z-30 w-80"
      variants={panelVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.div
        className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <PanelHeader panelType={activePanel as PanelType} onClose={onClose} />
        
        <div className="p-6 max-h-[70vh] overflow-y-auto" style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1)'
        }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            {renderPanelContent()}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </motion.div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </motion.div>
  );
};
