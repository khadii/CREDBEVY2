"use client";

import React from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type TwoLineChartProps = {
  data: { month: string; value1: number; value2: number }[];
  lineColor1?: string;
  lineColor2?: string;
  showGrid?: boolean;
};

const TwoLineChart = ({
  data,
  lineColor1 = "#0F4C5C",
  lineColor2 = "#FF5733",
  showGrid = true,
}: TwoLineChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={257}>
      <RechartsLineChart data={data}>
        {showGrid && <CartesianGrid vertical={false} stroke="#E5E7EB" />}
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
          tick={{ fill: "#333333", fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
          width={30}
          tick={{ fill: "#333333", fontSize: 12 }}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line dataKey="value1" type="linear" stroke={lineColor1} strokeWidth={2} dot={false} />
        <Line dataKey="value2" type="linear" stroke={lineColor2} strokeWidth={2} dot={false} />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white shadow-lg rounded-lg p-3">
        <p className="text-sm text-[#333333]">{`${payload[0].value}%`}</p>
        {payload[1] && <p className="text-sm text-[#333333]">{`${payload[1].value}%`}</p>}
      </div>
    );
  }
  return null;
};

export default TwoLineChart;
