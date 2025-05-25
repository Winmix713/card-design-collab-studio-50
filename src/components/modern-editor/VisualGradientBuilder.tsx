
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCw } from 'lucide-react';
import { CardAttributes } from './hooks/useCardAttributes';

interface VisualGradientBuilderProps {
  cardAttributes: CardAttributes;
  updateAttribute: (key: string, value: any) => void;
}

export const VisualGradientBuilder: React.FC<VisualGradientBuilderProps> = ({
  cardAttributes,
  updateAttribute
}) => {
  const [dragAngle, setDragAngle] = useState(cardAttributes.gradientDirection);

  const handleAngleChange = (angle: number) => {
    setDragAngle(angle);
    updateAttribute('gradientDirection', angle);
  };

  const presetGradients = [
    { colors: ['#667eea', '#764ba2'], angle: 135 },
    { colors: ['#f093fb', '#f5576c'], angle: 90 },
    { colors: ['#4facfe', '#00f2fe'], angle: 180 },
    { colors: ['#43e97b', '#38f9d7'], angle: 45 },
    { colors: ['#fa709a', '#fee140'], angle: 315 },
    { colors: ['#a8edea', '#fed6e3'], angle: 225 }
  ];

  return (
    <div className="space-y-6">
      {/* Gradient Preview */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-3">
          Gradient Preview
        </label>
        <div
          className="w-full h-20 rounded-xl border border-white/20"
          style={{
            background: `linear-gradient(${cardAttributes.gradientDirection}deg, ${cardAttributes.backgroundColor}, ${cardAttributes.gradientColor})`
          }}
        />
      </div>

      {/* Color Stops */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            Start Color
          </label>
          <div className="flex items-center space-x-2">
            <div
              className="w-10 h-10 rounded-lg border border-white/20 cursor-pointer relative"
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
              <div className="text-xs text-white/60">{cardAttributes.backgroundOpacity}%</div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 mb-2">
            End Color
          </label>
          <div className="flex items-center space-x-2">
            <div
              className="w-10 h-10 rounded-lg border border-white/20 cursor-pointer relative"
              style={{ backgroundColor: cardAttributes.gradientColor }}
            >
              <input
                type="color"
                value={cardAttributes.gradientColor}
                onChange={(e) => updateAttribute('gradientColor', e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
            <div className="flex-1">
              <input
                type="range"
                min="0"
                max="100"
                value={cardAttributes.gradientOpacity}
                onChange={(e) => updateAttribute('gradientOpacity', parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
              <div className="text-xs text-white/60">{cardAttributes.gradientOpacity}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Direction Control */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-3">
          Gradient Direction
        </label>
        <div className="flex items-center justify-center">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-2 border-white/20" />
            <motion.div
              className="absolute w-2 h-8 bg-purple-500 rounded-full origin-bottom"
              style={{
                left: '50%',
                bottom: '50%',
                marginLeft: '-4px',
                rotate: dragAngle
              }}
              drag
              dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
              onDrag={(_, info) => {
                const angle = Math.atan2(info.point.y - 48, info.point.x - 48) * (180 / Math.PI) + 90;
                handleAngleChange(Math.round(angle));
              }}
              whileDrag={{ scale: 1.2 }}
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <RotateCw className="w-4 h-4 text-white/40" />
            </div>
          </div>
        </div>
        <div className="text-center text-xs text-white/60 mt-2">
          {cardAttributes.gradientDirection}°
        </div>
      </div>

      {/* Preset Gradients */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-3">
          Preset Gradients
        </label>
        <div className="grid grid-cols-3 gap-2">
          {presetGradients.map((preset, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                updateAttribute('backgroundColor', preset.colors[0]);
                updateAttribute('gradientColor', preset.colors[1]);
                updateAttribute('gradientDirection', preset.angle);
                updateAttribute('backgroundType', 'gradient');
              }}
              className="h-12 rounded-lg border border-white/20 hover:border-purple-400 transition-colors"
              style={{
                background: `linear-gradient(${preset.angle}deg, ${preset.colors[0]}, ${preset.colors[1]})`
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
