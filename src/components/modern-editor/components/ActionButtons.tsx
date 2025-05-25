
import React from 'react';
import { motion } from 'framer-motion';
import { Wand2, Download } from 'lucide-react';

interface ActionButtonsProps {
  showMixer: boolean;
  setShowMixer: (show: boolean) => void;
  showExport: boolean;
  setShowExport: (show: boolean) => void;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  showMixer,
  setShowMixer,
  showExport,
  setShowExport
}) => {
  return (
    <div className="fixed top-6 right-6 z-20 flex space-x-3">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowMixer(!showMixer)}
        className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white shadow-lg"
      >
        <Wand2 className="w-5 h-5" />
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowExport(!showExport)}
        className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg"
      >
        <Download className="w-5 h-5" />
      </motion.button>
    </div>
  );
};
