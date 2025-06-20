"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

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
  // Convert data values to millions
  const dataInMillions = data.map(item => ({
    ...item,
    revenue: item.revenue / 1000000
  }));

  // Custom Bar Shape for dynamic coloring
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

  const renderCustom = (props: any) => {
    const { x, y, width, height, name } = props;
    const fillColor = name === highlightBar ? highlightColor : barColor;
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

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RechartsBarChart data={dataInMillions}
      // margin={{ top: 20, right: 20, left: 20, bottom: 0 }}
      >
        <XAxis
          dataKey="name"
          stroke="#888888"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#858688", fontSize: 14 }}
           interval={0} // Force all labels to show
  tickMargin={2} // Add space between tick and label

        />
        <YAxis
         tickFormatter={(tick: number) => `${formatToTwoDecimals(tick)}M`}
          stroke="#888888"
          axisLine={false}
          tickLine={false}
          width={85}
          tick={{ fill: "#858688", fontSize: 14 }}
        />
        <Tooltip 
          content={<CustomTooltip />}
          wrapperStyle={{ backgroundColor: 'transparent', border: 'none', height: 257 }}
          cursor={false} 
        />
        <Bar
          dataKey="revenue"
          shape={renderCustomBar}
          barSize={barSize}
        > 
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm ">
        ₦{payload[0].value}M
      </div>
    );
  }
  return null;
};

export default BarChartComponent;