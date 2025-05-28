
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, RotateCw, Maximize2, Contrast, Sun, Droplets } from 'lucide-react';
import { CardAttributes } from './hooks/useCardAttributes';

interface AdvancedEffectsProps {
  cardAttributes: CardAttributes;
  updateAttribute: (key: keyof CardAttributes, value: any) => void;
}

export const AdvancedEffects: React.FC<AdvancedEffectsProps> = ({
  cardAttributes,
  updateAttribute
}) => {
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
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Advanced Effects</h3>
      </div>

      {/* Transform Controls */}
      <ControlCard title="Transform" icon={RotateCw}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/70">Rotation</span>
              <span className="text-xs text-purple-400 font-medium">{cardAttributes.rotation || 0}°</span>
            </div>
            <input
              type="range"
              min="-180"
              max="180"
              value={cardAttributes.rotation || 0}
              onChange={(e) => updateAttribute('rotation', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/70">Scale X</span>
              <span className="text-xs text-purple-400 font-medium">{cardAttributes.scaleX || 1}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={cardAttributes.scaleX || 1}
              onChange={(e) => updateAttribute('scaleX', parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/70">Scale Y</span>
              <span className="text-xs text-purple-400 font-medium">{cardAttributes.scaleY || 1}x</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={cardAttributes.scaleY || 1}
              onChange={(e) => updateAttribute('scaleY', parseFloat(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </ControlCard>

      {/* Filter Effects */}
      <ControlCard title="Filters" icon={Contrast}>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/70">Blur</span>
              <span className="text-xs text-purple-400 font-medium">{cardAttributes.blur || 0}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="20"
              value={cardAttributes.blur || 0}
              onChange={(e) => updateAttribute('blur', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/70">Brightness</span>
              <span className="text-xs text-purple-400 font-medium">{cardAttributes.brightness || 100}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={cardAttributes.brightness || 100}
              onChange={(e) => updateAttribute('brightness', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/70">Contrast</span>
              <span className="text-xs text-purple-400 font-medium">{cardAttributes.contrast || 100}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={cardAttributes.contrast || 100}
              onChange={(e) => updateAttribute('contrast', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
          
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs text-white/70">Saturation</span>
              <span className="text-xs text-purple-400 font-medium">{cardAttributes.saturation || 100}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={cardAttributes.saturation || 100}
              onChange={(e) => updateAttribute('saturation', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>
      </ControlCard>

      {/* Quick Reset */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          updateAttribute('rotation', 0);
          updateAttribute('scaleX', 1);
          updateAttribute('scaleY', 1);
          updateAttribute('blur', 0);
          updateAttribute('brightness', 100);
          updateAttribute('contrast', 100);
          updateAttribute('saturation', 100);
        }}
        className="w-full p-3 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-400/30 rounded-xl text-white hover:from-red-500/30 hover:to-orange-500/30 transition-all duration-200"
      >
        Reset All Effects
      </motion.button>

      <style>{`
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
  );
};
