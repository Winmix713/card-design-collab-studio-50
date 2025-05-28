
import React from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  label?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value, onChange, label }) => (
  <div className="relative">
    <div
      className="w-16 h-16 rounded-2xl border-2 border-white/20 cursor-pointer relative overflow-hidden shadow-lg"
      style={{ backgroundColor: value }}
    >
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
    </div>
    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
      <Palette className="w-3 h-3 text-white" />
    </div>
    {label && <div className="text-xs text-white/70 mt-2 text-center">{label}</div>}
  </div>
);
