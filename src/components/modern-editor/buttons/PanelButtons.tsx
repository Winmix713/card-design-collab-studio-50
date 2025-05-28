
import React from 'react';
import { Palette, Layers, Box, Type, Sparkles, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

interface PanelButtonsProps {
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

export const PanelButtons: React.FC<PanelButtonsProps> = ({ activePanel, setActivePanel }) => {
  const panels = [
    { id: 'style', icon: Palette, label: 'Style' },
    { id: 'gradient', icon: Layers, label: 'Gradient' },
    { id: 'shadow', icon: Box, label: '3D Shadow' },
    { id: 'typography', icon: Type, label: 'Typography' },
    { id: 'effects', icon: Sparkles, label: 'Effects' },
    { id: 'presets', icon: Settings, label: 'Presets' }
  ];

  return (
    <div className="flex space-x-3 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20">
      {panels.map((panel) => (
        <Tooltip key={panel.id}>
          <TooltipTrigger asChild>
            <button
              onClick={() => setActivePanel(activePanel === panel.id ? '' : panel.id)}
              className={`p-3 rounded-xl transition-all duration-300 ${
                activePanel === panel.id
                  ? 'bg-white/30 border-2 border-purple-400 shadow-lg shadow-purple-500/25 text-white'
                  : 'bg-white/10 border border-white/20 hover:bg-white/20 text-white/80 hover:text-white'
              }`}
            >
              <panel.icon className="w-5 h-5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>{panel.label}</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
