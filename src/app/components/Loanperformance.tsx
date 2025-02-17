"use client";

import React from "react";
import LoanPerformance from "./ChartCards/ProgressBarCard";


const loanData = [
  { label: "Personal Loans", value: 65376, maxValue: 150000 },
  { label: "Business Loans", value: 121009, maxValue: 150000 },
  { label: "Mortgage Loans", value: 132645, maxValue: 150000 },
  { label: "Twitter", value: 132645, maxValue: 150000 },
  { label: "Twitter", value: 132645, maxValue: 150000 },
];

export default function LoanPerformancePage() {
  return (
    <LoanPerformance
      loanData={loanData}
      title="Loan Performance"
      description="Total disbursal of different loan products"
    />
  );
}