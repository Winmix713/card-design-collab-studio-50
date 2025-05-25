
import React from 'react';

interface PresetsPanelProps {
  presets: any[];
  applyPreset: (preset: any) => void;
}

export const PresetsPanel: React.FC<PresetsPanelProps> = ({ presets, applyPreset }) => {
  return (
    <div className="mt-6 bg-gray-800 rounded-xl shadow-lg border border-gray-700 p-6">
      <h3 className="text-lg font-semibold text-gray-100 mb-4">Quick Presets</h3>
      <div className="grid grid-cols-2 gap-3">
        {presets.map((preset, index) => (
          <button
            key={index}
            onClick={() => applyPreset(preset)}
            className="p-3 text-left border border-gray-600 rounded-lg hover:border-violet-400 hover:bg-violet-500/10 transition-colors"
          >
            <div className="font-medium text-gray-100">{preset.name}</div>
            <div className="text-xs text-gray-400 mt-1">
              {preset.attributes.backgroundType === 'gradient' ? 'Gradient' : 'Solid'} • {preset.attributes.borderRadius}px radius
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
