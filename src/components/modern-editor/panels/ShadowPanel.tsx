
import React from 'react';
import { CardAttributes } from '../hooks/useCardAttributes';
import { Shadow3DController } from '../Shadow3DController';

interface ShadowPanelProps {
  cardAttributes: CardAttributes;
  updateShadow: (shadowType: string, key: string, value: any) => void;
}

export const ShadowPanel: React.FC<ShadowPanelProps> = ({ cardAttributes, updateShadow }) => (
  <Shadow3DController cardAttributes={cardAttributes} updateShadow={updateShadow} />
);
