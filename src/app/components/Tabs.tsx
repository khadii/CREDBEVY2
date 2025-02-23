"use client";
import { useState } from "react";

export const Tabs = ({ tabs, activeTab, setActiveTab }:{ tabs:any, activeTab:any, setActiveTab:any }) => {
  return (
    <div className="flex space-x-6">
      {tabs.map((tab:any) => (
        <button
          key={tab.name}
          className={`relative flex items-center justify-center  gap-2 ${
            activeTab === tab.name
              ? "font-medium text-[14px] text-[#156064] border-b-2 border-[#156064] pb-[10px]"
              : "text-[#8A8B9F] font-medium text-[14px]"
          }`}
          onClick={() => setActiveTab(tab.name)}
        >
          {tab.name}
          {tab.count && (
            <span className="flex items-center justify-center w-4 h-4 text-[6px] font-bold bg-[#42BE65] text-white rounded-full">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};
