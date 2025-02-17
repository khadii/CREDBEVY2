"use client";

import { useState, useRef, useEffect } from "react";
import YearModal from "../Yearmodal";
import BarChartComponent from "../Chartbar";


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
}: CardChartProps) => {
  const [selectedYear, setSelectedYear] = useState("This Year");
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
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-lg font-semibold text-[#333333] mb-1">
            {title}
          </h2>
          <p className="font-medium text-sm text-[#333333] mb-3">
            {description}
          </p>
          <p className="text-2xl font-bold text-[#333333]">{totalAmount}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setIsModalOpen(true)}
            className="border border-gray-300 rounded-md p-2 text-sm text-[#333333]"
          >
            {selectedYear} ▼
          </button>
          
          {/* Year Selection Modal */}
          {isModalOpen && (
            <div className="absolute" ref={modalRef}>
              <YearModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleSelectYear}
              />
            </div>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="w-full">
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