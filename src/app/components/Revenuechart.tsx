// import CardChart from './CardChart';

import CardChart from "./ChartCards/Batchart";

const data = [
  { name: "Jan", revenue: 25 },
  { name: "Feb", revenue: 30 },
  { name: "Mar", revenue: 20 },
  { name: "Apr", revenue: 15 },
  { name: "May", revenue: 35 },
  { name: "Jun", revenue: 20 },
  { name: "Jul", revenue: 50 },
  { name: "Aug", revenue: 45 },
  { name: "Sep", revenue: 10 },
  { name: "Oct", revenue: 5 },
  { name: "Nov", revenue: 30 },
  { name: "Dec", revenue: 25 },
];

const RevenueChart = () => {
  return (
    <CardChart
      title="Revenue Generated"
      description="Total revenue earned through loan transactions."
      totalAmount="₦ 20,000,000.00"
      data={data}
      highlightBar="Jul"
      highlightColor="#EC7910"
      barSize={11}
      showValuesOnTop={true}
      tooltip={true}
    />
  );
};

export default RevenueChart;