"use client";

import { useState, useRef, useEffect } from "react";
import YearModal from "../Yearmodal";
import BarChartComponent from "../Chartbar";
import { ChevronDown } from "lucide-react";


type DataItem = {
  name: string;
  revenue: number;
};

type CardChartProps = {
  title: string;
  description: string;
  totalAmount: string;
  data: DataItem[];
  highlightBar?: string;
  highlightColor?: string;
  barSize?: number;
  showValuesOnTop?: boolean;
  tooltip?: boolean;
  selectedYear?:any
  setSelectedYear?:any
};

const CardChart = ({
  title,
  description,
  totalAmount,
  data,
  highlightBar = "",
  highlightColor = "#EC7910",
  barSize = 11,
  showValuesOnTop = true,
  tooltip = true,
  selectedYear,
  setSelectedYear
}: CardChartProps) => {
  // const [selectedYear, setSelectedYear] = useState("This Year");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-white border rounded-lg  pr-[24px] pb-[38px] pt-[22px] w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-[33px] pl-[20px]">
        <div className="w-full ">
        <div className="flex justify-between items-center w-full">
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
          <p className="text-2xl font-bold text-[#333333]">{totalAmount}</p>
        </div>
      
      </div>

      {/* Chart */}
      <div className="w-full ">
        <BarChartComponent
          data={data}
          highlightBar={highlightBar}
          highlightColor={highlightColor}
          barSize={barSize}
          showValuesOnTop={showValuesOnTop}
          tooltip={tooltip}
        />
      </div>
    </div>
  );
};

export default CardChart;