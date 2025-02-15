"use client";

import React, { useEffect, useRef, useState } from "react";
import LineChartComponent from "./LineChart";
import YearModal from "./Yearmodal";
// import LineChartComponent from "./LineChartComponent";

const chartData = [
  { month: "January", value: 16 },
  { month: "February", value: 12 },
  { month: "March", value: 10 },
  { month: "April", value: 8 },
  { month: "May", value: 6 },
  { month: "June", value: 4 },
  { month: "July", value: 2 },
  { month: "August", value: 16 },
  { month: "September", value: 12 },
  { month: "October", value: 10 },
  { month: "November", value: 8 },
  { month: "December", value: 6 },
];

export default function DefaultRatePage() {
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
          <h2 className="text-lg font-semibold text-[#333333] mb-1">
            Revenue Generated
          </h2>
          <p className="font-medium text-sm text-[#333333] mb-3">
            Total revenue earned through loan transactions.
          </p>
          <p className="text-2xl font-bold text-[#333333]">₦ 20,000,000.00</p>

          <p className="text-xs font-semibold text-green-800 mt-1">(30,00)</p>
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
        <LineChartComponent data={chartData} lineColor="#0F4C5C" />
      </div>
    </div>
  );
}
