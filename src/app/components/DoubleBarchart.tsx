"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";

type ComparisonDataItem = {
  name: string;
  firstDataset: number;
  secondDataset: number;
};

type DoubleBarChartComponentProps = {
  comparisonData: ComparisonDataItem[];
  firstDatasetColor?: string;
  secondDatasetColor?: string;
  highlightFirst?: string;
  highlightSecond?: string;
  highlightColor?: string;
  barSize?: number;
  showValues?: boolean;
  tooltip?: boolean;
  firstDatasetName?: string;
  secondDatasetName?: string;
  yAxisFormatter?: (value: number) => string;
  width?: number;
  height?: number;
};

const DoubleBarChartComponent = ({
  comparisonData,
  firstDatasetColor = "#0F4C5C",
  secondDatasetColor = "#EC7910",
  highlightFirst,
  highlightSecond,
  highlightColor = "#EC7910",
  barSize = 11,
  showValues = true,
  tooltip = true,
  firstDatasetName = "Current",
  secondDatasetName = "Previous",
  yAxisFormatter = (value) => `${value.toFixed(2)}M`,
  width = 800,
  height = 280,
}: DoubleBarChartComponentProps) => {
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
  const yAxisWidth = isMobile ? 40 : 50;

  const renderFirstBar = (props: any) => {
    const { x, y, width, height, name } = props;
    const fillColor = name === highlightFirst ? highlightColor : firstDatasetColor;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        rx={10}
        ry={10}
      />
    );
  };

  const renderSecondBar = (props: any) => {
    const { x, y, width, height, name } = props;
    const fillColor = name === highlightSecond ? highlightColor : secondDatasetColor;
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        rx={10}
        ry={10}
      />
    );
  };

  if (!isMounted) return null;

  return (
    <RechartsBarChart
      width={width}
      height={height}
      data={comparisonData}
      barGap={2}
      barCategoryGap={10}
      margin={{ top: 20, right: 10, bottom: 5 }}
    >
      <XAxis
        dataKey="name"
        axisLine={false}
        tickLine={false}
        tick={{ fill: "#858688", fontSize: axisFontSize }}
        interval={isMobile ? "preserveStartEnd" : 0}
        height={isMobile ? 50 : 60}
            padding={{ left: 30, right: 20 }}
      />
      <YAxis
        tickFormatter={yAxisFormatter}
        axisLine={false}
        tickLine={false}
        width={yAxisWidth}
        tick={{ fill: "#858688", fontSize: axisFontSize }}
      />
      {tooltip && (
        <Tooltip 
          content={<CustomTooltip />}
          wrapperStyle={{ backgroundColor: 'transparent', border: 'none', height: 257 }}
          cursor={false}
        />
      )}
      {/* <Legend 
        wrapperStyle={{ paddingTop: '10px' }}
        iconSize={isMobile ? 10 : 12}
      /> */}
      <Bar
        name={firstDatasetName}
        dataKey="firstDataset"
        fill={firstDatasetColor}
        shape={renderFirstBar}
        barSize={barSize}
      />
      <Bar
        name={secondDatasetName}
        dataKey="secondDataset"
        fill={secondDatasetColor}
        shape={renderSecondBar}
        barSize={barSize}
      />
    </RechartsBarChart>
  );
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
      <p className="font-semibold">{label}</p>
      <div className="mt-1">
        <p>{payload[0].name}: ₦{payload[0].value.toFixed(2)}M</p>
        {payload[1] && <p>{payload[1].name}: ₦{payload[1].value.toFixed(2)}M</p>}
      </div>
    </div>
  );
};

export default DoubleBarChartComponent;