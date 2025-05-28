
import React from 'react';
import { motion } from 'framer-motion';
import { Save, Share2, Eye, Settings2 } from 'lucide-react';

interface ActionButtonsProps {
  showPreview: boolean;
  setShowPreview: (show: boolean) => void;
  showSettings: boolean;
  setShowSettings: (show: boolean) => void;
  onSave?: () => void;
  onShare?: () => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  showPreview,
  setShowPreview,
  showSettings,
  setShowSettings,
  onSave,
  onShare
}) => {
  const buttons = [
    {
      id: 'save',
      icon: Save,
      label: 'Save Project',
      action: onSave || (() => {}),
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      id: 'share',
      icon: Share2,
      label: 'Share',
      action: onShare || (() => {}),
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'preview',
      icon: Eye,
      label: 'Preview Mode',
      action: () => setShowPreview(!showPreview),
      gradient: 'from-purple-500 to-indigo-500',
      active: showPreview
    },
    {
      id: 'settings',
      icon: Settings2,
      label: 'Project Settings',
      action: () => setShowSettings(!showSettings),
      gradient: 'from-orange-500 to-red-500',
      active: showSettings
    }
  ];

  return (
    <div className="fixed top-6 right-6 z-20 flex flex-col space-y-3">
      {buttons.map((button) => {
        const Icon = button.icon;
        return (
          <motion.button
            key={button.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={button.action}
            className={`p-3 rounded-xl bg-gradient-to-r ${button.gradient} text-white shadow-lg ${
              button.active ? 'ring-2 ring-white/50' : ''
            }`}
            title={button.label}
          >
            <Icon className="w-5 h-5" />
          </motion.button>
        );
      })}
    </div>
  );
};
