"use client";

import React from "react";
import PieChartComponent from "../PieChart";


const LoanApprovalChart = ({ title, description, total, data }:{ title:any, description:any, total:any, data:any }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-lg font-semibold text-[#333333] mb-1">{title}</h2>
          <p className="font-medium text-xs text-[#333333] mb-3">{description}</p>
          <p className="text-2xl font-bold text-[#333333]">{total}</p>
        </div>
      </div>

      {/* Chart and Stats */}
      <div>
        {/* Pie Chart */}
        <div>
          <PieChartComponent data={data} />
        </div>

        {/* Stats */}
        <div className="flex w-full space-x-12 justify-center mt-14">
          {data.map((item:any, index:any) => (
            <div key={index} className="flex items-center">
              <div
                className="w-4 h-4 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-[#333333] font-light">{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoanApprovalChart;
