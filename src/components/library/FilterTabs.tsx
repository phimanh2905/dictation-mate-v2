import React from 'react';

interface FilterTab {
  id: string;
  label: string;
  count: number;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeTabId: string;
  onTabChange: (id: string) => void;
}

export default function FilterTabs({ tabs, activeTabId, onTabChange }: FilterTabsProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100/50 rounded-2xl w-fit">
      {tabs.map((tab) => {
        const isActive = activeTabId === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              isActive 
                ? 'bg-white text-blue-600 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50'
            }`}
          >
            {tab.label}
            <span className={`px-1.5 py-0.5 rounded-md text-[10px] ${
              isActive ? 'bg-blue-50 text-blue-600' : 'bg-gray-200 text-gray-500'
            }`}>
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
