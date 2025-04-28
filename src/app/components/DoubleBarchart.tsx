"use client";

import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  Legend,
} from "recharts";

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
};

const DoubleBarChartComponent = ({
  comparisonData,
  firstDatasetColor = "#0F4C5C",
  secondDatasetColor = "#5C0F4C",
  highlightFirst,
  highlightSecond,
  highlightColor = "#EC7910",
  barSize = 11,
  showValues = true,
  tooltip = true,
  firstDatasetName = "Current",
  secondDatasetName = "Previous",
  yAxisFormatter = (value) => `${value.toFixed(2)}M`,
}: DoubleBarChartComponentProps) => {

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
        rx={10} // Rounded corners
        ry={10}
      />
    );
  };

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RechartsBarChart
        data={comparisonData}
        barGap={2}
        barCategoryGap={10}
        margin={{ top: 20, right: 10, left: 80, bottom: 5 }}
      >
        <XAxis
          dataKey="name"
          axisLine={false}
          tickLine={false}
          width={10}
          tick={{ fill: "#666", fontSize: 12 }}
        />
        <YAxis
          tickFormatter={yAxisFormatter}
          axisLine={false}
          tickLine={false}
          width={10}
          tick={{ fill: "#666", fontSize: 12 }}
        />
        {tooltip && (
          <Tooltip 
            content={<CustomTooltip />}
            wrapperStyle={{ backgroundColor: 'transparent', border: 'none', height: 257 }}
            cursor={false}
          />
        )}
        {/* <Legend /> */}
        <Bar
          name={firstDatasetName}
          dataKey="firstDataset"
          fill={firstDatasetColor}
          shape={renderFirstBar}
          barSize={barSize}
        >
          {/* {showValues && (
            <LabelList
              dataKey="firstDataset"
              position="top"
              formatter={yAxisFormatter}
            />
          )} */}
        </Bar>
        <Bar
          name={secondDatasetName}
          dataKey="secondDataset"
          fill={secondDatasetColor}
          shape={renderSecondBar}
          barSize={barSize}
        >
          {/* {showValues && (
            <LabelList
              dataKey="secondDataset"
              position="top"
              formatter={yAxisFormatter}
            />
          )} */}
        </Bar>
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

// Custom Tooltip Component matching original design
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