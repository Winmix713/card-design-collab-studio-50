
import React from 'react';

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (value: number) => void;
}

export const SliderControl: React.FC<SliderControlProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-xs text-white/70">{label}</span>
      <span className="text-xs text-purple-400 font-medium">{value}{unit}</span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
    />
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
