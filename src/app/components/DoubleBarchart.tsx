"use client";

import React from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

type DoubleBarChartProps = {
  data: { name: string; value1: number; value2: number }[];
  barColor1?: string;
  barColor2?: string;
  showGrid?: boolean;
};

const DoubleBarChart = ({
  data,
  barColor1 = "#0F4C5C",
  barColor2 = "#FF5733",
  showGrid = true,
}: DoubleBarChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={257}>
      <RechartsBarChart data={data}>
        {showGrid && <CartesianGrid vertical={false} stroke="#E5E7EB" />}
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#333333", fontSize: 12 }} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#333333", fontSize: 12 }} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="value1" fill={barColor1} barSize={15} radius={[10, 10, 0, 0]} />
        <Bar dataKey="value2" fill={barColor2} barSize={15} radius={[10, 10, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
        {payload.map((item: any, index: number) => (
          <p key={index}>{`${item.name}: ₦${item.value}M`}</p>
        ))}
      </div>
    );
  }
  return null;
};

export default DoubleBarChart;
