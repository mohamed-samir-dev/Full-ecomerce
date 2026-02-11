import { Tab } from '../types/product.types';

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: number;
  isDarkMode: boolean;
  onTabChange: (tabId: number) => void;
}

export default function TabNavigation({ tabs, activeTab, isDarkMode, onTabChange }: TabNavigationProps) {
  return (
    <div className="flex overflow-x-auto border-b border-gray-700 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base font-medium transition-all whitespace-nowrap ${
            activeTab === tab.id
              ? isDarkMode
                ? 'border-b-2 border-blue-500 text-blue-400 bg-gray-700/50'
                : 'border-b-2 border-blue-600 text-blue-600 bg-blue-50'
              : isDarkMode
              ? 'text-gray-400 hover:text-gray-300 hover:bg-gray-700/30'
              : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
          }`}
        >
          <span className="text-lg sm:text-xl">{tab.icon}</span>
          <span className="hidden sm:inline">{tab.name}</span>
        </button>
      ))}
    </div>
  );
}
