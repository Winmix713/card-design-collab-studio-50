
import React from 'react';
import { motion } from 'framer-motion';
import { generateCardStyle } from '../utils/styleUtils';
import { CardAttributes } from '../hooks/useCardAttributes';

interface CardPreviewProps {
  cardAttributes: CardAttributes;
  activePanel: string;
}

export const CardPreview: React.FC<CardPreviewProps> = ({
  cardAttributes,
  activePanel
}) => {
  const cardStyle = generateCardStyle(cardAttributes);

  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <motion.div
        className="relative"
        animate={{ 
          rotateY: activePanel === 'shadow' ? 15 : 0,
          rotateX: activePanel === 'shadow' ? 5 : 0
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ perspective: 1000 }}
      >
        <motion.div
          className="transition-all duration-500 ease-out flex items-center justify-center relative"
          whileHover={{ scale: 1.02 }}
          style={cardStyle}
        >
          <div className="text-center">
            <motion.div 
              className="font-semibold text-lg mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Modern Card
            </motion.div>
            <motion.div 
              className="text-sm opacity-80"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Live preview with real-time updates
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
