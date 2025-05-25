
import React from 'react';

interface BackgroundTabProps {
  cardAttributes: any;
  updateAttribute: (key: string, value: any) => void;
  showAdvanced: boolean;
}

export const BackgroundTab: React.FC<BackgroundTabProps> = ({ cardAttributes, updateAttribute, showAdvanced }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Background Type</label>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => updateAttribute('backgroundType', 'solid')}
            className={`p-3 rounded-lg border-2 transition-colors ${
              cardAttributes.backgroundType === 'solid'
                ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                : 'border-gray-600 hover:border-gray-500 text-gray-300'
            }`}
          >
            Solid
          </button>
          <button
            onClick={() => updateAttribute('backgroundType', 'gradient')}
            className={`p-3 rounded-lg border-2 transition-colors ${
              cardAttributes.backgroundType === 'gradient'
                ? 'border-violet-500 bg-violet-500/20 text-violet-300'
                : 'border-gray-600 hover:border-gray-500 text-gray-300'
            }`}
          >
            Gradient
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Primary Color</label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={cardAttributes.backgroundColor}
              onChange={(e) => updateAttribute('backgroundColor', e.target.value)}
              className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer bg-gray-700"
            />
            <input
              type="text"
              value={cardAttributes.backgroundColor}
              onChange={(e) => updateAttribute('backgroundColor', e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
            />
          </div>
          <div>
            <label className="block text-xs text-gray-400 mb-2">Opacity</label>
            <input
              type="range"
              min="0"
              max="100"
              value={cardAttributes.backgroundOpacity}
              onChange={(e) => updateAttribute('backgroundOpacity', parseInt(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span className="font-medium text-violet-400">{cardAttributes.backgroundOpacity}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {cardAttributes.backgroundType === 'gradient' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Secondary Color</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={cardAttributes.gradientColor}
                  onChange={(e) => updateAttribute('gradientColor', e.target.value)}
                  className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer bg-gray-700"
                />
                <input
                  type="text"
                  value={cardAttributes.gradientColor}
                  onChange={(e) => updateAttribute('gradientColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cardAttributes.gradientOpacity}
                  onChange={(e) => updateAttribute('gradientOpacity', parseInt(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span className="font-medium text-violet-400">{cardAttributes.gradientOpacity}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Gradient Direction</label>
            <input
              type="range"
              min="0"
              max="360"
              value={cardAttributes.gradientDirection}
              onChange={(e) => updateAttribute('gradientDirection', parseInt(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0°</span>
              <span className="font-medium text-violet-400">{cardAttributes.gradientDirection}°</span>
              <span>360°</span>
            </div>
          </div>
        </>
      )}

      {showAdvanced && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-300">Glassmorphism</label>
            <button
              onClick={() => updateAttribute('glassmorphism', !cardAttributes.glassmorphism)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                cardAttributes.glassmorphism ? 'bg-violet-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  cardAttributes.glassmorphism ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
          {cardAttributes.glassmorphism && (
            <div>
              <label className="block text-xs text-gray-400 mb-2">Backdrop Blur</label>
              <input
                type="range"
                min="0"
                max="30"
                value={cardAttributes.backdropBlur}
                onChange={(e) => updateAttribute('backdropBlur', parseInt(e.target.value))}
                className="w-full accent-violet-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0px</span>
                <span className="font-medium text-violet-400">{cardAttributes.backdropBlur}px</span>
                <span>30px</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
