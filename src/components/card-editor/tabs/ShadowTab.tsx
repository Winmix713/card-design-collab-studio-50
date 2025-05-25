
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface ShadowTabProps {
  cardAttributes: any;
  updateShadow: (shadowType: string, key: string, value: any) => void;
}

export const ShadowTab: React.FC<ShadowTabProps> = ({ cardAttributes, updateShadow }) => {
  return (
    <div className="space-y-6">
      {/* Primary Shadow */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-gray-300">Primary Shadow</label>
          <button
            onClick={() => updateShadow('primaryShadow', 'enabled', !cardAttributes.primaryShadow.enabled)}
            className={`p-1 rounded ${
              cardAttributes.primaryShadow.enabled 
                ? 'text-violet-400 bg-violet-500/20' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {cardAttributes.primaryShadow.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        
        {cardAttributes.primaryShadow.enabled && (
          <div className="space-y-4 pl-4 border-l-2 border-violet-500/30">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">X Offset</label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={cardAttributes.primaryShadow.x}
                  onChange={(e) => updateShadow('primaryShadow', 'x', parseInt(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="text-xs text-violet-400 text-center">{cardAttributes.primaryShadow.x}px</div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Y Offset</label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={cardAttributes.primaryShadow.y}
                  onChange={(e) => updateShadow('primaryShadow', 'y', parseInt(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="text-xs text-violet-400 text-center">{cardAttributes.primaryShadow.y}px</div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Blur</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cardAttributes.primaryShadow.blur}
                  onChange={(e) => updateShadow('primaryShadow', 'blur', parseInt(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="text-xs text-violet-400 text-center">{cardAttributes.primaryShadow.blur}px</div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Spread</label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={cardAttributes.primaryShadow.spread}
                  onChange={(e) => updateShadow('primaryShadow', 'spread', parseInt(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="text-xs text-violet-400 text-center">{cardAttributes.primaryShadow.spread}px</div>
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-2">Shadow Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={cardAttributes.primaryShadow.color}
                  onChange={(e) => updateShadow('primaryShadow', 'color', e.target.value)}
                  className="w-8 h-8 rounded border border-gray-600 cursor-pointer bg-gray-700"
                />
                <input
                  type="text"
                  value={cardAttributes.primaryShadow.color}
                  onChange={(e) => updateShadow('primaryShadow', 'color', e.target.value)}
                  className="flex-1 px-2 py-1 text-xs border border-gray-600 rounded focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-2">Opacity</label>
              <input
                type="range"
                min="0"
                max="100"
                value={cardAttributes.primaryShadow.opacity}
                onChange={(e) => updateShadow('primaryShadow', 'opacity', parseInt(e.target.value))}
                className="w-full accent-violet-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span className="font-medium text-violet-400">{cardAttributes.primaryShadow.opacity}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Secondary Shadow */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="text-sm font-medium text-gray-300">Secondary Shadow</label>
          <button
            onClick={() => updateShadow('secondaryShadow', 'enabled', !cardAttributes.secondaryShadow.enabled)}
            className={`p-1 rounded ${
              cardAttributes.secondaryShadow.enabled 
                ? 'text-violet-400 bg-violet-500/20' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {cardAttributes.secondaryShadow.enabled ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </button>
        </div>
        
        {cardAttributes.secondaryShadow.enabled && (
          <div className="space-y-4 pl-4 border-l-2 border-purple-500/30">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">X Offset</label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={cardAttributes.secondaryShadow.x}
                  onChange={(e) => updateShadow('secondaryShadow', 'x', parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="text-xs text-purple-400 text-center">{cardAttributes.secondaryShadow.x}px</div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Y Offset</label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={cardAttributes.secondaryShadow.y}
                  onChange={(e) => updateShadow('secondaryShadow', 'y', parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="text-xs text-purple-400 text-center">{cardAttributes.secondaryShadow.y}px</div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Blur</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cardAttributes.secondaryShadow.blur}
                  onChange={(e) => updateShadow('secondaryShadow', 'blur', parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="text-xs text-purple-400 text-center">{cardAttributes.secondaryShadow.blur}px</div>
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Spread</label>
                <input
                  type="range"
                  min="-50"
                  max="50"
                  value={cardAttributes.secondaryShadow.spread}
                  onChange={(e) => updateShadow('secondaryShadow', 'spread', parseInt(e.target.value))}
                  className="w-full accent-purple-500"
                />
                <div className="text-xs text-purple-400 text-center">{cardAttributes.secondaryShadow.spread}px</div>
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-2">Shadow Color</label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={cardAttributes.secondaryShadow.color}
                  onChange={(e) => updateShadow('secondaryShadow', 'color', e.target.value)}
                  className="w-8 h-8 rounded border border-gray-600 cursor-pointer bg-gray-700"
                />
                <input
                  type="text"
                  value={cardAttributes.secondaryShadow.color}
                  onChange={(e) => updateShadow('secondaryShadow', 'color', e.target.value)}
                  className="flex-1 px-2 py-1 text-xs border border-gray-600 rounded focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs text-gray-400 mb-2">Opacity</label>
              <input
                type="range"
                min="0"
                max="100"
                value={cardAttributes.secondaryShadow.opacity}
                onChange={(e) => updateShadow('secondaryShadow', 'opacity', parseInt(e.target.value))}
                className="w-full accent-purple-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0%</span>
                <span className="font-medium text-purple-400">{cardAttributes.secondaryShadow.opacity}%</span>
                <span>100%</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
