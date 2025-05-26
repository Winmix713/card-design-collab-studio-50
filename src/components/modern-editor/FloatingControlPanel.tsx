
import React from 'react';
import { motion } from 'framer-motion';
import { X, Palette, Layers, Box, Settings } from 'lucide-react';
import { CardAttributes } from './hooks/useCardAttributes';
import { VisualGradientBuilder } from './VisualGradientBuilder';
import { Shadow3DController } from './Shadow3DController';
import { SmartPresetGallery } from './SmartPresetGallery';
import { StyleControls } from './StyleControls';

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

  const getPanelConfig = () => {
    const configs = {
      style: {
        title: 'Style Controls',
        icon: Palette,
        gradient: 'from-blue-500 to-purple-600'
      },
      gradient: {
        title: 'Gradient Builder',
        icon: Layers,
        gradient: 'from-pink-500 to-orange-500'
      },
      shadow: {
        title: '3D Shadow',
        icon: Box,
        gradient: 'from-green-500 to-teal-600'
      },
      presets: {
        title: 'Smart Presets',
        icon: Settings,
        gradient: 'from-purple-500 to-indigo-600'
      }
    };
    return configs[activePanel as keyof typeof configs] || configs.style;
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

  const config = getPanelConfig();
  const IconComponent = config.icon;

  return (
    <motion.div
      className="fixed inset-0 z-30 flex items-center justify-center p-4"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl overflow-hidden max-w-lg w-full max-h-[85vh] shadow-2xl"
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Enhanced Header with Gradient */}
        <div className={`bg-gradient-to-r ${config.gradient} p-6 relative overflow-hidden`}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                <IconComponent className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">
                  {config.title}
                </h2>
                <p className="text-white/80 text-sm">
                  Customize your card design
                </p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 transition-all duration-200 backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-white" />
            </motion.button>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-2 -left-2 w-16 h-16 bg-white/5 rounded-full blur-lg" />
        </div>
        
        {/* Content Area with Better Spacing */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-140px)]" style={{
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

        {/* Bottom Gradient Fade */}
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
