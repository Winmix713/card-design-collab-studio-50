
import React from 'react';
import { CardAttributes } from '../hooks/useCardAttributes';
import { VisualGradientBuilder } from '../VisualGradientBuilder';

interface GradientPanelProps {
  cardAttributes: CardAttributes;
  updateAttribute: (key: string, value: any) => void;
}

export const GradientPanel: React.FC<GradientPanelProps> = ({ cardAttributes, updateAttribute }) => (
  <VisualGradientBuilder cardAttributes={cardAttributes} updateAttribute={updateAttribute} />
);
