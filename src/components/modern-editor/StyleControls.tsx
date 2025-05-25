
import React from 'react';
import { motion } from 'framer-motion';
import { Circle, Square } from 'lucide-react';
import { CardAttributes } from './hooks/useCardAttributes';

interface StyleControlsProps {
  cardAttributes: CardAttributes;
  updateAttribute: (key: keyof CardAttributes, value: any) => void;
}

export const StyleControls: React.FC<StyleControlsProps> = ({
  cardAttributes,
  updateAttribute
}) => {
  const backgroundTypes = [
    { id: 'solid', label: 'Solid', icon: Circle },
    { id: 'gradient', label: 'Gradient', icon: Square }
  ] as const;

  return (
    <div className="space-y-6">
      {/* Background Type */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-3">
          Background Type
        </label>
        <div className="grid grid-cols-2 gap-3">
          {backgroundTypes.map((type) => {
            const Icon = type.icon;
            return (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateAttribute('backgroundType', type.id)}
                className={`p-3 rounded-xl border transition-all ${
                  cardAttributes.backgroundType === type.id
                    ? 'bg-purple-500/30 border-purple-400 text-white'
                    : 'bg-white/5 border-white/20 text-white/70 hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs">{type.label}</div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-3">
          Background Color
        </label>
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-xl border-2 border-white/20 cursor-pointer relative overflow-hidden"
            style={{ backgroundColor: cardAttributes.backgroundColor }}
          >
            <input
              type="color"
              value={cardAttributes.backgroundColor}
              onChange={(e) => updateAttribute('backgroundColor', e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max="100"
              value={cardAttributes.backgroundOpacity}
              onChange={(e) => updateAttribute('backgroundOpacity', parseInt(e.target.value))}
              className="w-full accent-purple-500"
            />
            <div className="text-xs text-white/60 mt-1">
              Opacity: {cardAttributes.backgroundOpacity}%
            </div>
          </div>
        </div>
      </div>

      {/* Border Radius */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-3">
          Border Radius
        </label>
        <div className="space-y-3">
          <input
            type="range"
            min="0"
            max="50"
            value={cardAttributes.borderRadius}
            onChange={(e) => updateAttribute('borderRadius', parseInt(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="text-xs text-white/60">
            {cardAttributes.borderRadius}px
          </div>
        </div>
      </div>

      {/* Glassmorphism Toggle */}
      <div>
        <label className="flex items-center justify-between">
          <span className="text-sm font-medium text-white/80">Glassmorphism</span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => updateAttribute('glassmorphism', !cardAttributes.glassmorphism)}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              cardAttributes.glassmorphism ? 'bg-purple-500' : 'bg-white/20'
            }`}
          >
            <motion.div
              className="absolute w-5 h-5 bg-white rounded-full top-0.5"
              animate={{
                x: cardAttributes.glassmorphism ? 26 : 2
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </label>
      </div>

      {/* Dimensions */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Width
          </label>
          <input
            type="range"
            min="200"
            max="500"
            value={cardAttributes.width}
            onChange={(e) => updateAttribute('width', parseInt(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="text-xs text-white/60 mt-1">
            {cardAttributes.width}px
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Height
          </label>
          <input
            type="range"
            min="100"
            max="400"
            value={cardAttributes.height}
            onChange={(e) => updateAttribute('height', parseInt(e.target.value))}
            className="w-full accent-purple-500"
          />
          <div className="text-xs text-white/60 mt-1">
            {cardAttributes.height}px
          </div>
        </div>
      </div>
    </div>
  );
};
