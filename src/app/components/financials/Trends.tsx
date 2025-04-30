import React, { useState } from "react";
import CardChart from "../ChartCards/DoubleBatchart";
import EqualHeightContainer, { TwoContainer } from "../equator";
import LineChartTwo from "../ChartCards/doublelinechart";
import LoanApprovalChart from "../ChartCards/Piechart";
import ChartCard from "../DefaultRate";

export default function Trends() {
  const [selectedYear, setSelectedYear] = useState("This Year");
  const data = [
    { color: "#156064", name: "Revenue" },
    { color: "#EC7910", name: "Profit" },
  ];
  const pieChartData = [
    { name: "Approved", value: 10, color: "#156064" },
    { name: "Pending", value: 30, color: "#EC7910" },
    { name: "declined", value: 30, color: "#FA4D56" },
  ];

  const chartData = [
    { month: "Jan", value: 100000 },
    { month: "Feb", value: 120000 },
    { month: "Mar", value: 150000 },
    { month: "Apr", value: 180000 },
    { month: "May", value: 200000 },
    { month: "Jun", value: 220000 },
    { month: "Jul", value: 250000 },
    { month: "Aug", value: 280000 },
    { month: "Sep", value: 300000 },
    { month: "Oct", value: 320000 },
    { month: "Nov", value: 350000 },
    { month: "Dec", value: 400000 },
  ];
  return (
    <div className="pb-[227px]">
      <div className="mb-6">
        <CardChart
          title="Revenue VS Profit Trend"
          description="Trend comparing Revenue and profit"
          totalAmount="₦150.75M"
          comparisonData={[
            { name: "Jan", firstDataset: 12.5, secondDataset: 10.2 },
            { name: "Feb", firstDataset: 14.0, secondDataset: 12.1 },
            { name: "Mar", firstDataset: 16.3, secondDataset: 13.7 },
            { name: "Apr", firstDataset: 18.2, secondDataset: 14.5 },
            { name: "May", firstDataset: 17.8, secondDataset: 15.3 },
            { name: "Jun", firstDataset: 19.4, secondDataset: 16.2 },
            { name: "Jul", firstDataset: 20.1, secondDataset: 17.5 },
            { name: "Aug", firstDataset: 21.3, secondDataset: 18.8 },
            { name: "Sep", firstDataset: 22.5, secondDataset: 19.6 },
            { name: "Oct", firstDataset: 20.7, secondDataset: 18.0 },
            { name: "Nov", firstDataset: 18.9, secondDataset: 16.3 },
            { name: "Dec", firstDataset: 15.2, secondDataset: 13.5 },
          ]}
          firstDatasetName="2023"
          secondDatasetName="2022"
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          data={data}
        />
      </div>
      {/* second section */}
      <div className="mb-6">
        <EqualHeightContainer
          leftContent={
            <LineChartTwo
              title={"Repayment VS Default Trends"}
              description={"Trend showing repayment vs default ."}
              totalAmount={"$1.2M"}
              data={data}
              lineData={[
                { month: "Jan", firstValue: 65, secondValue: 70 },
                { month: "Feb", firstValue: 59, secondValue: 62 },
                { month: "Mar", firstValue: 72, secondValue: 68 },
                { month: "Apr", firstValue: 78, secondValue: 74 },
                { month: "May", firstValue: 85, secondValue: 82 },
                { month: "Jun", firstValue: 80, secondValue: 87 },
                { month: "Jul", firstValue: 75, secondValue: 79 },
                { month: "Aug", firstValue: 90, secondValue: 85 },
                { month: "Sep", firstValue: 88, secondValue: 90 },
                { month: "Oct", firstValue: 82, secondValue: 84 },
                { month: "Nov", firstValue: 77, secondValue: 79 },
                { month: "Dec", firstValue: 84, secondValue: 88 },
              ]}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          }
          rightContent={
            <LoanApprovalChart
              title={""}
              description={""}
              total={""}
              data={data}
            />
          }
        />
      </div>

      {/* third section*/}

      <div>
        <TwoContainer
          leftContent={
            <LoanApprovalChart
              title={"Loan Repayment Rate"}
              description={"Total loan repayment metrics"}
              total={"30,000"}
              data={pieChartData}
            />
          }
          rightContent={
            <ChartCard
              chartData={chartData}
              title={"Repayment Trend"}
              description={"Repayment Overtime"}
              totalRevenue={"₦ 20,000,000.00"}
              revenueChange={"30,00"}
              lineColor={"#0F4C5C"}
              defaultSelectedYear={selectedYear}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          }
        />
      </div>
    </div>
  );
}
