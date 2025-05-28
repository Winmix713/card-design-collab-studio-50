
import React from 'react';
import { CardAttributes } from '../hooks/useCardAttributes';
import { AdvancedEffects } from '../AdvancedEffects';

interface EffectsPanelProps {
  cardAttributes: CardAttributes;
  updateAttribute: (key: string, value: any) => void;
}

export const EffectsPanel: React.FC<EffectsPanelProps> = ({ cardAttributes, updateAttribute }) => (
  <AdvancedEffects cardAttributes={cardAttributes} updateAttribute={updateAttribute} />
);
