
import React from 'react';
import { CardAttributes } from '../hooks/useCardAttributes';
import { SmartPresetGallery } from '../SmartPresetGallery';

interface PresetsPanelProps {
  cardAttributes: CardAttributes;
  updateAttribute: (key: string, value: any) => void;
}

export const PresetsPanel: React.FC<PresetsPanelProps> = ({ cardAttributes, updateAttribute }) => (
  <SmartPresetGallery cardAttributes={cardAttributes} updateAttribute={updateAttribute} />
);
