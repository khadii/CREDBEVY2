import React, { useEffect, useState } from "react";
import { YearDropdown } from "../Yeardropdown";
import { TbCurrencyNaira } from "react-icons/tb";
import { LuSquareActivity } from "react-icons/lu";
import Card from "../Card";
import LoanApprovalChart from "../ChartCards/Piechart";
import LineChartTwo from "../ChartCards/doublelinechart";
import EqualHeightContainer from "../equator";
import Search from "../Search";
import FinancialTable from "./FinancialTable";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "@/app/lib/utillity/formatCurrency";
import { AppDispatch } from "@/app/Redux/store";
import { transactionhistory } from "@/app/Redux/Financials/TransactionHistory/TransactionHistory";
import { customer_growth_trend } from "@/app/Redux/Financials/customer_growth_trend/customer_growth_trend_thunk";
import { revenue_vs_profit_trend } from "@/app/Redux/Financials/revenue_vs_profit_trend/revenue_vs_profit_trend_thunk";
import { repayment_vs_default_trend } from "@/app/Redux/Financials/repayment_vs_default_trend/repayment_vs_default_trend_thunk";
import CardChart from "../ChartCards/DoubleBatchart";
import ErrorDisplay from "../ErrorDisplay";

// Utility functions
const safeNumber = (value: any, fallback = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

const getTimeLabel = (item: any, timePeriod: string) => {
  if (timePeriod === "This Year") {
    return item.month && item.month >= 1 && item.month <= 12
      ? new Date(2025, item.month - 1).toLocaleString('default', { month: 'short' })
      : 'Unknown Month';
  } else if (timePeriod === "This Month") {
    return typeof item.day === 'number' && item.day >= 1 && item.day <= 31
      ? item.day.toString()
      : 'Unknown Day';
  } else {
    return typeof item.day === 'string'
      ? item.day
      : 'Unknown Day';
  }
};

export default function TransactionHistory() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedYear, setSelectedYear] = useState("This Year");
  const [currentPage, setCurrentPage] = useState(1);
   const [selectedTIME, setSelectedTIME] = useState("This Year");

  // Fetch data
  useEffect(() => {
    const Year = { year: "2025" };
    dispatch(customer_growth_trend(Year));
    dispatch(revenue_vs_profit_trend(Year));
    dispatch(repayment_vs_default_trend());
    dispatch(
      transactionhistory({
        year: "2025",
        search: "",
        start_date: "",
        end_date: "",
        min_amount: "",
        max_amount: "",
        page: currentPage
      })
    );
  }, [dispatch, currentPage]);

  // Redux selectors
// Redux selectors
const {
  data: dataStat = {},
  loading: loadingStats,
  error: errorStats
} = useSelector((state: any) => state.financialStats) || {};

const {
  data: dataRD = {},
  loading: loadingRepayment,
  error: errorRepayment
} = useSelector((state: any) => state.repaymentVsDefaultTrend) || {};

const {
  data: dataTP = {},
  loading: loadingRevenue,
  error: errorRevenue
} = useSelector((state: any) => state.revenueVsProfitTrend) || {};

const {
  data: dataTra,
  loading: loadingTransaction,
  error: errorTransaction
} = useSelector((state: any) => state.Transaction) || {};


  const generateDefaultTimePeriods = (timePeriod: string) => {
  if (timePeriod === "This Year") {
    // Generate all months of the year
    return Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2025, i).toLocaleString('default', { month: 'short' }),
      firstValue: 0,
      secondValue: 0
    }));
  } else if (timePeriod === "This Month") {
    // Generate all days of current month (using 31 as max for simplicity)
    const daysInMonth = new Date(2025, new Date().getMonth() + 1, 0).getDate();
    return Array.from({ length: daysInMonth }, (_, i) => ({
      month: (i + 1).toString(),
      firstValue: 0,
      secondValue: 0
    }));
  } else {
    // Generate days of week
    return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
      month: day,
      firstValue: 0,
      secondValue: 0
    }));
  }
};

