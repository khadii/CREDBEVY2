"use client";

import React, { useEffect, useRef, useState } from "react";
import YearModal from "../Yearmodal";
import LineChartComponent from "../LineChart";

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
}

const RevenueChart: React.FC<RevenueChartProps> = ({
  chartData,
  title,
  description,
  totalRevenue,
  revenueChange,
  lineColor = "#0F4C5C",
  defaultSelectedYear = "This Year",
}) => {
  const [selectedYear, setSelectedYear] = useState(defaultSelectedYear);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
    setIsModalOpen(false); // Close the modal after selection
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
    <div className="bg-white shadow-lg rounded-lg p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-lg font-semibold text-[#333333] mb-1">{title}</h2>
          <p className="font-medium text-sm text-[#333333] mb-3">
            {description}
          </p>
          <p className="text-2xl font-bold text-[#333333]">{totalRevenue}</p>

          {revenueChange && (
            <p className="text-xs font-semibold text-green-800 mt-1">
              {revenueChange}
            </p>
          )}
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
        <LineChartComponent data={chartData} lineColor={lineColor} />
      </div>
    </div>
  );
};

export default RevenueChart;