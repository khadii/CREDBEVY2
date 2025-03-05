"use client";

import React from "react";
import PieChartComponent from "../PieChart";
import { HiDotsHorizontal } from "react-icons/hi";


const MapGraph = ({ title, description }:{ title:any, description:any, }) => {
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
          
        </div>
      
      </div>

      {/* Chart and Stats */}
      <div>
        {/* Pie Chart */}
        <div>
          Map
        </div>

      
      </div>
    </div>
  );
};

export default MapGraph;
