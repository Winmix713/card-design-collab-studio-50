
import React from 'react';
import { Grid3x3, Box, Calendar, Trophy } from 'lucide-react';

interface TabNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'background', label: 'Background', icon: Grid3x3 },
    { id: 'border', label: 'Border', icon: Box },
    { id: 'shadow', label: 'Shadow', icon: Calendar },
    { id: 'size', label: 'Size', icon: Trophy }
  ];

  return (
    <div className="border-b border-gray-700">
      <nav className="flex">
        {tabs.map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-violet-500 text-violet-400 bg-violet-500/10'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-gray-700/50'
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
