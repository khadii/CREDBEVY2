"use client";

import React, { JSX } from "react";
import Card from "../Card";
import EqualHeightContainer from "../equator";
import Search from "../Search";
import Table from "../Tableone/Datatable";
import ChartCard from "../DefaultRate";
import BarChartCard from "../Revenuechart";
import LoanApprovalChart from "../ChartCards/Piechart";
import ProgressBarCard from "../Loanperformance";
import { LoanRequest } from "./loanRequestTable";


interface Stat {
  title: any;
  amount: any;
  percentage: any;
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
  value: any;
  color: string;
}

interface ProgressBarData {
  label: string;
  value: number;
  maxValue: number;
}

interface TableData {
  first_name: string;
  last_name: string;
  average_income: string;
  amount_requested: string;
  credit_score: number;
  interest_rate: string;
  loan_duration: string;
  info_status?: string;
  image: string; // Add image property
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
  href: string;
  selectedYear?:any
  setSelectedYear?:any
  barselectedYear?:any
  barsetSelectedYear?:any
  total_count?:any
  bulkAction?:any
  laon_table_data_all?:any
}

export default function Dashboardone({
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
  lineChartTitle,
  lineChartDescription,
  lineChartTotalRevenue,
  lineChartRevenueChange,
  lineChartLineColor,
  lineChartDefaultSelectedYear,
  progressBarTitle,
  progressBarDescription,
  href,
  selectedYear,
  setSelectedYear,
  barselectedYear,
  barsetSelectedYear,
  total_count,
  bulkAction,
  laon_table_data_all
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
                selectedYear={barselectedYear}
                setSelectedYear={barsetSelectedYear}
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
          <EqualHeightContainer
            leftContent={
              <ChartCard
                chartData={chartData}
                title={lineChartTitle}
                description={lineChartDescription}
                totalRevenue={lineChartTotalRevenue}
                revenueChange={lineChartRevenueChange}
                lineColor={lineChartLineColor}
                defaultSelectedYear={lineChartDefaultSelectedYear}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />
            }
            rightContent={
              <ProgressBarCard
                loanData={progressBarData}
                title={progressBarTitle}
                description={progressBarDescription}
              />
            }
          />
        </div>
        <Search
          // onSearchClick={onSearchClick}
          // onFilterClick={onFilterClick}
          // onSeeAllClick={onSeeAllClick}
        />
        <LoanRequest laon_table_data_all={laon_table_data_all} total_count={total_count} bulkAction={bulkAction} />
      </div>
    </section>
  );
}