"use client";
import React, { useEffect, useState, useMemo } from "react"; // Import useMemo
import Search from "@/app/components/Search";
import { LoanRequestHeaderWithTabs } from "@/app/dashboard/loan-request/ReuseableHeader";
import Card from "../Card";
import { LuSquareActivity } from "react-icons/lu";

import { YearDropdown } from "../Yeardropdown";
import { CustomerLoanData, HistoryTable } from "./LoanHistoryTable";
import LoanApprovalChart from "../ChartCards/Piechart";
import BarChartCard from "../Revenuechart";
import EqualHeightContainer from "../equator";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { LoanHistory_stats } from "@/app/Redux/LoanHistory/LoanHistory_stat";
import { formatCurrency } from "@/app/lib/utillity/formatCurrency";
import { fetchLoanRequests } from "@/app/Redux/LoanHistory/loanRequests_thunk";
import { formatDate } from "@/app/lib/formatdate";
import { fetchLoanDefaultRate } from "@/app/Redux/LoanHistory/loanDefaultRate";
import { Financial_stats } from "@/app/Redux/Financials/stat/stat_thunk";
import { revenue_vs_profit_trend } from "@/app/Redux/Financials/revenue_vs_profit_trend/revenue_vs_profit_trend_thunk";
import { TbCurrencyNaira } from "react-icons/tb";
import AnimatedLoader from "../animation";

// Utility function to safely convert to number (copy from Trends.tsx)
const safeNumber = (value: any, fallback = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

// Updated helper function to get time period labels (copy from Trends.tsx)
const getTimeLabel = (item: any, timePeriod: string) => {
  if (timePeriod === "This Year") {
    // For yearly data, use the month name (e.g., Jan, Feb)
    return item.month && item.month >= 1 && item.month <= 12
      ? new Date(2025, item.month - 1).toLocaleString('default', { month: 'short' })
      : 'Unknown Month';

  } else if (timePeriod === "This Month") {
  
    return typeof item.day === 'number' && item.day >= 1 && item.day <= 31
      ? item.day.toString()
      : 'Unknown Day';

  } else {
    // For weekly data, return day name (e.g., Mon, Tue)
    return typeof item.day === 'string'
      ? item.day
      : 'Unknown Day';
  }
};

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state.loanHistoryStats
  );

  // Selector for revenue_vs_profit_trend data
  const { data: revenueProfitData = {} } = useSelector((state: any) => state.revenueVsProfitTrend) || {};

  useEffect(() => {
    dispatch(revenue_vs_profit_trend({ year: "2025" }));
  }, [dispatch]);

  const {
    data: lhrdata,
    loading: lhrloading,
    error: lhrerror,
    pagination,
    totalCount
  } = useSelector((state: RootState) => state.loanHistoryRequestsSlice);
  const {
    loading: loadinStat,
    error: errorStat,
    data: dataStat,
  } = useSelector((state: any) => state.financialStats);
  const [activeTab, setActiveTab] = useState<string>("All Loans");
  const [selectedYear, setSelectedYear] = useState("2025"); 
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(1);
  const [bulkAction] = useState<null | string>(null);

  const years = ["2022", "2023", "2024", "2025", "2026"];

  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  const handleSeeAllClick = () => {
    console.log("See all clicked");
  };
  const Year = {
    year: "2025",
  };
  useEffect(() => {
    dispatch(LoanHistory_stats({ year: selectedYear }));
    dispatch(fetchLoanRequests({ page: 1}));
    dispatch(fetchLoanDefaultRate());
    dispatch(Financial_stats(Year));
  }, [dispatch, selectedYear, activeTab]);

  const handlePageChange = (page: number) => {
    dispatch(fetchLoanRequests({ page}));
  };


const transformedLoanData: CustomerLoanData[] = (lhrdata ?? []).map(
  (item: any, index: number) => ({
    id: (index + 1).toString(),
    uuid: item.loan_uuid,
    name: `${item.first_name ?? "N/A"} ${item.last_name ?? ""}`,
    email: item.email || "N/A",
    Amount_Requested: item?.amount_requested ? formatCurrency(item.amount_requested) : "N/A",
    credit_score: item.credit_score || "N/A",
    date_time: item.date_and_time ? formatDate(item.date_and_time) : "N/A",
    status: mapRepaymentStatus(item.repayment_status),
    image: item.image ? `data:image/jpeg;base64,${item.image}` : undefined,
  })
);

// Filter loans based on tab, default to all
const filteredLoanData = activeTab === "All Loans"
  ? transformedLoanData
  : transformedLoanData.filter((loan) => loan.status === activeTab);

