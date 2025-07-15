// LineChartComponent.tsx
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
import useIsMobile from "./useIsMobile";

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
  const isMobile = useIsMobile();
  const axisFontSize = isMobile ? 10 : 14;

  return (
    <ResponsiveContainer width="100%" height={275}>
      <RechartsLineChart data={data}>
        {showGrid && <CartesianGrid vertical={false} stroke="#E5E7EB" />}
    <XAxis
  dataKey="month"
  scale="point"
  tickLine={false}
  axisLine={false}
  tickMargin={2}
  padding={{ left: 20, right: 20 }}
  tick={{ fill: "#858688", fontSize: axisFontSize }}
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