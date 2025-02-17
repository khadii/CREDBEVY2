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
  barColor?: string; // Optional prop for custom bar color
  highlightBar?: string; // Optional prop to highlight a specific bar (e.g., "Jan")
  highlightColor?: string; // Optional prop for the highlight color
  barSize?: number; // Optional prop for bar size
  showValuesOnTop?: boolean; // Optional prop to show values on top of bars
  tooltip?: boolean; // Optional prop to enable/disable tooltip
};

const BarChartComponent = ({
  data,
  barColor = "#0F4C5C", // Default bar color
  highlightBar,
  highlightColor = "#FF0000", // Default highlight color
  barSize = 11, // Default bar size
  showValuesOnTop = true, // Show values on top by default
  tooltip = true, // Enable tooltip by default
}: BarChartComponentProps) => {
  // Custom Bar Shape for dynamic coloring
  const renderCustomBar = (props: any) => {
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
        // style={{ boxShadow: 'none' }}
      
        
      />
    );
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
    <ResponsiveContainer width="100%" height={257}>
      <RechartsBarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#333333", fontSize: 12 }}
        />
        <YAxis
          tickFormatter={(tick: any) => `${tick}M`}
          stroke="#888888"
          axisLine={false}
          tickLine={false}
          tick={{ fill: "#333333", fontSize: 12 }}
        />
         <Tooltip content={<CustomTooltip />}
          wrapperStyle={{ backgroundColor: 'transparent', border: 'none',height:257,}}
          // contentStyle={{ backgroundColor: 'white', borderRadius: '8px', padding: '10px' }}
          // itemStyle={{ color: 'blue' }}
          // labelStyle={{ fontWeight: 'bold', color: 'black' }}
          cursor={{  strokeWidth: 0,}}
          offset={15} />
        {/* {tooltip && <Tooltip content={<CustomTooltip />} />} */}
        <Bar
          dataKey="revenue"
          shape={renderCustomBar} // Use custom bar shape
          barSize={barSize}
        >
          {/* {showValuesOnTop && (
            <LabelList
              dataKey="revenue"
              position="top"
              fill="#000" // Text color
              fontSize={12} // Text size
              formatter={(value: number) => `₦${value}M`} // Format the value
              // enableBackground={'blue'}
            />
          )} */}
        
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