// Count active loans safely
const activeCount = transformedLoanData.filter((loan) => loan.status === "Active");


  const tabs = [
    { name: "All Loans" },
    { name: "Active", count: activeCount?.length },
    { name: "Repaid" },
    { name: "Overdue" },
  ];
  const datas = [
    {
      color: "#156064",
      value: dataStat?.loanStats?.loanDefaultRate?.defaulted_percentage,

      name: "Defualt",
    },
    {
      color: "#EC7910",
      value: dataStat?.loanStats?.loanDefaultRate?.non_defaulted_percentage,
      name: "No Defualt",
    },
  ];
  const stats = [
    {
      title: "Total Revenue Generated",
        amount:
          dataStat?.loanStats.totalRevenueGenerated != null
            ? formatCurrency(dataStat?.loanStats.totalRevenueGenerated)
            : "N/A",
      percentage: dataStat?.loanStats.totalRevenueGeneratedPercentage ?? "N/A",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Amount Disbursed",
      amount:
        dataStat?.totalRevenue != null
          ? formatCurrency(dataStat?.loanStats.totalAmountDisbursed)
          : "N/A",
      percentage: dataStat?.loanStats.totalAmountDisbursedPercentage ?? "N/A",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Loan Product",
      amount:dataStat?.loanStats.totalLoanProducts ?? "N/A",
      percentage: dataStat?.loanStats.totalLoanProductPercentage ?? "N/A",
      icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
    },
  ];

  const {
    pieChartData,
    loading: pieChartLoading,
    error: pieChartError,
    totalLoans,
  } = useSelector((state: RootState) => state.historyloanDefaultRate);

  // --- Start of changes for BarChartCard data ---
  const formattedRevenueData = useMemo(() => {
    const revenueTrend = revenueProfitData?.data || {
      by_year: [],
      by_month: [],
      by_week: []
    };

    let dataArray: any[] = [];
    if (selectedYear === "2025" && Array.isArray(revenueTrend.by_year)) { 
      dataArray = revenueTrend.by_year;
    } else if (selectedYear === "This Month" && Array.isArray(revenueTrend.by_month)) {
      dataArray = revenueTrend.by_month;
    } else if (Array.isArray(revenueTrend.by_week)) {
      dataArray = revenueTrend.by_week;
    }

    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return [];
    }

    return dataArray.map((item: any) => ({
      name: getTimeLabel(item, selectedYear === "2025" ? "This Year" : selectedYear),
      revenue: safeNumber(item?.revenue),
    }));
  }, [revenueProfitData, selectedYear]);

  const totalRevenueAmount = useMemo(() => {
    const revenueTrend = revenueProfitData?.data || {
      by_year: [],
      by_month: [],
      by_week: []
    };

    let total = 0;
    const sumReducer = (sum: number, item: any) => {
      if (!item || typeof item !== 'object') return sum;
      return sum + safeNumber(item.revenue);
    };

    if (selectedYear === "2025" && Array.isArray(revenueTrend.by_year)) {
      total = revenueTrend.by_year.reduce(sumReducer, 0);
    } else if (selectedYear === "This Month" && Array.isArray(revenueTrend.by_month)) {
      total = revenueTrend.by_month.reduce(sumReducer, 0);
    } else if (Array.isArray(revenueTrend.by_week)) {
      total = revenueTrend.by_week.reduce(sumReducer, 0);
    }
    return formatCurrency(total);
  }, [revenueProfitData, selectedYear]);


if(lhrloading){
  return (       <AnimatedLoader isLoading={loading||lhrloading}></AnimatedLoader>)
}
  return (
    <div className="w-full min-h-screen space-y-6">
      <LoanRequestHeaderWithTabs
        title="Loan History"
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {activeTab === "All Loans" ? (
        <>
          <YearDropdown
            years={years}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
          />

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

          <EqualHeightContainer
            leftContent={
              <BarChartCard
                title="Overall Profitability"
                description="Total Interest + Total Principal Earned"
                totalAmount={totalRevenueAmount}
                data={formattedRevenueData.length > 0 ? formattedRevenueData : [{ name: 'No Data', revenue: 0 }]}
                highlightBar="Jun" 
                highlightColor="#EC7910"
                barSize={11}
                showValuesOnTop={true}
                tooltip={true}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
              />
            }
            rightContent={
              <LoanApprovalChart
                title="Default Rate"
                description="Total unpaid loan metrics."
                total={
                  dataStat?.loanStats.loanDefaultRate?.total_defaulted_loans ??
                  "N/A"
                }
                data={datas || []}
              />
            }
          />

          <Search
            // onFilterClick={handleFilterClick}
            // onSeeAllClick={handleSeeAllClick}
          />
        </>
      ) : null}

      <HistoryTable
        loan_table_data_all={filteredLoanData}
        currentPage={pagination?.currentPage || 1}
        setCurrentPage={handlePageChange}
        totalPages={pagination?.totalPages || 1}
        total_count={totalCount}
        bulkAction={bulkAction}
      />

  
    </div>


  );
}

// Sample Data and helper function remain the same...
function mapRepaymentStatus(status: string): "Active" | "Repaid" | "Overdue" {
  switch (status) {
    case "no_schedule":
    case "in_progress":
      return "Active";
    case "completed":
    case "repaid": // Added 'repaid' as it's a common status string
      return "Repaid";
    case "overdue":
      return "Overdue";
    default:
      return "Active";
  }
}