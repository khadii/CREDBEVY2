"use client";

import React from "react";
import PieChartComponent from "../PieChart";
import { HiDotsHorizontal } from "react-icons/hi";

const LoanApprovalChart = ({ title, description, total, data }:{ title:any, description:any, total:any, data:any }) => {
  return (
    <div className="bg-white border rounded-lg p-4 sm:p-6 w-full h-auto min-h-[480px] flex flex-col">
      {/* Header */}
      <div className="flex flex-col mb-4 sm:mb-8">
        <div className="flex justify-between items-center w-full">
          <h2 className="text-lg font-bold text-[#333333] mb-1">
            {title}
          </h2>
          <button className="items-center justify-center">
            <HiDotsHorizontal size={14} color="grey"/>
          </button>
        </div>
        <p className="font-medium text-sm text-[#333333] mb-2 sm:mb-3">
          {description}
        </p>
        <p className="text-2xl font-bold text-[#333333]">{total}</p>
      </div>

      {/* Chart and Stats */}
      <div className="flex-1 flex flex-col">
        {/* Pie Chart */}
        <div className="flex-1 min-h-[200px]">
          <PieChartComponent data={data} />
        </div>

        {/* Stats - Responsive layout */}
        <div className="mt-8 sm:mt-14">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4">
            {data.map((item:any, index:any) => (
              <div key={index} className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-[9px] text-[#333333] font-light whitespace-nowrap">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanApprovalChart;