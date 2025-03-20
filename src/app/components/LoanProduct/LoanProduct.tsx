"use client";

import React, { JSX } from "react";
import Card from "../Card";
import EqualHeightContainer, { TheeContainer } from "../equator";
import LoanRequestActions from "../Search";
import LoanApprovalChart from "../ChartCards/Piechart";
import ProgressBarCard, {
  LoanProductProgressBarCard,
} from "../Loanperformance";
import { LoanProduct } from "./LoanProductTable.tsx";

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
  bulkAction:any
  stats: Stat[];
  chartData: ChartData[];
  barChartData: BarChartData[];
  pieChartData: PieChartData[];
  pieChartDataTwo: PieChartData[];
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
 
  laon_table_data_all: any;
  setCurrentPage: any;
  currentPage: any;
  totalPages: any;
  total_count:number
  pieChartTitleTwo:any,
  pieChartDescriptionTwo:any,
  pieChartTotalTwo:any
}

export default function LoanProducts({

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
  pieChartTitleTwo,
  pieChartDescriptionTwo,
  pieChartTotalTwo,
  pieChartDataTwo,
  lineChartTitle,
  lineChartDescription,
  lineChartTotalRevenue,
  lineChartRevenueChange,
  lineChartLineColor,
  lineChartDefaultSelectedYear,
  progressBarTitle,
  progressBarDescription,
  href,
  laon_table_data_all,
  setCurrentPage,
  currentPage,
  totalPages,
  total_count,bulkAction
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
              <LoanApprovalChart
                title={pieChartTitleTwo}
                description={pieChartDescriptionTwo}
                total={pieChartTotalTwo}
                data={pieChartDataTwo}
              />}

              rightContent={
                <LoanProductProgressBarCard
                  loanData={progressBarData}
                  title={progressBarTitle}
                  description={progressBarDescription}
                />
              
            }
          />
        </div>
        <LoanRequestActions
          onSearchClick={onSearchClick}
          onFilterClick={onFilterClick}
          onSeeAllClick={onSeeAllClick}
        />
       <LoanProduct
   
          laon_table_data_all={laon_table_data_all}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages} total_count={total_count} bulkAction={bulkAction}/>
      </div>
    </section>
  );
}
