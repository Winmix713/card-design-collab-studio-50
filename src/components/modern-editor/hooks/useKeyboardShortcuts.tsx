
import { useEffect } from 'react';

interface KeyboardShortcutsProps {
  undo?: () => void;
  redo?: () => void;
  canUndo?: boolean;
  canRedo?: boolean;
  onExport?: () => void;
  onTemplates?: () => void;
  onRandomize?: () => void;
}

export const useKeyboardShortcuts = ({
  undo,
  redo,
  canUndo = false,
  canRedo = false,
  onExport,
  onTemplates,
  onRandomize
}: KeyboardShortcutsProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      try {
        if (e.ctrlKey || e.metaKey) {
          switch (e.key) {
            case 'z':
              e.preventDefault();
              if (e.shiftKey) {
                if (canRedo && redo) redo();
              } else {
                if (canUndo && undo) undo();
              }
              break;
            case 'y':
              e.preventDefault();
              if (canRedo && redo) redo();
              break;
            case 's':
              e.preventDefault();
              if (onExport) onExport();
              break;
            case 't':
              e.preventDefault();
              if (onTemplates) onTemplates();
              break;
            case 'r':
              e.preventDefault();
              if (onRandomize) onRandomize();
              break;
          }
        }
      } catch (error) {
        console.warn('Error in keyboard shortcut handler:', error);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, canUndo, canRedo, onExport, onTemplates, onRandomize]);
};
