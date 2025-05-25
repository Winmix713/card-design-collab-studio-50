
import React from 'react';
import { Link, Unlink } from 'lucide-react';

interface BorderTabProps {
  cardAttributes: any;
  updateAttribute: (key: string, value: any) => void;
  updateBorderRadius: (corner: string, value: number) => void;
  toggleBorderRadiusLink: () => void;
}

export const BorderTab: React.FC<BorderTabProps> = ({
  cardAttributes,
  updateAttribute,
  updateBorderRadius,
  toggleBorderRadiusLink
}) => {
  const hexToRgba = (hex: string, opacity: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-medium text-gray-300">Border Radius</label>
          <button
            onClick={toggleBorderRadiusLink}
            className={`p-1 rounded ${
              cardAttributes.borderRadiusLinked 
                ? 'text-violet-400 bg-violet-500/20' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
          >
            {cardAttributes.borderRadiusLinked ? <Link className="w-4 h-4" /> : <Unlink className="w-4 h-4" />}
          </button>
        </div>
        
        {cardAttributes.borderRadiusLinked ? (
          <div>
            <input
              type="range"
              min="0"
              max="50"
              value={cardAttributes.borderRadius}
              onChange={(e) => updateBorderRadius('borderRadius', parseInt(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0px</span>
              <span className="font-medium text-violet-400">{cardAttributes.borderRadius}px</span>
              <span>50px</span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {[
              { key: 'borderRadiusTopLeft', label: 'Top Left' },
              { key: 'borderRadiusTopRight', label: 'Top Right' },
              { key: 'borderRadiusBottomLeft', label: 'Bottom Left' },
              { key: 'borderRadiusBottomRight', label: 'Bottom Right' }
            ].map(corner => (
              <div key={corner.key}>
                <label className="block text-xs text-gray-400 mb-1">{corner.label}</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={cardAttributes[corner.key]}
                  onChange={(e) => updateBorderRadius(corner.key, parseInt(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="text-xs text-violet-400 text-center mt-1">
                  {cardAttributes[corner.key]}px
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">Border Width</label>
        <input
          type="range"
          min="0"
          max="10"
          value={cardAttributes.borderWidth}
          onChange={(e) => updateAttribute('borderWidth', parseInt(e.target.value))}
          className="w-full accent-violet-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0px</span>
          <span className="font-medium text-violet-400">{cardAttributes.borderWidth}px</span>
          <span>10px</span>
        </div>
      </div>

      {cardAttributes.borderWidth > 0 && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Border Style</label>
            <select
              value={cardAttributes.borderStyle}
              onChange={(e) => updateAttribute('borderStyle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
            >
              <option value="solid">Solid</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">Border Color</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={cardAttributes.borderColor}
                  onChange={(e) => updateAttribute('borderColor', e.target.value)}
                  className="w-12 h-12 rounded-lg border border-gray-600 cursor-pointer bg-gray-700"
                />
                <input
                  type="text"
                  value={cardAttributes.borderColor}
                  onChange={(e) => updateAttribute('borderColor', e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-600 rounded-lg focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-gray-100"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-2">Opacity</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={cardAttributes.borderOpacity}
                  onChange={(e) => updateAttribute('borderOpacity', parseInt(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>0%</span>
                  <span className="font-medium text-violet-400">{cardAttributes.borderOpacity}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
