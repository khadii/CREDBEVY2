"use client";

import React from "react";
import ProgressBarComponent from "./progressBar";
// import ProgressBarComponent from "./ProgressBarComponent";

const loanData = [
  { label: "Personal Loans", value: 65376, maxValue: 150000},
  { label: "Business Loans", value: 121009, maxValue: 150000 },
  { label: "Mortgage Loans", value: 132645, maxValue: 150000 },
  { label: "Twitter", value: 132645, maxValue: 150000 },
  { label: "Twitter", value: 132645, maxValue: 150000 },
];

export default function LoanPerformancePage() {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 pb-8 w-full">
      {/* Header */}
      <div className="mb-16">
        <h2 className="text-lg font-semibold text-[#333333] mb-1">Loan Performance</h2>
        <p className="text-sm text-[#333333]">Total disbursal of different loan products</p>
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
}