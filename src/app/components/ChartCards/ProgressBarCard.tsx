"use client";

import React from "react";
import ProgressBarComponent from "../progressBar";


interface LoanData {
  label: string;
  value: number;
  maxValue: number;
}

interface LoanPerformanceProps {
  loanData: LoanData[];
  title: string;
  description: string;
}

const LoanPerformance: React.FC<LoanPerformanceProps> = ({ loanData, title, description }) => {
  return (
<div className="bg-white border rounded-lg pl-[16px] pr-[24px] pb-[38px] pt-[22px] w-full h-[500px]">
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-lg font-semibold text-[#333333] mb-1">{title}</h2>
        <p className="text-sm text-[#333333]">{description}</p>
      </div>

      {/* Progress Bars */}
      <div className="w-full space-y-8">
        {loanData.map((loan, index) => (
          <ProgressBarComponent
            key={index}
            label={loan.label}
            value={loan.value}
            maxValue={loan.maxValue}
            color={index === 0 ? "#FFB200" : index === 1 ? "#4339F2" : "#02A0FC"} // Custom colors for each bar
          />
        ))}
      </div>
    </div>
  );
};

export default LoanPerformance;