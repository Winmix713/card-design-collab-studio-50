
import React from 'react';
import { Undo, Redo, RotateCcw } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../ui/tooltip';
import { FloatingButton } from './FloatingButton';

interface HistoryButtonsProps {
  undo?: () => void;
  redo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  clearHistory?: () => void;
  historySize?: { past: number; future: number; total: number };
  lastAction?: string | null;
}

export const HistoryButtons: React.FC<HistoryButtonsProps> = ({
  undo,
  redo,
  canUndo = false,
  canRedo = false,
  clearHistory,
  historySize,
  lastAction
}) => (
  <div className="flex flex-col space-y-2">
    <div className="flex space-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <FloatingButton
            icon={Undo}
            onClick={undo || (() => {})}
            disabled={!canUndo}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Undo (Ctrl+Z)</p>
          {historySize && <p className="text-xs text-gray-400">
            {historySize.past} steps available
          </p>}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <FloatingButton
            icon={Redo}
            onClick={redo || (() => {})}
            disabled={!canRedo}
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>Redo (Ctrl+Y)</p>
          {historySize && <p className="text-xs text-gray-400">
            {historySize.future} steps available
          </p>}
        </TooltipContent>
      </Tooltip>

      {clearHistory && (
        <Tooltip>
          <TooltipTrigger asChild>
            <FloatingButton
              icon={RotateCcw}
              onClick={clearHistory}
              className="hover:bg-red-500/20"
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>Clear History</p>
            <p className="text-xs text-gray-400">Reset all changes</p>
          </TooltipContent>
        </Tooltip>
      )}
    </div>

    {/* History info indicator */}
    {historySize && historySize.total > 1 && (
      <div className="text-xs text-white/60 text-center bg-white/5 rounded-lg px-2 py-1">
        {historySize.total}/50 steps
        {lastAction && (
          <div className="text-white/40 truncate">
            {lastAction.replace(/_/g, ' ')}
          </div>
        )}
      </div>
    )}
  </div>
);
