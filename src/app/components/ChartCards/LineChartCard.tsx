"use client";

import React, { useEffect, useRef, useState } from "react";
import YearModal from "../Yearmodal";
import LineChartComponent from "../LineChart";
import { ChevronDown } from "lucide-react";

interface ChartData {
  month: string;
  value: number;
}

interface RevenueChartProps {
  chartData: ChartData[];
  title: string;
  description: string;
  totalRevenue: string;
  revenueChange?: string;
  lineColor?: string;
  defaultSelectedYear?: string;
  selectedYear?:any, 
  setSelectedYear?:any
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  chartData,
  title,
  description,
  totalRevenue,
  revenueChange,
  lineColor = "#0F4C5C",
  defaultSelectedYear = "year",
  selectedYear, 
  setSelectedYear
}) => {
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
    setIsModalOpen(false); 
  };

  // Effect to close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white border rounded-lg pl-[20px] pr-[24px] pb-[38px] pt-[22px] w-full ">
      {/* Header */}
      <div className="flex justify-between items-center mb-[33px]">
        <div className="w-full ">
        <div className="flex justify-between items-center w-full ">
         <div><h2 className="text-lg font-bold text-[#333333] mb-1">
            {title}
          </h2></div>
          <div className="relative justify-end flex">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#F8F8F8] rounded-md py-[10px] text-sm pl-[20px] pr-[15px] text-[#333333] flex gap-[27px] font-bold  items-center justify-center w-full"
          >
         <div>
         {selectedYear}
         </div>
         <div> <ChevronDown size={20}/></div>
          </button>
          
          {/* Year Selection Modal */}
          {isModalOpen && (
            <div className="absolute right-0 left-0 top-12" ref={modalRef}>
              <YearModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleSelectYear}
              />
            </div>
          )}
        </div>
         </div>
          <p className="font-medium text-sm text-[#333333] mb-3">
            {description}
          </p>
          <p className="text-2xl font-bold text-[#333333] ">{totalRevenue}</p>
          {/* <p className="text-xs font-semibold text-green-800 pt-1">
              {revenueChange}
            </p> */}
        </div>
      
      </div>

      {/* Chart */}
      <div className=" w-full overflow-x-auto  scrollbar-hide">
      <LineChartComponent data={chartData} lineColor={lineColor} />
      </div>
    </div>
  );
};

export default RevenueChart;