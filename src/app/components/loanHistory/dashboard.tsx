"use client";
import React, { useEffect, useState } from "react";
import Search from "@/app/components/Search";
import { LoanRequestHeaderWithTabs } from "@/app/dashboard/loan-request/ReuseableHeader";
import Card from "../Card";
import { LuSquareActivity } from "react-icons/lu";
import { TbCurrencyNaira } from "react-icons/tb";
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

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: RootState) => state.loanHistoryStats);

  const { 
    data: lhrdata, 
    loading: lhrloading, 
    error: lhrerror,
    pagination 
  } = useSelector((state: RootState) => state.loanHistoryRequestsSlice);

  const [activeTab, setActiveTab] = useState<string>("All Loans");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(1);
  // const [totalCount] = useState<number>(loan_table_data_all.length);
  const [bulkAction] = useState<null | string>(null); 

  const years = ["2022", "2023", "2024", "2025", "2026"];

  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  const handleSeeAllClick = () => {
    console.log("See all clicked");
  };

  useEffect(() => {
    dispatch(LoanHistory_stats({ year: selectedYear }));
    dispatch(fetchLoanRequests({ page: 1, year: selectedYear }));
    dispatch(fetchLoanDefaultRate());
  }, [dispatch, selectedYear, activeTab]);

  const handlePageChange = (page: number) => {
    dispatch(fetchLoanRequests({ page, year: selectedYear }));
  };

  const transformedLoanData: CustomerLoanData[] = lhrdata?.map((item: any, index: number) => ({
    id: (index + 1).toString(),
    uuid: item.loan_uuid,
    name: `${item.first_name} ${item.last_name}`,
    email: item.email || "N/A", 
    Amount_Requested: formatCurrency(item?.amount_requested) || "N/A", 
    credit_score: item.credit_score || "N/A",
    date_time: formatDate(item.date_and_time),
    status: mapRepaymentStatus(item.repayment_status),
    image: item.image ? `data:image/jpeg;base64,${item.image}` : undefined,
  }));

  const filteredLoanData = activeTab === "All Loans"
    ? transformedLoanData
    : transformedLoanData.filter((loan) => loan.status === activeTab);

  const activeCount = transformedLoanData?.filter((loan) => loan.status === 'Active');

  const tabs = [
    { name: "All Loans" },
    { name: "Active", count: activeCount.length },
    { name: "Repaid" },
    { name: "Overdue" },
  ];

  const stats = [
    {
      title: "Total Revenue Generated",
      amount: data?.totalRevenueGenerated != null
        ? formatCurrency(data.totalRevenueGenerated)
        : "N/A",
      percentage: data?.totalRevenueGeneratedPercentage ?? "N/A",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Amount Disbursed",
      amount: data?.totalAmountDisbursed != null
        ? formatCurrency(data.totalAmountDisbursed)
        : "N/A",
      percentage: data?.totalAmountDisbursedPercentage ?? "N/A",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Loan Product",
      amount: data?.totalLoanProducts ?? "N/A",
      percentage: data?.totalLoanProductPercentage ?? "N/A",
      icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
    },
  ];

  const { 
    pieChartData, 
    loading: pieChartLoading, 
    error: pieChartError,
    totalLoans
  } = useSelector((state: RootState) => state.historyloanDefaultRate);

  return (
    <div className="w-full min-h-screen p-4 space-y-6">
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
                totalAmount="₦20,000,000.00"
                data={[
                  { name: "Jan", revenue: 100000000 },
                  { name: "Feb", revenue: 80000000 },
                  // ... other months
                ].map(item => ({
                  ...item,
                  revenue: item.revenue ? Number((item.revenue / 1).toFixed(2)) : 0
                }))}
                highlightBar="Jun"
                highlightColor="#EC7910"
                barSize={11}
                showValuesOnTop={true}
                tooltip={true}
                selectedYear="This Year"
                setSelectedYear={() => {}}
              />
            }
            rightContent={
              <LoanApprovalChart
                title="Default Rate"
                description="Total unpaid loan metrics."
                total={totalLoans ? totalLoans : "N/A"}
                data={pieChartData || []}
              />
            }
          />

          <Search
            onFilterClick={handleFilterClick}
            onSeeAllClick={handleSeeAllClick}
          />
        </>
      ) : null}

      <HistoryTable
        loan_table_data_all={filteredLoanData}
        currentPage={pagination?.currentPage || 1}
        setCurrentPage={handlePageChange}
        totalPages={pagination?.totalPages || 1}
        total_count={filteredLoanData.length}
        bulkAction={bulkAction}
      />
    </div>
  );
}

// Sample Data and helper function remain the same...
function mapRepaymentStatus(status: string): 'Active' | 'Repaid' | 'Overdue' {
  switch (status) {
    case 'no_schedule':
    case 'in_progress':
      return 'Active';
    case 'completed':
      return 'Repaid';
    case 'overdue':
      return 'Overdue';
    default:
      return 'Active';
  }
}