// Update the transformRepaymentDefaultData function
const transformRepaymentDefaultData = () => {
  const timeData = dataRD?.data || {
    yearly: [],
    monthly: [],
    weekly: []
  };

  const generateData = (dataArray: any[]) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return generateDefaultTimePeriods(selectedTIME);
    }
    
    return dataArray.map((item: any) => ({
      month: getTimeLabel(item, selectedTIME),
      firstValue: safeNumber(item?.repayments),
      secondValue: safeNumber(item?.defaults)
    }));
  };

  if (selectedTIME === "This Year") {
    return generateData(timeData.yearly);
  } else if (selectedTIME === "This Month") {
    return generateData(timeData.monthly);
  } else {
    return generateData(timeData.weekly);
  }
};


  const transformRevenueProfitData = () => {
    const revenueData = dataTP?.data || {
      by_year: [],
      by_month: [],
      by_week: []
    };

    const generateData = (dataArray: any[]) => {
      if (!Array.isArray(dataArray)) return [];
      
      return dataArray.map((item: any) => ({
        name: getTimeLabel(item, selectedTIME),
        firstDataset: safeNumber(item?.revenue),
        secondDataset: safeNumber(item?.profit)
      }));
    };

    if (selectedTIME === "This Year") {
      return generateData(revenueData.by_year);
    } else if (selectedTIME === "This Month") {
      return generateData(revenueData.by_month);
    } else {
      return generateData(revenueData.by_week);
    }
  };

  // Chart data
  const repaymentDefaultData = [
    { color: "#156064", value: safeNumber(dataStat?.loanStats?.loanDefaultRate?.defaulted_percentage), name: "Default" },
    { color: "#EC7910", value: safeNumber(dataStat?.loanStats?.loanDefaultRate?.non_defaulted_percentage, 100), name: "No Default" }
  ];

    const repaymentDefaultDatas = [
    { color: "#156064", value: safeNumber(dataStat?.loanStats?.loanDefaultRate?.defaulted_percentage), name: "Repayment" },
    { color: "#EC7910", value: safeNumber(dataStat?.loanStats?.loanDefaultRate?.non_defaulted_percentage, 100), name: "Default Trends" }
  ];

  const repaymentDefaultLineData = transformRepaymentDefaultData();
  const revenueProfitData = transformRevenueProfitData();

  // Stats data
  const stats = [
    {
      title: "Total Transaction Volume",
      amount: dataStat?.transactionStats?.currentPeriod?.totalTransactionVolume ?? "N/A",
      percentage: dataStat?.transactionStats?.percentageChanges?.transactionVolumePercentageChange ?? "N/A",
      icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Transaction Processed",
      amount: dataStat?.transactionStats?.currentPeriod?.totalTransactionsProcessed ?? "N/A",
      percentage: dataStat?.transactionStats?.percentageChanges?.transactionsProcessedPercentageChange ?? "N/A",
      icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Revenue Generated",
      amount: dataStat?.transactionStats?.currentPeriod?.totalRevenue != null
        ? formatCurrency(dataStat.transactionStats.currentPeriod.totalRevenue)
        : "N/A",
      percentage: dataStat?.transactionStats?.percentageChanges?.totalRevenuePercentageChange ?? "N/A",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
  ];

  const statsTwo = [
    {
      title: "Total Income",
      amount: dataStat?.transactionStats?.currentPeriod?.totalDeposits != null
        ? formatCurrency(dataStat.transactionStats.currentPeriod.totalDeposits)
        : "N/A",
      percentage: dataStat?.transactionStats?.percentageChanges?.depositsPercentageChange ?? "N/A",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Expenses",
      amount: dataStat?.transactionStats?.currentPeriod?.totalWithdrawals != null
        ? formatCurrency(dataStat.transactionStats.currentPeriod.totalWithdrawals)
        : "N/A",
      percentage: dataStat?.transactionStats?.percentageChanges?.withdrawalsPercentageChange ?? "N/A",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Net Revenue",
      amount: dataStat?.transactionStats?.currentPeriod?.netRevenue != null
        ? formatCurrency(dataStat.transactionStats.currentPeriod.netRevenue)
        : "N/A",
      percentage: dataStat?.transactionStats?.percentageChanges?.netProfitPercentageChange ?? "N/A",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
  ];

  return (
      <>
    {errorStats || errorRepayment || errorRevenue || errorTransaction? <ErrorDisplay error={errorStats || errorRepayment || errorRevenue || errorTransaction}/> : (
      <div>
    <div className="pb-[115px]">
      <YearDropdown
        years={[2023, 2024]}
        selectedYear={2024}
        setSelectedYear={(year: any) => console.log(year)}
        withdrawal={2}
        onOptionalButtonClick={() => alert("Button clicked!")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {statsTwo.map((stat, index) => (
          <Card
            key={index}
            title={stat.title}
            amount={stat.amount}
            percentage={stat.percentage}
            icon={stat.icon}
          />
        ))}
      </div>

      {/* Revenue vs Profit Trend */}
      <div className="mb-6">
        <CardChart
          title="Revenue VS Profit Trend"
          description="Trend comparing Revenue and profit"
          totalAmount={formatCurrency(
            revenueProfitData.reduce((sum, item) => sum + item.firstDataset + item.secondDataset, 0)
          )}
          comparisonData={revenueProfitData.length > 0 ? revenueProfitData : [{ name: 'No Data', firstDataset: 0, secondDataset: 0 }]}
          firstDatasetName="Revenue"
          secondDatasetName="Profit"
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          data={[
            { color: "#156064", value: 60, name: "Revenue" },
            { color: "#EC7910", value: 40, name: "Profit" }
          ]}
        />
      </div>

      {/* Repayment vs Default Trends */}
      <div className="mb-[24px]">
        <EqualHeightContainer
          leftContent={

            <LineChartTwo
              selectedYear={selectedTIME}
              setSelectedYear={setSelectedTIME}
              firstDatasetName="Repayment"
            secondDatasetName="Trends"
              title="Repayment VS Default Trends"
              description="Trend showing repayment vs default"
              totalAmount={formatCurrency(
                repaymentDefaultLineData.reduce((sum, item) => sum + item.firstValue + item.secondValue, 0)
              )}
              data={repaymentDefaultDatas}
              lineData={ repaymentDefaultLineData }
             
              
             
            />
          }
          rightContent={
            <LoanApprovalChart
              title="Loan Default Rate"
              description="Total unpaid loan metrics"
              total={safeNumber(dataStat?.loanStats?.loanDefaultRate?.total_defaulted_loans)}
              data={repaymentDefaultData}
            />
          }
        />
      </div>

      {/* Search and Table */}
      <Search />
      {dataTra && (
        <FinancialTable
          laon_table_data_all={dataTra.result?.data || []}
          currentPage={currentPage}
          totalPages={dataTra.result?.last_page || 1}
          setCurrentPage={setCurrentPage}
          titleProps={{
            title: "Transaction History",
            description: "All financial transactions recorded",
            count: `${dataTra.count || 0} transactions`,
          }}
          bulkAction={{
            label: "Bulk Action",
            options: ["Export", "Print", "Archive"],
            onSelect: (option: string) => console.log(option),
          }}
        />
      )}
    </div>
      </div>
    )}
  </>
   
  );
}