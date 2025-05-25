
import { useState, useCallback } from 'react';

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
  const [cardAttributes, setCardAttributes] = useState<CardAttributes>(initialCardAttributes);

  const updateAttribute = useCallback((key: string, value: any) => {
    setCardAttributes(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const updateShadow = useCallback((shadowType: string, key: string, value: any) => {
    setCardAttributes(prev => ({
      ...prev,
      [shadowType]: {
        ...prev[shadowType as keyof typeof prev] as any,
        [key]: value
      }
    }));
  }, []);

  return {
    cardAttributes,
    updateAttribute,
    updateShadow
  };
};
