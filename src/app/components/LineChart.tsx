"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useState, useEffect } from "react";

type LineChartComponentProps = {
  data: { month: string; value: number }[];
  lineColor?: string;
  showGrid?: boolean;
  width?: number;
  height?: number;
};

const LineChartComponent = ({
  data,
  lineColor = "#0F4C5C",
  showGrid = true,
  width = 800,
  height = 275,
}: LineChartComponentProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const axisFontSize = isMobile ? 10 : 14;

  if (!isMounted) return null;

  return (
    <RechartsLineChart
      width={width}
      height={height}
      data={data}
      margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
    >
      {showGrid && <CartesianGrid vertical={false} stroke="#E5E7EB" />}
      <XAxis
        dataKey="month"
        scale="point"
        tickLine={false}
        axisLine={false}
        tickMargin={2}
        padding={{ left: 30, right: 20 }}
        tick={{ fill: "#858688", fontSize: 14 }}
        interval={isMobile ? "preserveStartEnd" : 0}
        tickFormatter={(value) => value.slice(0, 3)}
        height={isMobile ? 50 : 60}
      />
      <YAxis
        tickLine={false}
        axisLine={false}
        tickFormatter={(value) => `${value}%`}
        width={35}
        tick={{ fill: "#858688", fontSize: axisFontSize }}
      />
      <Tooltip content={<CustomTooltip />} />
      <Line
        dataKey="value"
        type="linear"
        stroke={lineColor}
        strokeWidth={2}
        dot={false}
      />
    </RechartsLineChart>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black shadow-lg rounded-lg p-2">
        <p className="text-sm text-white">{`${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

export default LineChartComponent;