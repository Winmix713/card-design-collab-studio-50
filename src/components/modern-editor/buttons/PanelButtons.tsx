
import React from 'react';
import { Palette, Layers, Box, Type, Sparkles, Settings } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';

interface PanelButtonsProps {
  activePanel: string;
  setActivePanel: (panel: string) => void;
}

export const PanelButtons: React.FC<PanelButtonsProps> = ({ activePanel, setActivePanel }) => {
  const panels = [
    { id: 'style', icon: Palette, label: 'Style', position: { top: '10%', left: '2%' } },
    { id: 'gradient', icon: Layers, label: 'Gradient', position: { top: '22%', left: '2%' } },
    { id: 'shadow', icon: Box, label: '3D Shadow', position: { top: '34%', left: '2%' } },
    { id: 'typography', icon: Type, label: 'Typography', position: { top: '46%', left: '2%' } },
    { id: 'effects', icon: Sparkles, label: 'Effects', position: { top: '58%', left: '2%' } },
    { id: 'presets', icon: Settings, label: 'Presets', position: { top: '70%', left: '2%' } }
  ];

  return (
    <>
      {panels.map((panel) => (
        <div
          key={panel.id}
          className="fixed z-20"
          style={panel.position}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => setActivePanel(activePanel === panel.id ? '' : panel.id)}
                className={`p-4 rounded-2xl backdrop-blur-md transition-all duration-300 ${
                  activePanel === panel.id
                    ? 'bg-white/20 border-2 border-purple-400 shadow-lg shadow-purple-500/25'
                    : 'bg-white/10 border border-white/20 hover:bg-white/15'
                }`}
              >
                <panel.icon className="w-6 h-6 text-white" />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{panel.label}</p>
              <p className="text-xs text-gray-400">
                Click to {activePanel === panel.id ? 'close' : 'open'} panel
              </p>
            </TooltipContent>
          </Tooltip>
          <div className="text-xs text-white/70 text-center mt-2">{panel.label}</div>
        </div>
      ))}
    </>
  );
};
