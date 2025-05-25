
import React from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

interface Shadow3DControllerProps {
  cardAttributes: any;
  updateShadow: (shadowType: string, key: string, value: any) => void;
}

export const Shadow3DController: React.FC<Shadow3DControllerProps> = ({
  cardAttributes,
  updateShadow
}) => {
  const shadowTypes = [
    { key: 'primaryShadow', label: 'Primary Shadow' },
    { key: 'secondaryShadow', label: 'Secondary Shadow' }
  ];

  return (
    <div className="space-y-8">
      {shadowTypes.map((shadowType) => {
        const shadow = cardAttributes[shadowType.key];
        return (
          <div key={shadowType.key} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">{shadowType.label}</h3>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => updateShadow(shadowType.key, 'enabled', !shadow.enabled)}
                className={`p-2 rounded-lg transition-colors ${
                  shadow.enabled ? 'bg-purple-500 text-white' : 'bg-white/10 text-white/60'
                }`}
              >
                {shadow.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </motion.button>
            </div>

            {shadow.enabled && (
              <div className="space-y-4">
                {/* 3D Position Control */}
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Shadow Position
                  </label>
                  <div className="relative w-32 h-32 mx-auto border border-white/20 rounded-lg">
                    <motion.div
                      className="absolute w-4 h-4 bg-purple-500 rounded-full cursor-pointer"
                      style={{
                        left: `${((shadow.x + 20) / 40) * 100}%`,
                        top: `${((shadow.y + 20) / 40) * 100}%`,
                        marginLeft: '-8px',
                        marginTop: '-8px'
                      }}
                      drag
                      dragConstraints={{ left: 0, right: 112, top: 0, bottom: 112 }}
                      onDrag={(_, info) => {
                        const rect = info.point;
                        const x = Math.round(((rect.x / 112) * 40) - 20);
                        const y = Math.round(((rect.y / 112) * 40) - 20);
                        updateShadow(shadowType.key, 'x', x);
                        updateShadow(shadowType.key, 'y', y);
                      }}
                      whileDrag={{ scale: 1.5 }}
                    />
                    <div className="absolute top-1/2 left-1/2 w-0.5 h-full bg-white/20 transform -translate-x-1/2" />
                    <div className="absolute top-1/2 left-1/2 w-full h-0.5 bg-white/20 transform -translate-y-1/2" />
                  </div>
                  <div className="text-xs text-white/60 text-center mt-2">
                    X: {shadow.x}px, Y: {shadow.y}px
                  </div>
                </div>

                {/* Blur & Spread */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Blur
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={shadow.blur}
                      onChange={(e) => updateShadow(shadowType.key, 'blur', parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                    <div className="text-xs text-white/60 mt-1">{shadow.blur}px</div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Spread
                    </label>
                    <input
                      type="range"
                      min="-20"
                      max="20"
                      value={shadow.spread}
                      onChange={(e) => updateShadow(shadowType.key, 'spread', parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                    <div className="text-xs text-white/60 mt-1">{shadow.spread}px</div>
                  </div>
                </div>

                {/* Color & Opacity */}
                <div className="flex items-center space-x-3">
                  <div
                    className="w-12 h-12 rounded-xl border border-white/20 cursor-pointer relative"
                    style={{ backgroundColor: shadow.color }}
                  >
                    <input
                      type="color"
                      value={shadow.color}
                      onChange={(e) => updateShadow(shadowType.key, 'color', e.target.value)}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={shadow.opacity}
                      onChange={(e) => updateShadow(shadowType.key, 'opacity', parseInt(e.target.value))}
                      className="w-full accent-purple-500"
                    />
                    <div className="text-xs text-white/60 mt-1">Opacity: {shadow.opacity}%</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
