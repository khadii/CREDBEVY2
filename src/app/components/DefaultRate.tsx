"use client";

import React from "react";
import RevenueChart from "./ChartCards/LineChartCard";
// import RevenueChart from "./RevenueChart";

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
  return (
    <RevenueChart
      chartData={chartData}
      title="Revenue Generated"
      description="Total revenue earned through loan transactions."
      totalRevenue="₦ 20,000,000.00"
      revenueChange="(30,00)"
      lineColor="#0F4C5C"
      defaultSelectedYear="This Year"
    />
  );
}