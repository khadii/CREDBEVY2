"use client";

import { useState, useRef, useEffect } from "react";
import BarChartComponent from './Chartbar';
import YearModal from "./Yearmodal";

type DataItem = {
  name: string;
  revenue: number;
};

const data: DataItem[] = [
  { name: "Jan", revenue: 25 },
  { name: "Feb", revenue: 30 },
  { name: "Mar", revenue: 20 },
  { name: "Apr", revenue: 15 },
  { name: "May", revenue: 35 },
  { name: "Jun", revenue: 20 },
  { name: "Jul", revenue: 50 },
  { name: "Aug", revenue: 45 },
  { name: "Sep", revenue: 10 },
  { name: "Oct", revenue: 5 },
  { name: "Nov", revenue: 30 },
  { name: "Dec", revenue: 25 },
];

const RevenueChart = () => {
  const [selectedYear, setSelectedYear] = useState("This Year");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Create a ref for the modal to detect clicks outside
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleSelectYear = (year: string) => {
    setSelectedYear(year);
    setIsModalOpen(false); // Close the modal after selection
  };

  // Effect to close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
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
          <h2 className="text-lg font-semibold text-[#333333] mb-1">
            Revenue Generated
          </h2>
          <p className="font-medium text-sm text-[#333333] mb-3">Total revenue earned through loan transactions.</p>
          <p className="text-2xl font-bold text-[#333333]">₦ 20,000,000.00</p>
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
          highlightBar="Jul" // Highlight the "Jan" bar
          highlightColor="#EC7910" // Red color for the highlighted bar
          barSize={11} // Custom bar size
          showValuesOnTop={true} // Show values on top of bars
          tooltip={true} // Enable tooltip
        />
      </div>
    </div>
  );
};

export default RevenueChart;
