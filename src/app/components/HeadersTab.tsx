"use client";
import { useState } from "react";
import { Tabs } from "./Tabs";
import { YearDropdown } from "./Yeardropdown";


interface Tab {
  name: string;
  count?: number;
}

interface HeaderWithTabsProps {
  title: string; // The header title
  tabs: Tab[]; // Array of tabs
  years: string[]; // Array of years for the dropdown
  defaultActiveTab?: string; // Default active tab
  defaultSelectedYear?: string; // Default selected year
  onTabChange?: (tab: string) => void; // Callback for tab change
  onYearChange?: (year: string) => void; // Callback for year change
}

export const HeaderWithTabs = ({
  title,
  tabs,
  years,
  defaultActiveTab = tabs[0].name, // Default to the first tab
  defaultSelectedYear = years[0], // Default to the first year
  onTabChange,
  onYearChange,
}: HeaderWithTabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultActiveTab);
  const [selectedYear, setSelectedYear] = useState(defaultSelectedYear);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    if (onTabChange) onTabChange(tab); // Invoke callback if provided
  };

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    if (onYearChange) onYearChange(year); // Invoke callback if provided
  };

  return (
    <div className="bg-[#FAFAFA]">
      <h2 className="text-[34px] font-bold text-gray-900 pb-[32px]">{title}</h2>
      <div className="mt-8 space-y-6 items-center justify-between">
        <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={handleTabChange} />
        <YearDropdown
          years={years}
          selectedYear={selectedYear}
          setSelectedYear={handleYearChange}
        />
      </div>
    </div>
  );
};