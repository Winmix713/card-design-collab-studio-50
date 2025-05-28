
import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { panelConfigs, PanelType } from './PanelConfig';

interface PanelHeaderProps {
  panelType: PanelType;
  onClose: () => void;
}

export const PanelHeader: React.FC<PanelHeaderProps> = ({ panelType, onClose }) => {
  const config = panelConfigs[panelType];
  const IconComponent = config.icon;

  return (
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
  );
};
