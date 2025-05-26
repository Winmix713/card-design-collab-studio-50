
import { useState, useCallback, useRef } from 'react';
import { CardAttributes } from './useCardAttributes';

interface HistoryState {
  past: CardAttributes[];
  present: CardAttributes;
  future: CardAttributes[];
}

const MAX_HISTORY_SIZE = 20;

export const useCardHistory = (initialState: CardAttributes) => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialState,
    future: []
  });

  const isUpdatingRef = useRef(false);

  const pushToHistory = useCallback((newState: CardAttributes) => {
    if (isUpdatingRef.current) return;

    setHistory(prev => {
      // Don't add to history if state hasn't changed
      if (JSON.stringify(prev.present) === JSON.stringify(newState)) {
        return prev;
      }

      const newPast = [...prev.past, prev.present];
      
      // Limit history size
      if (newPast.length > MAX_HISTORY_SIZE) {
        newPast.shift();
      }

      return {
        past: newPast,
        present: newState,
        future: []
      };
    });
  }, []);

  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.past.length === 0) return prev;

      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, prev.past.length - 1);

      isUpdatingRef.current = true;
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);

      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future]
      };
    });
  }, []);

  const redo = useCallback(() => {
    setHistory(prev => {
      if (prev.future.length === 0) return prev;

      const next = prev.future[0];
      const newFuture = prev.future.slice(1);

      isUpdatingRef.current = true;
      setTimeout(() => {
        isUpdatingRef.current = false;
      }, 0);

      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture
      };
    });
  }, []);

  const canUndo = history.past.length > 0;
  const canRedo = history.future.length > 0;

  return {
    state: history.present,
    pushToHistory,
    undo,
    redo,
    canUndo,
    canRedo
  };
};
