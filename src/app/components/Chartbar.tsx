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
        rx={5} // Rounded corners
        ry={5}
      
      
        
      />
    );
  };
  const formatToTwoDecimals = (value: number): string => {
    return value.toFixed(2);
  };
  const renderCustom = (props: any) => {
    const { x, y, width, height, name } = props;
    const fillColor = name === highlightBar ? highlightColor : barColor; // Conditional color
    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={fillColor}
        rx={10} // Rounded corners
        ry={10}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RechartsBarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#333333", fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(tick: number) => `${formatToTwoDecimals(tick)}M`}
          stroke="#888888"
          axisLine={false}
          tickLine={false}
          width={30}
          tick={{ fill: "#333333", fontSize: 12 }}
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