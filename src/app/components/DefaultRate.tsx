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
  totalRevenue: string;
  revenueChange: string;
  lineColor: string;
  defaultSelectedYear: string;
}

export default function ChartCard({
  chartData,
  title,
  description,
  totalRevenue,
  revenueChange,
  lineColor,
  defaultSelectedYear,
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
    />
  );
}