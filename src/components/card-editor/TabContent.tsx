
import React from 'react';
import { BackgroundTab } from './tabs/BackgroundTab';
import { BorderTab } from './tabs/BorderTab';
import { ShadowTab } from './tabs/ShadowTab';
import { SizeTab } from './tabs/SizeTab';

interface TabContentProps {
  activeTab: string;
  cardAttributes: any;
  updateAttribute: (key: string, value: any) => void;
  updateShadow: (shadowType: string, key: string, value: any) => void;
  updateBorderRadius: (corner: string, value: number) => void;
  toggleBorderRadiusLink: () => void;
  showAdvanced: boolean;
}

export const TabContent: React.FC<TabContentProps> = ({
  activeTab,
  cardAttributes,
  updateAttribute,
  updateShadow,
  updateBorderRadius,
  toggleBorderRadiusLink,
  showAdvanced
}) => {
  return (
    <div className="p-6">
      {activeTab === 'background' && (
        <BackgroundTab
          cardAttributes={cardAttributes}
          updateAttribute={updateAttribute}
          showAdvanced={showAdvanced}
        />
      )}
      
      {activeTab === 'border' && (
        <BorderTab
          cardAttributes={cardAttributes}
          updateAttribute={updateAttribute}
          updateBorderRadius={updateBorderRadius}
          toggleBorderRadiusLink={toggleBorderRadiusLink}
        />
      )}
      
      {activeTab === 'shadow' && (
        <ShadowTab
          cardAttributes={cardAttributes}
          updateShadow={updateShadow}
        />
      )}
      
      {activeTab === 'size' && (
        <SizeTab
          cardAttributes={cardAttributes}
          updateAttribute={updateAttribute}
          showAdvanced={showAdvanced}
        />
      )}
    </div>
  );
};
