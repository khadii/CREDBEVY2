"use client";

import React from "react";
import RevenueChart from "./ChartCards/LineChartCard";

interface ChartData {
  month: string;
  value: number;
}

interface ChartCardProps {
  chartData: ChartData[];
  title: string;
  description: string;
  totalRevenue: any;
  revenueChange: string;
  lineColor: string;
  defaultSelectedYear: string;
  selectedYear:any
  setSelectedYear:any
}

export default function ChartCard({
  chartData,
  title,
  description,
  totalRevenue,
  revenueChange,
  lineColor,
  defaultSelectedYear,
  selectedYear,
  setSelectedYear
}: ChartCardProps) {
  return (
    <RevenueChart
      chartData={chartData}
      title={title}
      description={description}
      totalRevenue={totalRevenue}
      revenueChange={revenueChange}
      lineColor={lineColor}
      defaultSelectedYear={defaultSelectedYear}
      selectedYear={selectedYear}
      setSelectedYear={setSelectedYear}
    />
  );
}