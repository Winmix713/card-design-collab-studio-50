
import { Palette, Layers, Box, Settings, Type, Sparkles } from 'lucide-react';

export const panelConfigs = {
  style: {
    title: 'Style Controls',
    icon: Palette,
    gradient: 'from-blue-500 to-purple-600'
  },
  gradient: {
    title: 'Gradient Builder',
    icon: Layers,
    gradient: 'from-pink-500 to-orange-500'
  },
  shadow: {
    title: '3D Shadow',
    icon: Box,
    gradient: 'from-green-500 to-teal-600'
  },
  presets: {
    title: 'Smart Presets',
    icon: Settings,
    gradient: 'from-purple-500 to-indigo-600'
  },
  typography: {
    title: 'Typography',
    icon: Type,
    gradient: 'from-emerald-500 to-cyan-600'
  },
  effects: {
    title: 'Advanced Effects',
    icon: Sparkles,
    gradient: 'from-rose-500 to-pink-600'
  }
} as const;

export type PanelType = keyof typeof panelConfigs;
