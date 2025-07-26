"use client";

import React, { JSX, useEffect, useMemo } from "react";
import Card from "../Card";
import EqualHeightContainer from "../equator";
import Search from "../Search";
import Table from "../Tableone/Datatable";
import ChartCard from "../DefaultRate";
import BarChartCard from "../Revenuechart";
import LoanApprovalChart from "../ChartCards/Piechart";
import ProgressBarCard from "../Loanperformance";
import { all_loan_requests } from "@/app/Redux/Loan_request/loan_request_thunk";
import { AppDispatch } from "@/app/Redux/store";
import { useDispatch } from "react-redux";
import { LoanRequest } from "./loanRequestTable";

interface Stat {
  title: string;
  amount: string;
  percentage: string;
  icon: JSX.Element;
}

interface ChartData {
  month: string;
  value: number;
}

interface BarChartData {
  name: string;
  revenue: number;
}

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface ProgressBarData {
  label: string;
  value: number;
  maxValue: number;
}

interface TableData {
  name: string;
  income: string;
  amount: string;
  cs: number;
  ir: string;
  duration: string;
  status?: string;
}

interface TitleProps {
  mainTitle: string;
  requestCount: string;
  subtitle: string;
}

interface DashboardProps {
  stats: Stat[];
  chartData: ChartData[];
  barChartData: BarChartData[];
  pieChartData: PieChartData[];
  progressBarData: ProgressBarData[];
  tableData: TableData[];
  tableHeaders: string[];
  tableTitleProps: TitleProps;
  onSearchClick: () => void;
  onFilterClick: () => void;
  onSeeAllClick: () => void;
  onFundWallet: () => void;
  barChartTitle: string;
  barChartDescription: string;
  barChartTotalAmount: string;
  barChartHighlightBar: string;
  barChartHighlightColor: string;
  pieChartTitle: string;
  pieChartDescription: string;
  pieChartTotal: string;
  lineChartTitle: string;
  lineChartDescription: string;
  lineChartTotalRevenue: string;
  lineChartRevenueChange: string;
  lineChartLineColor: string;
  lineChartDefaultSelectedYear: string;
  progressBarTitle: string;
  progressBarDescription: string;
  href:string
  selectedYear:any
  setSelectedYear:any
total_count:any
bulkAction:any
}

export default function Dashboard({
  stats,
  chartData,
  barChartData,
  pieChartData,
  progressBarData,
  tableData,
  tableHeaders,
  tableTitleProps,
  onSearchClick,
  onFilterClick,
  onSeeAllClick,
  onFundWallet,
  barChartTitle,
  barChartDescription,
  barChartTotalAmount,
  barChartHighlightBar,
  barChartHighlightColor,
  pieChartTitle,
  pieChartDescription,
  pieChartTotal,
  selectedYear,
  setSelectedYear,
  lineChartTotalRevenue,
  lineChartRevenueChange,
  lineChartLineColor,
  lineChartDefaultSelectedYear,
  progressBarTitle,
  progressBarDescription,
  href,
  total_count,
  bulkAction
}: DashboardProps) {

 
  return (
    <section className="w-full bg-[#FAFAFA] pb-20">
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              title={stat.title}
              amount={stat.amount}
              percentage={stat.percentage}
              icon={stat.icon}
            />
          ))}
        </div>
        <div>
          <EqualHeightContainer
            leftContent={
              <BarChartCard
                title={barChartTitle}
                description={barChartDescription}
                totalAmount={barChartTotalAmount}
                data={barChartData}
                highlightBar={barChartHighlightBar}
                highlightColor={barChartHighlightColor}
                barSize={11}
                showValuesOnTop={true}
                tooltip={true}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />
            }
            rightContent={
              <LoanApprovalChart
                title={pieChartTitle}
                description={pieChartDescription}
                total={pieChartTotal}
                data={pieChartData}
              />
            }
          />
   
        </div>
        <Search
          
        />
        <LoanRequest laon_table_data_all={tableData} total_count={total_count} bulkAction={bulkAction}   />
      </div>
    </section>
  );
}


// data={tableData}