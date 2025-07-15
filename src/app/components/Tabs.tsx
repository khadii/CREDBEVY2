"use client";
import { useState } from "react";

type Tab = {
  name: string;
  count?: number; // count can be undefined
};

type TabsProps = {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

export const Tabs = ({ tabs, activeTab, setActiveTab }: TabsProps) => {
  return (
    <div className="flex space-x-2 md:space-x-6 overflow-x-auto py-2">
      {tabs.map((tab) => (
        <button
          key={tab.name}
          className={`relative flex items-center justify-center gap-1 md:gap-2 whitespace-nowrap px-2 ${
            activeTab === tab.name
              ? "font-medium text-[12px] md:text-[14px] text-[#156064] border-b-2 border-[#156064] pb-[6px] md:pb-[10px]"
              : "text-[#8A8B9F] font-medium text-[12px] md:text-[14px]"
          }`}
          onClick={() => setActiveTab(tab.name)}
        >
          {tab.name}

          {typeof tab.count === 'number' && (
            <span className={`flex items-center justify-center px-2 py-1 text-xs font-bold rounded-full ${
              tab.count > 0 
                ? 'bg-[#42BE65] text-white' 
                : 'bg-[#E0E0E0] text-[#8A8B9F]'
            }`}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};