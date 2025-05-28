
import React from 'react';
import { motion } from 'framer-motion';
import { Type, AlignLeft, AlignCenter, AlignRight, AlignJustify } from 'lucide-react';
import { CardAttributes } from './hooks/useCardAttributes';

interface TypographyControlsProps {
  cardAttributes: CardAttributes;
  updateAttribute: (key: keyof CardAttributes, value: any) => void;
}

const fontFamilies = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Source Sans Pro',
  'Raleway', 'Poppins', 'Nunito', 'Playfair Display', 'Merriweather', 'Georgia'
];

const fontWeights = [
  { value: '300', label: 'Light' },
  { value: '400', label: 'Regular' },
  { value: '500', label: 'Medium' },
  { value: '600', label: 'Semi Bold' },
  { value: '700', label: 'Bold' },
  { value: '800', label: 'Extra Bold' }
];

const alignments = [
  { value: 'left', icon: AlignLeft, label: 'Left' },
  { value: 'center', icon: AlignCenter, label: 'Center' },
  { value: 'right', icon: AlignRight, label: 'Right' },
  { value: 'justify', icon: AlignJustify, label: 'Justify' }
];

export const TypographyControls: React.FC<TypographyControlsProps> = ({
  cardAttributes,
  updateAttribute
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        <Type className="w-5 h-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-white">Typography</h3>
      </div>

      {/* Title Typography */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-5"
      >
        <h4 className="text-sm font-semibold text-white/90 mb-4">Title Settings</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-white/70 mb-2">Font Family</label>
            <select
              value={cardAttributes.titleFont || 'Inter'}
              onChange={(e) => updateAttribute('titleFont', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font} className="bg-gray-800">
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-2">Font Weight</label>
            <select
              value={cardAttributes.titleWeight || '600'}
              onChange={(e) => updateAttribute('titleWeight', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value} className="bg-gray-800">
                  {weight.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-white/70 mb-2">Font Size</label>
            <input
              type="range"
              min="12"
              max="48"
              value={cardAttributes.titleSize || 18}
              onChange={(e) => updateAttribute('titleSize', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-purple-400 mt-1">{cardAttributes.titleSize || 18}px</div>
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-2">Text Alignment</label>
            <div className="grid grid-cols-4 gap-1">
              {alignments.map((align) => (
                <button
                  key={align.value}
                  onClick={() => updateAttribute('titleAlign', align.value)}
                  className={`p-2 rounded-lg transition-all ${
                    cardAttributes.titleAlign === align.value
                      ? 'bg-purple-500/30 text-purple-300'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <align.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Description Typography */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-5"
      >
        <h4 className="text-sm font-semibold text-white/90 mb-4">Description Settings</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-xs text-white/70 mb-2">Font Family</label>
            <select
              value={cardAttributes.descriptionFont || 'Inter'}
              onChange={(e) => updateAttribute('descriptionFont', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {fontFamilies.map((font) => (
                <option key={font} value={font} className="bg-gray-800">
                  {font}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-2">Font Weight</label>
            <select
              value={cardAttributes.descriptionWeight || '400'}
              onChange={(e) => updateAttribute('descriptionWeight', e.target.value)}
              className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {fontWeights.map((weight) => (
                <option key={weight.value} value={weight.value} className="bg-gray-800">
                  {weight.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-white/70 mb-2">Font Size</label>
            <input
              type="range"
              min="10"
              max="24"
              value={cardAttributes.descriptionSize || 14}
              onChange={(e) => updateAttribute('descriptionSize', parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-xs text-purple-400 mt-1">{cardAttributes.descriptionSize || 14}px</div>
          </div>

          <div>
            <label className="block text-xs text-white/70 mb-2">Text Alignment</label>
            <div className="grid grid-cols-4 gap-1">
              {alignments.map((align) => (
                <button
                  key={align.value}
                  onClick={() => updateAttribute('descriptionAlign', align.value)}
                  className={`p-2 rounded-lg transition-all ${
                    cardAttributes.descriptionAlign === align.value
                      ? 'bg-purple-500/30 text-purple-300'
                      : 'bg-white/10 text-white/60 hover:bg-white/20'
                  }`}
                >
                  <align.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

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
