import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useState, useEffect } from "react";

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
  width?: number;
  height?: number;
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
  width = 800,
  height = 270,
}: DoubleLineChartComponentProps) => {
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
      margin={{ top: 20, right: 10, bottom: 5 }}
    >
      {showGrid && <CartesianGrid vertical={false} stroke="#E5E7EB" />}
      <XAxis
        dataKey="month"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value) => value.slice(0, 3)}
        tick={{ fill: "#858688", fontSize: axisFontSize }}
          padding={{ left: 30, right: 20 }}
        interval={isMobile ? "preserveStartEnd" : 0}
      />
      <YAxis
        tickLine={false}
        axisLine={false}
        tickFormatter={yAxisFormatter}
        width={isMobile ? 30 : 40}
        tick={{ fill: "#858688", fontSize: axisFontSize }}
      />
      <Tooltip content={<CustomTooltip />} />
      {/* {showLegend && (
        <Legend 
          wrapperStyle={{ paddingTop: '20px' }}
          iconSize={isMobile ? 10 : 12}
          iconType="plainline"
        />
      )} */}
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
      />
    </RechartsLineChart>
  );
};

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