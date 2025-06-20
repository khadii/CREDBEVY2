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

  const tabs = [
    { name: "All Loans" },
    { name: "Active", count: 5 },
    { name: "Repaid" },
    { name: "Overdue" },
  ];

  const [activeTab, setActiveTab] = useState<string>("All Loans");
  const [selectedYear, setSelectedYear] = useState("2025");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages] = useState<number>(1);
  const [totalCount] = useState<number>(loan_table_data_all.length);
  const [bulkAction] = useState<null | string>(null); 

  const years = ["2022", "2023", "2024", "2025", "2026"];

  const handleFilterClick = () => {
    console.log("Filter clicked");
  };

  const handleSeeAllClick = () => {
    console.log("See all clicked");
  };
 useEffect(() => {
    // Fetch stats data
    dispatch(LoanHistory_stats({ year: selectedYear }));
    
    // Fetch loan requests data
    dispatch(fetchLoanRequests({ 
      page: 1, // Start with first page
      year: selectedYear,
    }));

     dispatch(fetchLoanDefaultRate());
  }, [dispatch, selectedYear, activeTab]);


  const handlePageChange = (page: number) => {
    dispatch(fetchLoanRequests({ 
      page,
      year: selectedYear,
      
    }));
  };


const transformedLoanData: CustomerLoanData[] = lhrdata?.map((item: any, index: number) => ({
  id: (index + 1).toString(),
  uuid: item.loan_uuid,
  name: `${item.first_name} ${item.last_name}`,
  email: item.email || "N/A", // or fetch from user if available
  Amount_Requested: formatCurrency(item?.amount_requested )|| "N/A", // or fetch from user if available
  credit_score: item.credit_score || "N/A",
  date_time: formatDate(item.date_and_time), // format as needed
  status: mapRepaymentStatus(item.repayment_status),
  image: item.image ? `data:image/jpeg;base64,${item.image}` : undefined,
}));


const filteredLoanData = activeTab === "All Loans"
  ? transformedLoanData
  : transformedLoanData.filter((loan) => loan.status === activeTab);


  
const stats = [

    {
    title: "Total Revenue Generated",
    amount: formatCurrency(data?.totalRevenueGenerated!)?? "N/A",
    percentage: data?.totalRevenueGeneratedPercentage ?? "N/A",
    icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
  },
  
    {
    title: "Total Amount Disbursed",
    amount: formatCurrency(data?.totalAmountDisbursed!)?? "N/A",
    percentage: data?.totalAmountDisbursedPercentage ?? "N/A",
    icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
  },
    {
    title: "Total Loan Pfoduct",
    amount: data?.totalLoanProducts ?? "N/A",
    percentage: data?.totalLoanProductPercentage ?? "N/A",
    icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
  },
];
const barChartTitle = "Overall Profitability";
const barChartDescription = "Total Interest + Total Principal Earned";
const barChartTotalAmount = "₦20,000,000.00";
const barChartHighlightBar = "Jun"; 
const barChartHighlightColor = "#EC7910"; 

const barChartData = [
  { name: "Jan", revenue: 100000000 },
  { name: "Feb", revenue: 80000000 },
  { name: "Mar", revenue: 120000000 },
  { name: "Apr", revenue: 90000000 },
  { name: "May", revenue: 150000000 },
  { name: "Jun", revenue: 200000000 },
  { name: "Jul", revenue: 0 },
  { name: "Aug", revenue: 0 },
  { name: "Sep", revenue: 0 },
  { name: "Oct", revenue: 0 },
  { name: "Nov", revenue: 0 },
  { name: "Dec", revenue: 0 },
].map(item => ({
  ...item,
  revenue: item.revenue ? Number((item.revenue / 1).toFixed(2)) : 0
}));

// Mock data for the LoanApprovalChart (right side)
const pieChartTitle = "Default Rate";
const pieChartDescription = "Total unpaid loan metrics.";
const pieChartTotal = "30,000"; // Total loan requests


// State management for year selection
const barChartDefaultSelectedYear = "This Year";
const [selectedPeriod, setSelectedPriod] = useState(barChartDefaultSelectedYear);
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
                title={barChartTitle}
                description={barChartDescription}
                totalAmount={barChartTotalAmount}
                data={barChartData}
                highlightBar={barChartHighlightBar}
                highlightColor={barChartHighlightColor}
                barSize={11}
                showValuesOnTop={true}
                tooltip={true}
                selectedYear={selectedPeriod}
                setSelectedYear={setSelectedPriod}
              />
            }
            rightContent={
              <LoanApprovalChart
  title="Default Rate"
  description="Total unpaid loan metrics."
  total={totalLoans ?
    totalLoans: "N/A"}
  data={pieChartData || []}
/>

            }
          />
   
      <Search
        onFilterClick={handleFilterClick}
        onSeeAllClick={handleSeeAllClick}
      />

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

// Sample Data (move this into a data file or mock if needed)
const loan_table_data_all: CustomerLoanData[] = [
  {
    id: "1",
    uuid: "uuid-1",
    name: "Oripeoloye Timilehin",
    email: "Timilehinoripeoloye@gmail.com",
    Amount_Requested: "N/A",
    credit_score: "743",
    date_time: "9/4/2023, 09:31 AM",
    status: "Active",
    image: "/path/to/avatar1.png",
  },
  {
    id: "2",
    uuid: "uuid-2",
    name: "Oripeoloye Timilehin",
    email: "Timilehinoripeoloye@gmail.com",
    Amount_Requested: "N/A",
    credit_score: "743",
    date_time: "9/4/2023, 09:31 AM",
    status: "Repaid",
    image: "/path/to/avatar1.png",
  },
  {
    id: "3",
    uuid: "uuid-3",
    name: "Oripeoloye Timilehin",
    email: "Timilehinoripeoloye@gmail.com",
    Amount_Requested: "N/A",
    credit_score: "743",
    date_time: "9/4/2023, 09:31 AM",
    status: "Overdue",
    image: "/path/to/avatar1.png",
  },
  {
    id: "4",
    uuid: "uuid-4",
    name: "Oripeoloye Timilehin",
    email: "Timilehinoripeoloye@gmail.com",
    Amount_Requested: "N/A",
    credit_score: "743",
    date_time: "9/4/2023, 09:31 AM",
    status: "Active",
    image: "/path/to/avatar1.png",
  },
  {
    id: "5",
    uuid: "uuid-5",
    name: "Oripeoloye Timilehin",
    email: "Timilehinoripeoloye@gmail.com",
    Amount_Requested: "N/A",
    credit_score: "743",
    date_time: "9/4/2023, 09:31 AM",
    status: "Repaid",
    image: "/path/to/avatar1.png",
  },
];
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
