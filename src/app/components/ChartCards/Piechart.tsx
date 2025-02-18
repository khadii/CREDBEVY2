"use client";

import React from "react";
import PieChartComponent from "../PieChart";
import { HiDotsHorizontal } from "react-icons/hi";


const LoanApprovalChart = ({ title, description, total, data }:{ title:any, description:any, total:any, data:any }) => {
  return (
    <div className="bg-white border rounded-lg pl-[16px] pr-[24px] pb-[38px] pt-[22px] w-full h-[480px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-[33px]">
        <div className="w-full">
        <div className="flex justify-between items-center w-full">
         <div><h2 className="text-lg font-bold text-[#333333] mb-1">
            {title}
          </h2></div>
          <div className="relative justify-end flex ">
          <button
            // onClick={() => setIsModalOpen(true)}
            className=" items-center justify-center w-full "
          >
       <HiDotsHorizontal size={14} color="grey"/>
          </button>
          
        
          
        </div>
         </div>
          <p className="font-medium text-sm text-[#333333] mb-3">
            {description}
          </p>
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
                className="w-[14px] h-[14px] rounded-full mr-2"
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
