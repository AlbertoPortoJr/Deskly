'use client';

// import { useState } from 'react';

interface Tab {
  id: string;
  label: string;
  count: number;
  icon: string;
}

interface ReportTabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export default function ReportTabs({ tabs, activeTab, onTabChange }: ReportTabsProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6 overflow-x-auto pb-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
            activeTab === tab.id
              ? 'bg-primary text-primary-foreground shadow-md'
              : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
          }`}
        >
          <span className="mr-1 sm:mr-2">{tab.icon}</span>
          <span className="hidden sm:inline">{tab.label}</span>
          <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
          <span className="ml-1">({tab.count})</span>
        </button>
      ))}
    </div>
  );
}
