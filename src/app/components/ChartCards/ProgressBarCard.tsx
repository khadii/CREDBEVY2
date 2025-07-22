"use client";

import React, { useState } from "react";
import ProgressBarComponent from "../progressBar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EmptyState } from "./Piechart";

interface LoanData {
  label: string;
  value: number;
  maxValue: number;
}

interface LoanPerformanceProps {
  loanData: LoanData[];
  title: string;
  description: string;
  height?: number; // Optional height override
}

const LoanPerformanceBase: React.FC<LoanPerformanceProps> = ({
  loanData,
  title,
  description,
  height = 475, // default height
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 5, loanData.length - 5));
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 5, 0));
  };

  const visibleLoanData = loanData.slice(currentIndex, currentIndex + 5);
  const isEmpty = loanData.length === 0;

  return (
    <div
      className={`bg-white border rounded-lg pl-[16px] pr-[24px] pb-[38px] pt-[22px] w-full relative`}
      style={{ height }}
    >
      {/* Header */}
      <div className="mb-9">
        <h2 className="text-lg font-semibold text-[#333333] mb-1">{title}</h2>
        <p className="text-sm text-[#333333]">{description}</p>
      </div>

      {isEmpty ? (
        <EmptyState
          title="No loan data available"
          description="There are no loan records to display at this time"
        />
      ) : (
        <>
          <div className="w-full space-y-8">
            {visibleLoanData.map((loan, index) => (
              <ProgressBarComponent
                key={index}
                label={loan.label}
                value={loan.value}
                color={index === 0 ? "#FFB200" : index === 1 ? "#4339F2" : "#02A0FC"}
              />
            ))}
          </div>

          {/* Navigation Icons */}
          {loanData.length > 5 && (
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5 text-gray-700" />
              </button>
              <button
                onClick={handleNext}
                disabled={currentIndex + 5 >= loanData.length}
                className="p-1 rounded-full bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

// Main export
const LoanPerformance: React.FC<LoanPerformanceProps> = (props) => (
  <LoanPerformanceBase {...props} height={475} />
);

export default LoanPerformance;

// Variant export
export const PerformanceLoanProduct: React.FC<LoanPerformanceProps> = (props) => (
  <LoanPerformanceBase {...props} height={482} />
);
