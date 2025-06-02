"use client";

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type LineDataItem = {
  month: string;
  firstValue: number;
  secondValue: number;
};

type DoubleLineChartComponentProps = {
  data: LineDataItem[];
  firstLineColor?: string;
  secondLineColor?: string;
  showGrid?: boolean;
  firstLineName?: string;
  secondLineName?: string;
  yAxisFormatter?: (value: number) => string;
  showLegend?: boolean;
};

const DoubleLineChartComponent = ({
  data,
  firstLineColor = "#0F4C5C",
  secondLineColor = "#EC7910",
  showGrid = true,
  firstLineName = "Current",
  secondLineName = "Previous",
  yAxisFormatter = (value) => `${value}%`,
  showLegend = true,
}: DoubleLineChartComponentProps) => {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <RechartsLineChart
        data={data}
        margin={{ top: 20, right: 10, left: 60, bottom: 5 }}
      >
        {showGrid && <CartesianGrid vertical={false} stroke="#E5E7EB" />}
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)} // Shorten month names to 3 letters
          tick={{ fill: "#858688", fontSize: 14 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickFormatter={yAxisFormatter}
          width={30}
          tick={{ fill: "#858688", fontSize: 14 }}
        />
        <Tooltip content={<CustomTooltip />} />
        {/* {showLegend && <Legend />} */}
        <Line
          name={firstLineName}
          dataKey="firstValue"
          type="linear"
          stroke={firstLineColor}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
        />
        <Line
          name={secondLineName}
          dataKey="secondValue"
          type="linear"
          stroke={secondLineColor}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 6 }}
          // strokeDasharray="5 5" // Optional: makes the second line dashed for better distinction
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-gray-800 text-white px-3 py-1 rounded-md text-sm">
      <p className="font-semibold">{label}</p>
      <div className="mt-1">
        <p style={{ color: payload[0].color }}>
          {payload[0].name}: {payload[0].value}%
        </p>
        {payload[1] && (
          <p style={{ color: payload[1].color }}>
            {payload[1].name}: {payload[1].value}%
          </p>
        )}
      </div>
    </div>
  );
};

export default DoubleLineChartComponent;