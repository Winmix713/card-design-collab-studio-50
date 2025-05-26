
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Zap, Waves, Grid, Shuffle } from 'lucide-react';
import { CardAttributes } from './hooks/useCardAttributes';
import { generateRandomCard } from './utils/cardUtils';

interface SmartPresetGalleryProps {
  cardAttributes: CardAttributes;
  updateAttribute: (key: string, value: any) => void;
}

export const SmartPresetGallery: React.FC<SmartPresetGalleryProps> = ({
  cardAttributes,
  updateAttribute
}) => {
  const presets = [
    {
      name: 'Glassmorphism',
      icon: Sparkles,
      category: 'modern',
      attributes: {
        backgroundColor: '#ffffff',
        backgroundOpacity: 10,
        glassmorphism: true,
        backdropBlur: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#ffffff',
        borderOpacity: 20,
        primaryShadow: { ...cardAttributes.primaryShadow, blur: 40, opacity: 10 }
      }
    },
    {
      name: 'Neon Glow',
      icon: Zap,
      category: 'vibrant',
      attributes: {
        backgroundColor: '#0f172a',
        backgroundOpacity: 100,
        borderWidth: 2,
        borderColor: '#8b5cf6',
        borderOpacity: 100,
        borderRadius: 16,
        primaryShadow: { ...cardAttributes.primaryShadow, blur: 30, color: '#8b5cf6', opacity: 80 }
      }
    },
    {
      name: 'Gradient Dream',
      icon: Waves,
      category: 'gradient',
      attributes: {
        backgroundColor: '#667eea',
        backgroundType: 'gradient',
        gradientColor: '#764ba2',
        gradientDirection: 135,
        borderRadius: 24,
        primaryShadow: { ...cardAttributes.primaryShadow, blur: 50, opacity: 20 }
      }
    },
    {
      name: 'Minimal Clean',
      icon: Heart,
      category: 'minimal',
      attributes: {
        backgroundColor: '#ffffff',
        backgroundOpacity: 100,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderOpacity: 100,
        borderRadius: 8,
        primaryShadow: { ...cardAttributes.primaryShadow, blur: 10, opacity: 5 }
      }
    }
  ];

  const applyPreset = (preset: any) => {
    Object.keys(preset.attributes).forEach(key => {
      updateAttribute(key, preset.attributes[key]);
    });
  };

  const handleRandomize = () => {
    const randomData = generateRandomCard();
    Object.keys(randomData).forEach(key => {
      updateAttribute(key, randomData[key as keyof typeof randomData]);
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Smart Presets</h3>
        <div className="grid grid-cols-1 gap-4">
          {presets.map((preset, index) => {
            const Icon = preset.icon;
            return (
              <motion.div
                key={preset.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => applyPreset(preset)}
                className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400 cursor-pointer transition-all group"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
                    <Icon className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{preset.name}</div>
                    <div className="text-xs text-white/60 capitalize">{preset.category}</div>
                  </div>
                </div>
                
                {/* Preview */}
                <div className="mt-3">
                  <div 
                    className="w-full h-16 rounded-lg border border-white/10"
                    style={{
                      background: preset.attributes.backgroundType === 'gradient' 
                        ? `linear-gradient(${preset.attributes.gradientDirection || 135}deg, ${preset.attributes.backgroundColor}, ${preset.attributes.gradientColor})`
                        : preset.attributes.backgroundColor,
                      opacity: (preset.attributes.backgroundOpacity || 100) / 100,
                      backdropFilter: preset.attributes.glassmorphism ? `blur(${preset.attributes.backdropBlur}px)` : 'none',
                      borderRadius: `${preset.attributes.borderRadius}px`,
                      boxShadow: preset.attributes.primaryShadow ? 
                        `0 10px ${preset.attributes.primaryShadow.blur}px rgba(139, 92, 246, ${preset.attributes.primaryShadow.opacity / 100})` : 
                        'none'
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-white/10 pt-4">
        <h4 className="text-sm font-medium text-white/80 mb-3">Quick Actions</h4>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleRandomize}
            className="flex-1 p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 hover:border-purple-400 text-white flex items-center justify-center space-x-2 transition-all"
          >
            <Shuffle className="w-4 h-4" />
            <span className="text-sm">Randomize</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};
