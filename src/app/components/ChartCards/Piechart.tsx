"use client";

import React from "react";
import PieChartComponent from "../PieChart";
import { HiDotsHorizontal } from "react-icons/hi";

const EmptyStateIllustration = () => (
  <div className="relative mb-8">
    {/* Back document */}
    <div className="absolute top-2 left-2 w-16 h-20 bg-gray-300 rounded-lg border-2 border-gray-400 opacity-60"></div>
    {/* Front document */}
    <div className="relative w-16 h-20 bg-white rounded-lg border-2 border-gray-400 shadow-sm">
      {/* Document corner fold */}
      <div className="absolute top-0 right-0 w-3 h-3 bg-gray-200 border-l border-b border-gray-400" 
           style={{
             clipPath: 'polygon(0 0, 100% 0, 100% 100%)'
           }}>
      </div>
      {/* Document lines */}
      <div className="p-2 pt-3 space-y-1">
        <div className="h-0.5 bg-gray-300 rounded w-8"></div>
        <div className="h-0.5 bg-gray-300 rounded w-6"></div>
        <div className="h-0.5 bg-gray-300 rounded w-7"></div>
      </div>
    </div>
  </div>
);

export const EmptyState = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center h-full gap-4 p-6">
    <EmptyStateIllustration />
    <div className="text-center space-y-2">
      <h3 className="text-gray-600 font-semibold text-base">{title}</h3>
      <p className="text-gray-500 text-sm max-w-sm leading-relaxed">{description}</p>
    </div>
  </div>
);
const LoanApprovalChart = ({ 
  title, 
  description, 
  total, 
  data 
}: { 
  title: string; 
  description: string; 
  total: string; 
  data: Array<{ name: string; value: number; color: string }> 
}) => {
  const isEmpty = !data || data.length === 0 || data.every(item => item.value === 0);

  return (
    <div className="bg-white border rounded-lg p-4 sm:p-6 w-full h-auto min-h-[480px] flex flex-col">
      <div className="flex flex-col mb-4 sm:mb-8">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg font-bold text-[#333333] mb-1">{title}</h2>
          <button className="items-center justify-center">
            <HiDotsHorizontal size={14} color="grey"/>
          </button>
        </div>
        <p className="font-medium text-sm text-[#333333] mb-2 sm:mb-3">{description}</p>
        <p className="text-2xl font-bold text-[#333333]">{total}</p>
      </div>

      <div className="flex-1 flex flex-col">
        {isEmpty ? (
          <EmptyState 
            title="No data available" 
            description="There is no loan  data to display at this time" 
          />
        ) : (
          <>
            <div className="flex-1 min-h-[200px]">
              <PieChartComponent data={data} />
            </div>
            <div className="mt-8 sm:mt-14">
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                {data.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2 flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className="text-[9px] text-[#333333] font-semibold whitespace-nowrap">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoanApprovalChart;