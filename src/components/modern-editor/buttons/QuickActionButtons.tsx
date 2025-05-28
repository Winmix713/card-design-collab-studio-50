
import React from 'react';
import { Palette, Layers2, Wand2, FileImage } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { FloatingButton } from './FloatingButton';

interface QuickActionButtonsProps {
  onTemplateGallery?: () => void;
  onRandomize?: () => void;
  onExport?: () => void;
  onColorPicker?: () => void;
}

export const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({
  onTemplateGallery,
  onRandomize,
  onExport,
  onColorPicker
}) => {
  const actions = [
    { 
      id: 'colorPicker', 
      icon: Palette, 
      label: 'Color Picker', 
      action: onColorPicker || (() => {}), 
      shortcut: 'Ctrl+P',
      className: 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-white/20 hover:from-pink-500/30 hover:to-purple-500/30'
    },
    { 
      id: 'templates', 
      icon: Layers2, 
      label: 'Templates', 
      action: onTemplateGallery || (() => {}), 
      shortcut: 'Ctrl+T',
      className: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-white/20 hover:from-blue-500/30 hover:to-cyan-500/30'
    },
    { 
      id: 'randomize', 
      icon: Wand2, 
      label: 'Randomize', 
      action: onRandomize || (() => {}), 
      shortcut: 'Ctrl+R',
      className: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-white/20 hover:from-green-500/30 hover:to-emerald-500/30'
    },
    { 
      id: 'export', 
      icon: FileImage, 
      label: 'Export', 
      action: onExport || (() => {}), 
      shortcut: 'Ctrl+S',
      className: 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-white/20 hover:from-orange-500/30 hover:to-red-500/30'
    }
  ];

  return (
    <div className="flex space-x-2">
      {actions.map((action) => (
        <Tooltip key={action.id}>
          <TooltipTrigger asChild>
            <FloatingButton
              icon={action.icon}
              onClick={action.action}
              className={action.className}
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{action.label} ({action.shortcut})</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
};
