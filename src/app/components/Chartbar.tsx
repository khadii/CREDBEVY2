"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";

type DataItem = {
  name: string;
  revenue: number;
};

type BarChartComponentProps = {
  data: DataItem[];
  barColor?: string;
  highlightBar?: string;
  highlightColor?: string;
  barSize?: number;
  showValuesOnTop?: boolean;
  tooltip?: boolean;
};

const BarChartComponent = ({
  data,
  barColor = "#0F4C5C",
  highlightBar,
  highlightColor = "#FF0000",
  barSize = 11,
  showValuesOnTop = true,
  tooltip = true,
}: BarChartComponentProps) => {
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

  // const axisFontSize = isMobile ? 10 : 14;

  const dataInMillions = data.map((item) => ({
    ...item,
    revenue: item.revenue / 1000000,
  }));

  const renderCustomBar = (props: any) => {
    const { x, y, width, height, name } = props;
    const fillColor = name === highlightBar ? highlightColor : barColor;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        rx={5}
        ry={5}
      />
    );
  };

  const formatToTwoDecimals = (value: number): string => {
    return value.toFixed(4);
  };

  if (!isMounted) return null;

  return (
    <RechartsBarChart width={800} height={280} data={dataInMillions}>
      <XAxis
        dataKey="name"
        scale="point"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#858688", fontSize: 14 }}
        interval={isMobile ? "preserveStartEnd" : 0}
        padding={{ left: 10, right: 10 }}
        height={isMobile ? 50 : 60}
      />
      <YAxis
        tickFormatter={(tick: number) => `${formatToTwoDecimals(tick)}M`}
        stroke="#888888"
        axisLine={false}
        tickLine={false}
        width={85}
        tick={{ fill: "#858688", fontSize: 14 }}
      />
      {tooltip && (
        <Tooltip
          content={<CustomTooltip isMobile={isMobile} />}
          wrapperStyle={{
            backgroundColor: "transparent",
            border: "none",
            height: 257,
          }}
          cursor={false}
        />
      )}
      <Bar dataKey="revenue" shape={renderCustomBar} barSize={barSize} />
    </RechartsBarChart>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const formattedValue = payload[0].value !== undefined 
      ? `₦${payload[0].value.toFixed(4)}M`
      : 'N/A';

    return (
      <div className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
        {formattedValue}
      </div>
    );
  }
  return null;
};

export default BarChartComponent;