"use client";

import React, { JSX } from "react";
import Card from "../components/Card";
import EqualHeightContainer, { TheeContainer } from "../components/equator";
import LoanRequestActions from "../components/Search";
import Table from "../components/Tableone/Datatable";
import ChartCard from "../components/DefaultRate";
import BarChartCard from "../components/Revenuechart";
import LoanApprovalChart from "../components/ChartCards/Piechart";
import ProgressBarCard, { LoanProductProgressBarCard } from "../components/Loanperformance";
import { Protest_Guerrilla } from "next/font/google";
import { LoanProduct } from "../components/LoanProduct/LoanProductTable.tsx";

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
  href: string;
  setStep:any
}

export default function LoanProducts({
  setStep,
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
          <TheeContainer
            leftContent={
              <LoanApprovalChart
                title={pieChartTitle}
                description={pieChartDescription}
                total={pieChartTotal}
                data={pieChartData}
              />
            }
            middle={
              <LoanProductProgressBarCard
                loanData={progressBarData}
                title={progressBarTitle}
                description={progressBarDescription}
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
        <LoanRequestActions
          onSearchClick={onSearchClick}
          onFilterClick={onFilterClick}
          onSeeAllClick={onSeeAllClick}
        />
        <LoanProduct setStep={setStep}         
        />
      </div>
    </section>
  );
}
