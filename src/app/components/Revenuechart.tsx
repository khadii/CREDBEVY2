"use client";

import React from "react";
import CardChart from "./ChartCards/Batchart";

interface BarChartData {
  name: string;
  revenue: number;
}

interface BarChartCardProps {
  title: string;
  description: string;
  totalAmount: string;
  data: BarChartData[];
  highlightBar: string;
  highlightColor: string;
  barSize: number;
  showValuesOnTop: boolean;
  tooltip: boolean;
  selectedYear?:any
setSelectedYear?:any
}

export default function BarChartCard({
  title,
  description,
  totalAmount,
  data,
  highlightBar,
  highlightColor,
  barSize,
  showValuesOnTop,
  tooltip,
  selectedYear,
setSelectedYear
}: BarChartCardProps) {
  return (
    <CardChart
      title={title}
      description={description}
      totalAmount={totalAmount}
      data={data}
      highlightBar={highlightBar}
      highlightColor={highlightColor}
      barSize={barSize}
      showValuesOnTop={showValuesOnTop}
      tooltip={tooltip}
      selectedYear={selectedYear}
     setSelectedYear={setSelectedYear}
    />
  );
}