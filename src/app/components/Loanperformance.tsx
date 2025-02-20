"use client";

import React from "react";
import LoanPerformance from "./ChartCards/ProgressBarCard";

interface LoanData {
  label: string;
  value: number;
  maxValue: number;
}

interface ProgressBarCardProps {
  loanData: LoanData[];
  title: string;
  description: string;
}

export default function ProgressBarCard({
  loanData,
  title,
  description,
}: ProgressBarCardProps) {
  return (
    <LoanPerformance
      loanData={loanData}
      title={title}
      description={description}
    />
  );
}