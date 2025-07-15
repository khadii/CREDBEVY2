"use client";

import { Tabs } from "@/app/components/Tabs";
import { useState } from "react";



interface Tab {
  name: string;
  count?: number;
}

interface HeaderWithTabsProps {
  title: string; // The header title
  tabs: Tab[]; // Array of tabs
//   years: string[]; // Array of years for the dropdown
  defaultActiveTab?: string; // Default active tab
  defaultSelectedYear?: string; // Default selected year
  onTabChange?: (tab: string) => void; // Callback for tab change
  onYearChange?: (year: string) => void; // Callback for year change
  activeTab:any
  setActiveTab:any
}

export const LoanRequestHeaderWithTabs = ({
  activeTab,
  title,
  tabs,
//   years,
  defaultActiveTab = tabs[0].name, // Default to the first tab
//   defaultSelectedYear = years[0], // Default to the first year
  onTabChange,
  onYearChange,
  setActiveTab
}: HeaderWithTabsProps) => {
 
//   const [selectedYear, setSelectedYear] = useState(defaultSelectedYear);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab); // Invoke callback if provided
  };

//   const handleYearChange = (year: string) => {
//     setSelectedYear(year);
//     if (onYearChange) onYearChange(year); // Invoke callback if provided
//   };

  return (
    <div className="bg-[#FAFAFA]">
      <h2 className="md:text-[34px]  text-2xl font-bold text-gray-900 pb-[32px]">{title}</h2>
      <div className="mt-8  items-center justify-between">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} />
      
      </div>
    </div>
  );
};