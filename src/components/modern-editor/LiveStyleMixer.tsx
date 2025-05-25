
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Shuffle, Copy } from 'lucide-react';

interface LiveStyleMixerProps {
  cardAttributes: any;
  updateAttribute: (key: string, value: any) => void;
  onClose: () => void;
}

export const LiveStyleMixer: React.FC<LiveStyleMixerProps> = ({
  cardAttributes,
  updateAttribute,
  onClose
}) => {
  const [mixStrength, setMixStrength] = useState(50);

  const styleCategories = [
    {
      name: 'Colors',
      styles: [
        { backgroundColor: '#667eea', gradientColor: '#764ba2' },
        { backgroundColor: '#f093fb', gradientColor: '#f5576c' },
        { backgroundColor: '#4facfe', gradientColor: '#00f2fe' }
      ]
    },
    {
      name: 'Shapes',
      styles: [
        { borderRadius: 8 },
        { borderRadius: 20 },
        { borderRadius: 40 }
      ]
    },
    {
      name: 'Effects',
      styles: [
        { glassmorphism: true, backdropBlur: 10 },
        { primaryShadow: { ...cardAttributes.primaryShadow, blur: 30, opacity: 50 } },
        { borderWidth: 2, borderColor: '#8b5cf6' }
      ]
    }
  ];

  const randomizeStyle = () => {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
    const randomRadius = Math.floor(Math.random() * 40);
    const randomBlur = Math.floor(Math.random() * 30) + 5;
    
    updateAttribute('backgroundColor', randomColor());
    updateAttribute('gradientColor', randomColor());
    updateAttribute('borderRadius', randomRadius);
    updateAttribute('primaryShadow', {
      ...cardAttributes.primaryShadow,
      blur: randomBlur,
      x: Math.floor(Math.random() * 20) - 10,
      y: Math.floor(Math.random() * 20) - 10
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      initial={{ backgroundColor: 'rgba(0,0,0,0)' }}
      animate={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      exit={{ backgroundColor: 'rgba(0,0,0,0)' }}
      onClick={onClose}
    >
      <motion.div
        className="bg-gradient-to-br from-purple-900/90 to-pink-900/90 backdrop-blur-xl border border-white/20 rounded-3xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Style Mixer</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </motion.button>
        </div>

        {/* Mix Strength */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-white/80 mb-3">
            Mix Strength
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={mixStrength}
            onChange={(e) => setMixStrength(parseInt(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="text-center text-white/60 mt-2">{mixStrength}%</div>
        </div>

        {/* Random Generator */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={randomizeStyle}
          className="w-full p-4 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 text-white font-medium mb-6 flex items-center justify-center space-x-2"
        >
          <Shuffle className="w-5 h-5" />
          <span>Randomize Style</span>
        </motion.button>

        {/* Style Categories */}
        <div className="space-y-6">
          {styleCategories.map((category) => (
            <div key={category.name}>
              <h3 className="text-lg font-medium text-white mb-3">{category.name}</h3>
              <div className="grid grid-cols-3 gap-3">
                {category.styles.map((style, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      Object.keys(style).forEach(key => {
                        updateAttribute(key, style[key as keyof typeof style]);
                      });
                    }}
                    className="p-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-colors"
                  >
                    <div className="text-xs text-white/80">Mix {index + 1}</div>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
