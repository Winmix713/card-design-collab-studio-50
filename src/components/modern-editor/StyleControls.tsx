
import React from 'react';
import { motion } from 'framer-motion';
import { Circle, Square, Sparkles, Maximize2, Palette } from 'lucide-react';
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
    { id: 'solid', label: 'Solid', icon: Circle, description: 'Single color' },
    { id: 'gradient', label: 'Gradient', icon: Square, description: 'Color blend' }
  ] as const;

  const ControlCard = ({ children, title, icon: Icon }: { children: React.ReactNode; title: string; icon?: any }) => (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/8 transition-all duration-300"
    >
      <div className="flex items-center space-x-2 mb-4">
        {Icon && <Icon className="w-4 h-4 text-purple-400" />}
        <h3 className="text-sm font-semibold text-white/90">{title}</h3>
      </div>
      {children}
    </motion.div>
  );

  return (
    <div className="space-y-6">
      {/* Background Type Selection */}
      <ControlCard title="Background Type" icon={Palette}>
        <div className="grid grid-cols-2 gap-3">
          {backgroundTypes.map((type) => {
            const Icon = type.icon;
            return (
              <motion.button
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => updateAttribute('backgroundType', type.id)}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  cardAttributes.backgroundType === type.id
                    ? 'bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30'
                }`}
              >
                <Icon className="w-5 h-5 mx-auto mb-2 text-current" />
                <div className="text-xs font-medium">{type.label}</div>
                <div className="text-xs text-white/60 mt-1">{type.description}</div>
              </motion.button>
            );
          })}
        </div>
      </ControlCard>

      {/* Background Color */}
      <ControlCard title="Background Color" icon={Circle}>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl border-2 border-white/20 cursor-pointer relative overflow-hidden shadow-lg"
                style={{ backgroundColor: cardAttributes.backgroundColor }}
              >
                <input
                  type="color"
                  value={cardAttributes.backgroundColor}
                  onChange={(e) => updateAttribute('backgroundColor', e.target.value)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <Palette className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs text-white/70">Opacity</span>
                <span className="text-xs text-purple-400 font-medium">{cardAttributes.backgroundOpacity}%</span>
              </div>
              <div className="relative">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cardAttributes.backgroundOpacity}
                  onChange={(e) => updateAttribute('backgroundOpacity', parseInt(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
                />
                <style jsx>{`
                  .slider::-webkit-slider-thumb {
                    appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8b5cf6, #a855f7);
                    cursor: pointer;
                    box-shadow: 0 2px 6px rgba(139, 92, 246, 0.3);
                  }
                  .slider::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #8b5cf6, #a855f7);
                    cursor: pointer;
                    border: none;
                  }
                `}</style>
              </div>
            </div>
          </div>
        </div>
      </ControlCard>

      {/* Border Radius */}
      <ControlCard title="Border Radius" icon={Square}>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/70">Roundness</span>
            <span className="text-xs text-purple-400 font-medium">{cardAttributes.borderRadius}px</span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            value={cardAttributes.borderRadius}
            onChange={(e) => updateAttribute('borderRadius', parseInt(e.target.value))}
            className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="grid grid-cols-4 gap-2 mt-3">
            {[0, 8, 16, 32].map((value) => (
              <button
                key={value}
                onClick={() => updateAttribute('borderRadius', value)}
                className={`p-2 rounded-lg text-xs transition-all ${
                  cardAttributes.borderRadius === value
                    ? 'bg-purple-500/30 text-purple-300 border border-purple-400'
                    : 'bg-white/5 text-white/60 hover:bg-white/10'
                }`}
              >
                {value}px
              </button>
            ))}
          </div>
        </div>
      </ControlCard>

      {/* Glassmorphism */}
      <ControlCard title="Special Effects" icon={Sparkles}>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <div>
                <div className="text-sm font-medium text-white">Glassmorphism</div>
                <div className="text-xs text-white/60">Frosted glass effect</div>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => updateAttribute('glassmorphism', !cardAttributes.glassmorphism)}
              className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
                cardAttributes.glassmorphism ? 'bg-purple-500' : 'bg-white/20'
              }`}
            >
              <motion.div
                className="absolute w-5 h-5 bg-white rounded-full top-1 shadow-sm"
                animate={{
                  x: cardAttributes.glassmorphism ? 30 : 4
                }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </motion.button>
          </div>
        </div>
      </ControlCard>

      {/* Dimensions */}
      <ControlCard title="Dimensions" icon={Maximize2}>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/70">Width</span>
              <span className="text-xs text-purple-400 font-medium">{cardAttributes.width}px</span>
            </div>
            <input
              type="range"
              min="200"
              max="500"
              value={cardAttributes.width}
              onChange={(e) => updateAttribute('width', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-white/70">Height</span>
              <span className="text-xs text-purple-400 font-medium">{cardAttributes.height}px</span>
            </div>
            <input
              type="range"
              min="100"
              max="400"
              value={cardAttributes.height}
              onChange={(e) => updateAttribute('height', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </ControlCard>
    </div>
  );
};
