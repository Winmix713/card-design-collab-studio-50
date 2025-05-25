
import React from 'react';

interface SizeTabProps {
  cardAttributes: any;
  updateAttribute: (key: string, value: any) => void;
  showAdvanced: boolean;
}

export const SizeTab: React.FC<SizeTabProps> = ({ cardAttributes, updateAttribute, showAdvanced }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Width</label>
        <input
          type="range"
          min="200"
          max="500"
          value={cardAttributes.width}
          onChange={(e) => updateAttribute('width', parseInt(e.target.value))}
          className="w-full accent-violet-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>200px</span>
          <span className="font-medium text-violet-400">{cardAttributes.width}px</span>
          <span>500px</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Height</label>
        <input
          type="range"
          min="150"
          max="400"
          value={cardAttributes.height}
          onChange={(e) => updateAttribute('height', parseInt(e.target.value))}
          className="w-full accent-violet-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>150px</span>
          <span className="font-medium text-violet-400">{cardAttributes.height}px</span>
          <span>400px</span>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Padding</label>
        <input
          type="range"
          min="8"
          max="48"
          value={cardAttributes.padding}
          onChange={(e) => updateAttribute('padding', parseInt(e.target.value))}
          className="w-full accent-violet-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>8px</span>
          <span className="font-medium text-violet-400">{cardAttributes.padding}px</span>
          <span>48px</span>
        </div>
      </div>

      {showAdvanced && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Text Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={cardAttributes.textColor}
                onChange={(e) => updateAttribute('textColor', e.target.value)}
                className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer bg-gray-700"
              />
              <input
                type="text"
                value={cardAttributes.textColor}
                onChange={(e) => updateAttribute('textColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Global Opacity</label>
            <input
              type="range"
              min="0"
              max="100"
              value={cardAttributes.globalOpacity}
              onChange={(e) => updateAttribute('globalOpacity', parseInt(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0%</span>
              <span className="font-medium text-violet-400">{cardAttributes.globalOpacity}%</span>
              <span>100%</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
