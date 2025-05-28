import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CardAttributes } from './hooks/useCardAttributes';
import { PanelHeader } from './panels/PanelHeader';
import { 
  StylePanel, 
  GradientPanel, 
  ShadowPanel, 
  PresetsPanel, 
  TypographyPanel, 
  EffectsPanel 
} from './panels';
import { PanelType } from './panels/PanelConfig';

interface FloatingControlPanelProps {
  activePanel: string;
  cardAttributes: CardAttributes;
  updateAttribute: (key: string, value: any) => void;
  updateShadow: (shadowType: string, key: string, value: any) => void;
  onClose: () => void;
}

const PANEL_COMPONENTS = {
  style: StylePanel,
  gradient: GradientPanel,
  shadow: ShadowPanel,
  presets: PresetsPanel,
  typography: TypographyPanel,
  effects: EffectsPanel,
} as const;

const panelVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95,
    filter: 'blur(8px)',
    y: -20
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    y: 0,
    transition: { 
      type: "spring", 
      damping: 25, 
      stiffness: 400,
      duration: 0.3
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.95,
    filter: 'blur(8px)',
    y: -20,
    transition: { 
      duration: 0.2,
      ease: "easeInOut"
    }
  }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

export const FloatingControlPanel: React.FC<FloatingControlPanelProps> = ({
  activePanel,
  cardAttributes,
  updateAttribute,
  updateShadow,
  onClose
}) => {
  const PanelComponent = PANEL_COMPONENTS[activePanel as keyof typeof PANEL_COMPONENTS];

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (!PanelComponent) {
    console.warn(`Unknown panel type: ${activePanel}`);
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={handleBackdropClick}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
        
        {/* Panel */}
        <motion.div
          className="relative w-full max-w-md mx-auto"
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
            <PanelHeader 
              panelType={activePanel as PanelType} 
              onClose={onClose} 
            />
            
            <div className="relative">
              <div 
                className="p-6 max-h-[60vh] overflow-y-auto scrollbar-custom"
                role="region"
                aria-label={`${activePanel} panel content`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    delay: 0.1,
                    duration: 0.3,
                    ease: "easeOut"
                  }}
                  className="space-y-6"
                >
                  <PanelComponent 
                    cardAttributes={cardAttributes} 
                    updateAttribute={updateAttribute}
                    {...(activePanel === 'shadow' && { updateShadow })}
                  />
                </motion.div>
              </div>
              
              {/* Gradient fade at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </motion.div>
      
      <style jsx>{`
        .scrollbar-custom {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
        }
        
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
          transition: background-color 0.2s ease;
        }
        
        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
    </AnimatePresence>
  );
};
