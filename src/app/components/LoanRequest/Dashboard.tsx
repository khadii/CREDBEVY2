// src/app/pages/loan-request/page.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import Layout from "@/app/components/Layout/Layout";

import { TbCurrencyNaira } from "react-icons/tb";
import { LuSquareActivity } from "react-icons/lu";
import PendingRequest from "@/app/components/LoanRequest/PendingRequest";
import ApprovedRequests from "@/app/components/LoanRequest/requestApproval";
import CanceledRequests from "@/app/components/LoanRequest/CanceledRequests";
import AllRequest from "@/app/components/LoanRequest/AllRequest";

import { AppDispatch, RootState } from "@/app/Redux/store";
import {
  _loan_request_trend,
  all_loan_requests,
  loan_request_stat,
} from "@/app/Redux/Loan_request/loan_request_thunk";
import toast from "react-hot-toast";
import SpinningFaceExact from "../credbevyLoader";
import { loan_approval_rates } from "@/app/Redux/dashboard/dashboardThunk";
import { HeaderWithTabs } from "../HeadersTab";
import { useDashboard } from "@/app/Context/DahboardContext";
import { useDispatch, useSelector } from "react-redux";
import { formatToNaira } from "@/app/lib/Naira";
import AnimatedLoader from "../animation";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    authPin,
    setAuhPin,
    selectedIds,
    // tabs,
    pendingRequestCount,
    setPendingRequestCount,
    activeTab,
    setActiveTab,
    refreshData,
    filters,
    filtersPending,
    filtersApproved,
    currentPage,
    setCurrentPage,
    currentPageapproved, 
    setcurrentPageapproved
  } = useDashboard();
  // Fetch data on component mount
  const [selectedYear, setSelectedYear] = useState("2025");
  const [selectedPeriod, setSelectedPriod] = useState("This Year");
  const years = ["2022", "2023", "2024", "2025", "2026"];
 const router = useRouter();
  // const Year = {
  //   year: "",
  //   month: "",
  //   week: "",
  // };
  const Period = {
    year: selectedPeriod,
  };
  useEffect(() => {
    dispatch(loan_request_stat({year:selectedYear}));
  }, [dispatch, selectedYear]);

  useEffect(() => {
    dispatch(_loan_request_trend(Period));
  }, [dispatch, Period.year]);

  const {
    loading: LoanRequestAll_loading,
    success: LoanRequestAll_Success,
    error: LoanRequestAll_SuccessError,
    data: LoanRequestAll_Data,
    total_count: total_count_all_loan_data,
  } = useSelector((state: RootState) => state.loanRequest.LoanRequestAll);
  useEffect(() => {
      if (LoanRequestAll_SuccessError==='Unauthorized') {
        router.push("/")
      }
    }, [LoanRequestAll_SuccessError, router])
  // useEffect(() => {
  //   const fetchPendingCount = async () => {
  //     try {
  //       const result = await dispatch(
  //         all_loan_requests(filtersPending)
  //       ).unwrap();

  //       setPendingRequestCount(result?.data?.total_count);
  //     } catch (error) {
  //       console.error("Failed to fetch pending count:", error);
  //     }
  //   };

  //   fetchPendingCount();
  // }, [dispatch,]);

  useEffect(() => {
    refreshData();
  }, [activeTab, dispatch, filters, filtersApproved.page, filtersPending.page]);

  useEffect(() => {
    dispatch(loan_approval_rates());
  }, [dispatch]);



  const {
    loading: LoanRequestStat_loading,
    success: LoanRequestStat_success,
    error: LoanRequestStat_error,
    data: LoanRequestStat_data,
  } = useSelector((state: RootState) => state.loanRequest.LoanRequestStat);
  const {
    loading: loan_request_trend_loading,
    success: loan_request_trend_success,
    error: loan_request_trend_error,
    data: loan_request_trend_data,
  } = useSelector((state: RootState) => state.loanRequest.loan_request_trend);

  const tabs = [
    { name: "All Request" },
    { name: "Pending Request", count: LoanRequestStat_data?.loanApprovalRate.total_pending_loans },
    { name: "Approved Requests" },
    { name: "Canceled Requests" },
  ];


  useEffect(() => {
    if (LoanRequestAll_SuccessError) {
      toast.error(LoanRequestAll_SuccessError || "Network request failed!");
    }
  });

  useEffect(() => {
    if (LoanRequestStat_error) {
      toast.error(LoanRequestStat_error || "Network request failed!");
    }
  });

  useEffect(() => {
    if (loan_request_trend_error) {
      toast.error(loan_request_trend_error || "Network request failed!");
    }
  }, [loan_request_trend_error]);

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const handleSearchClick = () => {
    console.log("Search button clicked");
  };

  const handleFilterClick = () => {
    console.log("Filter button clicked");
  };

  const handleSeeAllClick = () => {
    console.log("See All link clicked");
  };

  const handleFundWallet = () => {
    alert("Redirecting to funding page...");
  };

  const stats = [
    {
      title: "Total Loan Request",
      amount: LoanRequestStat_data?.totalLoanRequests.toLocaleString(),
      percentage: LoanRequestStat_data?.totalLoanRequestPercentage,
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Amount Requested",
      amount: formatToNaira(LoanRequestStat_data?.totalAmountRequested),
      percentage: LoanRequestStat_data?.totalAmountRequestedPercentage,
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Amount Disbursed",
      amount:formatToNaira( LoanRequestStat_data?.totalAmountDisbursed),
      percentage: LoanRequestStat_data?.totalAmountDisbursedPercentage,
      icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
    },
  ];

  const chartData = [
    { month: "January", value: 16 },
    { month: "February", value: 12 },
    { month: "March", value: 10 },
    { month: "April", value: 8 },
    { month: "May", value: 6 },
    { month: "June", value: 4 },
    { month: "July", value: 2 },
    { month: "August", value: 16 },
    { month: "September", value: 12 },
    { month: "October", value: 10 },
    { month: "November", value: 8 },
    { month: "December", value: 6 },
  ];

  const progressBarData = [
    { label: "Product A", value: 50000, maxValue: 100000 },
    { label: "Product B", value: 75000, maxValue: 100000 },
    { label: "Product C", value: 90000, maxValue: 100000 },
    { label: "Product D", value: 30000, maxValue: 100000 },
  ];

  const tableHeaders: string[] = [
    "Name",
    "Average Income",
    "Amount Requested",
    "C.S",
    "I.R",
    "Duration",
    "Quick Actions",
  ];

  const tableTitleProps = {
    mainTitle: "Pending Loan request",
    requestCount: "200 requests",
    subtitle: "Loans awaiting a decision",
  };

  function transformData(data: any, period: string) {
    let transformedData: { name: string; revenue: number }[] = [];
  
    const formatAmount = (amountStr: string): number => {
      if (!amountStr || typeof amountStr !== "string") {
        return 0;
      }
  
      const numericValue = parseFloat(amountStr.replace(/,/g, ""));
      if (isNaN(numericValue)) {
        return 0;
      }
  
      // Convert to millions and round to 2 decimal places
      const valueInMillions = numericValue 
      return parseFloat(valueInMillions.toFixed(2));
    };
  
    if (!data) return transformedData;
  
    if (period === "This Year" && data.loan_requests_by_year) {
      transformedData = Object.keys(data.loan_requests_by_year).map((key) => ({
        name: key,
        revenue: formatAmount(data.loan_requests_by_year[key].total_amount),
      }));
    } else if (period === "This Month" && data.loan_requests_by_month) {
      transformedData = Object.keys(data.loan_requests_by_month).map((key) => ({
        name: `${key}`,
        revenue: formatAmount(data.loan_requests_by_month[key].total_amount),
      }));
    } else if (period === "This Week" && data.loan_requests_by_week) {
      transformedData = Object.keys(data.loan_requests_by_week).map((key) => ({
        name: key,
        revenue: formatAmount(data.loan_requests_by_week[key].total_amount),
      }));
    }
  
    return transformedData;
  }
  const barChartData = transformData(loan_request_trend_data, selectedPeriod);

  const {
    total_loans,
    loan_approval_rate,
    loan_disapproval_rate,
    loan_pending_rate,
    loading,
    error,
  } = useSelector((state: any) => state.wallet);
  const pieChartData = [
    { name: "Approved", value: loan_approval_rate ?? 0, color: "#156064" },
    { name: "Unapproved", value: loan_pending_rate ?? 0, color: "#EC7910" },
    { name: "Declined", value: loan_disapproval_rate, color: "#FA4D56" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "All Request":
        return (
          <AllRequest
            tabs={tabs}
            years={years}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            stats={stats}
            chartData={chartData}
            barChartData={barChartData}
            pieChartData={pieChartData}
            progressBarData={progressBarData}
            requests={LoanRequestAll_Data?.loan_requests?.data}
            tableHeaders={tableHeaders}
            tableTitleProps={tableTitleProps}
            handleSearchClick={handleSearchClick}
            handleFilterClick={handleFilterClick}
            handleSeeAllClick={handleSeeAllClick}
            handleFundWallet={handleFundWallet}
            handleYearChange={handleYearChange}
            setSelectedYear={setSelectedPriod}
            selectedYear={selectedPeriod}
            total_count={total_count_all_loan_data}
            bulkAction={undefined}
            barChartTotalAmount={
              loan_request_trend_data?.total_requested_amount
            }
            pieChartTotal={total_loans}
          />
        );
      case "Pending Request":
        return (
          <PendingRequest
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            requests={LoanRequestAll_Data?.loan_requests.data}
            tableTitleProps={tableTitleProps}
            handleSearchClick={handleSearchClick}
            handleFilterClick={handleFilterClick}
            handleSeeAllClick={handleSeeAllClick}
            bulkAction={undefined}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            totalPages={LoanRequestAll_Data?.loan_requests?.last_page}
            total_count={total_count_all_loan_data}
          />
        );
      case "Approved Requests":
        return (
          <ApprovedRequests
            tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleSearchClick={handleSearchClick}
            handleFilterClick={handleFilterClick}
            handleSeeAllClick={handleSeeAllClick}
            laon_table_data_all={LoanRequestAll_Data.loan_requests.data}
            setCurrentPage={setcurrentPageapproved}
            currentPage={currentPageapproved}
            totalPages={LoanRequestAll_Data?.loan_requests?.last_page}
            total_count={total_count_all_loan_data}
            bulkAction={undefined}
          />
        );
      case "Canceled Requests":
        return <CanceledRequests 
          tabs={tabs}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            handleYearChange={handleYearChange}
            years={years}/>;
      default:
        return (
          <AllRequest
            tabs={tabs}
            years={years}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            stats={stats}
            chartData={chartData}
            barChartData={barChartData}
            pieChartData={pieChartData}
            progressBarData={progressBarData}
            requests={LoanRequestAll_Data?.loan_requests?.data}
            tableHeaders={tableHeaders}
            tableTitleProps={tableTitleProps}
            handleSearchClick={handleSearchClick}
            handleFilterClick={handleFilterClick}
            handleSeeAllClick={handleSeeAllClick}
            handleFundWallet={handleFundWallet}
            handleYearChange={handleYearChange}
            setSelectedYear={setSelectedPriod}
            selectedYear={selectedPeriod}
            total_count={total_count_all_loan_data}
            bulkAction={undefined}
            barChartTotalAmount={
              loan_request_trend_data?.total_requested_amount
            }
            pieChartTotal={total_loans}
          />
        );
    }
  };
  // if (LoanRequestAll_loading) {`
    // return (
      // <Layout>
      //   <div className="">
      //     <HeaderWithTabs
      //       title="Loan Request"
      //       tabs={tabs}
      //       years={years}
      //       onTabChange={setActiveTab}
      //       onYearChange={handleYearChange}
      //       activeTab={activeTab}
      //       setActiveTab={setActiveTab}
      //     />
      //     <div className="">
      //       <SpinningFaceExact />
      //     </div>
      //   </div>
      // </Layout>
    // );
  // }

  return (
    <Layout>
    <div className="">{renderContent()}
      <AnimatedLoader isLoading={LoanRequestAll_loading}/>
    </div>
  </Layout>
  );
}
