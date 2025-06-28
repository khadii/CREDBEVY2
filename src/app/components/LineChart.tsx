"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type LineChartComponentProps = {
  data: { month: string; value: number }[];
  lineColor?: string;
  showGrid?: boolean;
};

const LineChartComponent = ({
  data,
  lineColor = "#0F4C5C",
  showGrid = true,
}: LineChartComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RechartsLineChart
        data={data}
        // margin={{ top: 20, right: 20, left: 60, bottom: 0 }}
      >
        {showGrid && <CartesianGrid vertical={false} stroke="#E5E7EB" />}
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={2}
           padding={{ left: 20, right: 20 }} 
          //  tickFormatter={(value) => value} 
          // tickFormatter={(value) => value.slice(0, 3)} // Shorten month names to 3 letters
          tick={{ fill: "#858688", fontSize: 14 }}
                    interval={0} 
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`} // Format Y-axis labels as percentages
       width={35}

          tick={{ fill: "#858688", fontSize: 14 }}
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
    </ResponsiveContainer>
  );
};

// Custom Tooltip Component
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