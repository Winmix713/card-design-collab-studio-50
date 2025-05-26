
import { useState, useCallback, useRef, useMemo } from 'react';
import { CardAttributes } from './useCardAttributes';

interface HistoryState {
  past: HistoryEntry[];
  present: CardAttributes;
  future: HistoryEntry[];
}

interface HistoryEntry {
  state: CardAttributes;
  timestamp: number;
  actionType?: string;
}

const MAX_HISTORY_SIZE = 50;

// Shallow equality check for better performance
const shallowEqual = (obj1: any, obj2: any): boolean => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  
  if (keys1.length !== keys2.length) {
    return false;
  }
  
  for (let key of keys1) {
    if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
      if (!shallowEqual(obj1[key], obj2[key])) {
        return false;
      }
    } else if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  
  return true;
};

export const useCardHistory = (initialState: CardAttributes) => {
  const [history, setHistory] = useState<HistoryState>({
    past: [],
    present: initialState,
    future: []
  });

  const isUpdatingRef = useRef(false);
  const lastActionRef = useRef<string>('');

  const pushToHistory = useCallback((newState: CardAttributes, actionType?: string) => {
    if (isUpdatingRef.current) return;

    setHistory(prev => {
      // Don't add to history if state hasn't changed (using shallow equality)
      if (shallowEqual(prev.present, newState)) {
        return prev;
      }

      const newEntry: HistoryEntry = {
        state: prev.present,
        timestamp: Date.now(),
        actionType: lastActionRef.current || actionType
      };

      const newPast = [...prev.past, newEntry];
      
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

    // Reset action type after use
    lastActionRef.current = '';
  }, []);

  const batchUpdate = useCallback((updates: Partial<CardAttributes>, actionType: string = 'batch') => {
    lastActionRef.current = actionType;
    const newState = { ...history.present, ...updates };
    pushToHistory(newState, actionType);
  }, [history.present, pushToHistory]);

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
        present: previous.state,
        future: [{
          state: prev.present,
          timestamp: Date.now(),
          actionType: 'redo_available'
        }, ...prev.future]
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
        past: [...prev.past, {
          state: prev.present,
          timestamp: Date.now(),
          actionType: 'undo_available'
        }],
        present: next.state,
        future: newFuture
      };
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory(prev => ({
      past: [],
      present: prev.present,
      future: []
    }));
  }, []);

  const canUndo = useMemo(() => history.past.length > 0, [history.past.length]);
  const canRedo = useMemo(() => history.future.length > 0, [history.future.length]);
  
  const historySize = useMemo(() => ({
    past: history.past.length,
    future: history.future.length,
    total: history.past.length + history.future.length + 1
  }), [history.past.length, history.future.length]);

  return {
    state: history.present,
    pushToHistory,
    batchUpdate,
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
    historySize,
    lastAction: history.past[history.past.length - 1]?.actionType || null
  };
};
