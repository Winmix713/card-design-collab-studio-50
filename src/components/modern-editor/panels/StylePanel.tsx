
import React from 'react';
import { CardAttributes } from '../hooks/useCardAttributes';
import { StyleControls } from '../StyleControls';

interface StylePanelProps {
  cardAttributes: CardAttributes;
  updateAttribute: (key: string, value: any) => void;
}

export const StylePanel: React.FC<StylePanelProps> = ({ cardAttributes, updateAttribute }) => (
  <StyleControls cardAttributes={cardAttributes} updateAttribute={updateAttribute} />
);
