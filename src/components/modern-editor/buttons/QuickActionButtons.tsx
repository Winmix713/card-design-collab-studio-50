
import React from 'react';
import { Grid, Shuffle, Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { FloatingButton } from './FloatingButton';

interface QuickActionButtonsProps {
  onTemplateGallery?: () => void;
  onRandomize?: () => void;
  onExport?: () => void;
}

export const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({
  onTemplateGallery,
  onRandomize,
  onExport
}) => {
  const actions = [
    { id: 'templates', icon: Grid, label: 'Templates', action: onTemplateGallery, shortcut: 'Ctrl+T' },
    { id: 'randomize', icon: Shuffle, label: 'Randomize', action: onRandomize, shortcut: 'Ctrl+R' },
    { id: 'export', icon: Download, label: 'Export', action: onExport, shortcut: 'Ctrl+S' }
  ];

  return (
    <div className="flex space-x-2">
      {actions.map((action) => (
        <Tooltip key={action.id}>
          <TooltipTrigger asChild>
            <FloatingButton
              icon={action.icon}
              onClick={action.action || (() => {})}
              className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/20 hover:from-purple-500/30 hover:to-pink-500/30"
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
