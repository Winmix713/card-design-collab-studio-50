
import React from 'react';
import { TabNavigation } from './TabNavigation';
import { TabContent } from './TabContent';
import { PresetsPanel } from './PresetsPanel';

interface ControlsPanelProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cardAttributes: any;
  updateAttribute: (key: string, value: any) => void;
  updateShadow: (shadowType: string, key: string, value: any) => void;
  updateBorderRadius: (corner: string, value: number) => void;
  toggleBorderRadiusLink: () => void;
  showAdvanced: boolean;
  presets: any[];
  applyPreset: (preset: any) => void;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({
  activeTab,
  setActiveTab,
  cardAttributes,
  updateAttribute,
  updateShadow,
  updateBorderRadius,
  toggleBorderRadiusLink,
  showAdvanced,
  presets,
  applyPreset
}) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-800 rounded-xl shadow-lg border border-gray-700 overflow-hidden">
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <TabContent
          activeTab={activeTab}
          cardAttributes={cardAttributes}
          updateAttribute={updateAttribute}
          updateShadow={updateShadow}
          updateBorderRadius={updateBorderRadius}
          toggleBorderRadiusLink={toggleBorderRadiusLink}
          showAdvanced={showAdvanced}
        />
      </div>
      
      <PresetsPanel presets={presets} applyPreset={applyPreset} />
    </div>
  );
};
