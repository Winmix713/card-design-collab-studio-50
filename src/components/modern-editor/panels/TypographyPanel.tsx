
import React from 'react';
import { CardAttributes } from '../hooks/useCardAttributes';
import { TypographyControls } from '../TypographyControls';

interface TypographyPanelProps {
  cardAttributes: CardAttributes;
  updateAttribute: (key: string, value: any) => void;
}

export const TypographyPanel: React.FC<TypographyPanelProps> = ({ cardAttributes, updateAttribute }) => (
  <TypographyControls cardAttributes={cardAttributes} updateAttribute={updateAttribute} />
);
