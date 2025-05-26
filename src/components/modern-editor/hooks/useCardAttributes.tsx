import { useState, useCallback, useEffect, useMemo } from 'react';
import { useCardHistory } from './useCardHistory';
import { useDebounce } from '../../../hooks/useDebounce';

export interface CardAttributes {
  backgroundColor: string;
  backgroundOpacity: number;
  backgroundType: string;
  gradientColor: string;
  gradientOpacity: number;
  gradientDirection: number;
  glassmorphism: boolean;
  backdropBlur: number;
  borderRadius: number;
  borderRadiusLinked: boolean;
  borderRadiusTopLeft: number;
  borderRadiusTopRight: number;
  borderRadiusBottomLeft: number;
  borderRadiusBottomRight: number;
  borderWidth: number;
  borderColor: string;
  borderOpacity: number;
  borderStyle: string;
  primaryShadow: {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
    enabled: boolean;
  };
  secondaryShadow: {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: string;
    opacity: number;
    enabled: boolean;
  };
  width: number;
  height: number;
  padding: number;
  textColor: string;
  globalOpacity: number;
}

const initialCardAttributes: CardAttributes = {
  backgroundColor: '#6366f1',
  backgroundOpacity: 100,
  backgroundType: 'solid',
  gradientColor: '#8b5cf6',
  gradientOpacity: 100,
  gradientDirection: 135,
  glassmorphism: false,
  backdropBlur: 10,
  borderRadius: 12,
  borderRadiusLinked: true,
  borderRadiusTopLeft: 12,
  borderRadiusTopRight: 12,
  borderRadiusBottomLeft: 12,
  borderRadiusBottomRight: 12,
  borderWidth: 0,
  borderColor: '#e5e7eb',
  borderOpacity: 100,
  borderStyle: 'solid',
  primaryShadow: {
    x: 0,
    y: 10,
    blur: 20,
    spread: 0,
    color: '#000000',
    opacity: 25,
    enabled: true
  },
  secondaryShadow: {
    x: 0,
    y: 4,
    blur: 6,
    spread: -1,
    color: '#000000',
    opacity: 10,
    enabled: false
  },
  width: 300,
  height: 200,
  padding: 24,
  textColor: '#ffffff',
  globalOpacity: 100
};

export const useCardAttributes = () => {
  const {
    state: cardAttributes,
    pushToHistory,
    batchUpdate,
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
    historySize,
    lastAction
  } = useCardHistory(initialCardAttributes);

  const [tempAttributes, setTempAttributes] = useState<CardAttributes>(cardAttributes);
  
  // Debounce the temp attributes for history saving
  const debouncedAttributes = useDebounce(tempAttributes, 300);

  // Sync temp attributes with history state
  useEffect(() => {
    setTempAttributes(cardAttributes);
  }, [cardAttributes]);

  // Save to history when debounced attributes change
  useEffect(() => {
    if (debouncedAttributes !== cardAttributes) {
      pushToHistory(debouncedAttributes);
    }
  }, [debouncedAttributes, cardAttributes, pushToHistory]);

  const updateAttribute = useCallback((key: string, value: any) => {
    const newAttributes = {
      ...tempAttributes,
      [key]: value
    };
    setTempAttributes(newAttributes);
  }, [tempAttributes]);

  const updateShadow = useCallback((shadowType: string, key: string, value: any) => {
    const newAttributes = {
      ...tempAttributes,
      [shadowType]: {
        ...tempAttributes[shadowType as keyof typeof tempAttributes] as any,
        [key]: value
      }
    };
    setTempAttributes(newAttributes);
  }, [tempAttributes]);

  const applyPreset = useCallback((presetAttributes: Partial<CardAttributes>, presetName: string) => {
    const newAttributes = { ...tempAttributes, ...presetAttributes };
    setTempAttributes(newAttributes);
    batchUpdate(presetAttributes, `apply_preset_${presetName}`);
  }, [tempAttributes, batchUpdate]);

  const resetToDefault = useCallback(() => {
    setTempAttributes(initialCardAttributes);
    batchUpdate(initialCardAttributes, 'reset_to_default');
  }, [batchUpdate]);

  // Memoized derived values for performance
  const cardStyle = useMemo(() => {
    return {
      width: `${tempAttributes.width}px`,
      height: `${tempAttributes.height}px`,
      background: tempAttributes.backgroundType === 'gradient' 
        ? `linear-gradient(${tempAttributes.gradientDirection}deg, ${tempAttributes.backgroundColor}, ${tempAttributes.gradientColor})`
        : tempAttributes.backgroundColor,
      borderRadius: tempAttributes.borderRadiusLinked 
        ? `${tempAttributes.borderRadius}px`
        : `${tempAttributes.borderRadiusTopLeft}px ${tempAttributes.borderRadiusTopRight}px ${tempAttributes.borderRadiusBottomRight}px ${tempAttributes.borderRadiusBottomLeft}px`,
      // Add other style calculations here
    };
  }, [tempAttributes]);

  return {
    cardAttributes: tempAttributes,
    updateAttribute,
    updateShadow,
    applyPreset,
    resetToDefault,
    undo,
    redo,
    clearHistory,
    canUndo,
    canRedo,
    historySize,
    lastAction,
    cardStyle
  };
};
