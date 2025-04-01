"use client";

import { CircleAlert, DollarSign, SquareActivity } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { TbCurrencyNaira } from "react-icons/tb";
import { LuSquareActivity } from "react-icons/lu";
import Layout from "@/app/components/Layout/Layout";
import LoanProducts from "@/app/components/LoanProduct/LoanProduct";
import { YearDropdown } from "../Yeardropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  _loan_products_all,
  _loan_products_stats,
  bulk_action,
} from "@/app/Redux/Loan_Product/loan_product_thunk";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { useRouter } from "next/navigation";
import { useDashboard } from "@/app/Context/DahboardContext";
import DeleteModal from "../Modals/DeleteModal";
import toast from "react-hot-toast";
import Deactivate from "../Modals/Deactivate";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const filters = {
    search: "",
    sort_by: "DESC",
    start_date: "",
    end_date: "",
    single: false,
    limit: "",
    paginate: true,
    page: currentPage,
  };

  const [selectedYear, setSelectedYear] = useState("2022");
  const years = ["2022", "2023", "2024", "2025", "2026"];
  const { selectedIds, setSelectedIds } = useDashboard();
  const {
    loading: bulkActionLoading,
    success: bulkActionSuccess,
    error: bulkActionError,
    data: bulkActionData,
  } = useSelector((state: RootState) => state.bulkAction);

  const Year = { year: selectedYear };
  const {
    data,
    loading,
    error,
    tabledata,
    total,
    total_count,
    loanProductsStats,
  } = useSelector((state: any) => state.loanProductsTable);

  useEffect(() => {
    dispatch(_loan_products_all(filters));
    console.log({ ii: tabledata });
    console.log({ total_count: total_count });
  }, [dispatch, filters.page]);


  
  useEffect(() => {
    dispatch(_loan_products_stats(Year));
    console.log({ loanProductsStats: loanProductsStats });
  }, [dispatch, Year.year]);

  useEffect(() => {
    const prod = tabledata?.length;
    if (prod < 0) {
      router.push("loan-products/no-product");
    }
  }, [tabledata]);
  const handleOpenModal = () => {
    if (selectedIds.length >= 1) {
      setIsDeleteModalOpen(true);
    } else {
      toast.error("Please select more than one item to perform this action.");
    }
  };

  const handleSubmit = async () => {
    dispatch(
      bulk_action({ loan_product_ids: selectedIds, action: "deactivate" })
    );
  };

  useEffect(() => {
    if (bulkActionSuccess) {
      toast.success("Deactivate Successful");
      dispatch(_loan_products_all(filters));
      setIsDeleteModalOpen(false);
    }
    if (bulkActionError) {
      toast.error(bulkActionError);
    }
  }, [bulkActionSuccess, bulkActionError, dispatch, Year.year]);
  

  const stats = [
    {
      title: "Total Loan Product",
      amount: loanProductsStats?.data?.totalLoanProducts,
      percentage: loanProductsStats?.data?.totalLoanProductPercentage,
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Revenue Generated",
      amount: loanProductsStats?.data?.totalRevenueGenerated,
      percentage: loanProductsStats?.data?.totalRevenueGeneratedPercentage,
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Amount Disbursed",
      amount: loanProductsStats?.data?.totalAmountDisbursed,
      percentage: loanProductsStats?.data?.totalAmountDisbursedPercentage,
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

  const barChartData = [
    { name: "Jan", revenue: 10 },
    { name: "Feb", revenue: 15 },
    { name: "Mar", revenue: 20 },
    { name: "Apr", revenue: 25 },
    { name: "May", revenue: 30 },
    { name: "Jun", revenue: 35 },
    { name: "Jul", revenue: 40 },
    { name: "Aug", revenue: 45 },
    { name: "Sep", revenue: 50 },
    { name: "Oct", revenue: 55 },
    { name: "Nov", revenue: 60 },
    { name: "Dec", revenue: 65 },
  ];

  const pieChartData = [
    {
      name: "Active",
      value: loanProductsStats?.data?.loanDefaultRate?.defaulted_percentage,
      color: "#156064",
    },
    {
      name: "Overdue",
      value: loanProductsStats?.data?.loanDefaultRate?.non_defaulted_percentage,
      color: "#EC7910",
    },
  ];

  const pieChartDataTwo = [
    {
      name: "Approved",
      value: loanProductsStats?.data?.loanApprovalRate?.approval_percentage,
      color: "#156064",
    },
    {
      name: "Unapproved",
      value: loanProductsStats?.data?.loanApprovalRate?.declined_percentage,
      color: "#EC7910",
    },
  ];

  const progressBarData =
    loanProductsStats?.data?.loanPerformingProducts?.top_products.map(
      (item: any) => ({
        label: item.product_name,
        value: item.total_loans,
        maxValue: item.percentage,
      })
    ) || [];

  const formatCurrency = (value: any) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);

  const requests = [
    {
      name: "Oripeolye Timilehin",
      income: `${formatCurrency(134000000.0)}`,
      amount: `${formatCurrency(134000000.0)}`,
      cs: 743,
      ir: `${23}%`,
      duration: `${3} Months`,
      status: "Interested",
    },
    {
      name: "Oripeolye Timilehin",
      income: `${formatCurrency(134000000.0)}`,
      amount: `${formatCurrency(134000000.0)}`,
      cs: 743,
      ir: `${23}%`,
      duration: `${6} Months`,
      status: "Not Interested",
    },
    {
      name: "Oripeolye Timilehin",
      income: `${formatCurrency(134000000.0)}`,
      amount: `${formatCurrency(134000000.0)}`,
      cs: 743,
      ir: `${23}%`,
      duration: `${6} Months`,
      status: "Interested",
    },
    {
      name: "Oripeolye Timilehin",
      income: `${formatCurrency(134000000.0)}`,
      amount: `${formatCurrency(134000000.0)}`,
      cs: 743,
      ir: `${23}%`,
      duration: `${6} Months`,
    },
    {
      name: "Oripeolye Timilehin",
      income: `${formatCurrency(134000000.0)}`,
      amount: `${formatCurrency(134000000.0)}`,
      cs: 743,
      ir: `${23}%`,
      duration: `${6} Months`,
    },
  ];

  const headers = [
    "Name",
    "Average Income",
    "Amount Requested",
    "C.S",
    "I.R",
    "Duration",
    "Quick Actions",
  ];

  const tableHeaders = [
    "Name",
    "Average Income",
    "Amount Requested",
    "C.S",
    "I.R",
    "Duration",
    "Quick Actions",
  ];

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
  };

  const tableTitleProps = {
    mainTitle: "Pending Loan request",
    requestCount: "200 requests",
    subtitle: "Loans awaiting a decision",
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
  return (
    <section className="w-full  bg-[#FAFAFA] ">
      <div className="">
        {/* title */}

        <p className="font-semibold text-4xl text-[#333333] mb-6 bg-[#FAFAFA]">
          Loan Products List
        </p>
        {/* notification */}

        <YearDropdown
          years={years}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />
        <div>
          <div>
            <LoanProducts
              stats={stats}
              chartData={chartData}
              barChartData={barChartData}
              pieChartData={pieChartData}
              progressBarData={progressBarData}
              tableData={requests}
              tableHeaders={tableHeaders}
              tableTitleProps={tableTitleProps}
              onSearchClick={handleSearchClick}
              onFilterClick={handleFilterClick}
              onSeeAllClick={handleSeeAllClick}
              onFundWallet={handleFundWallet}
              barChartTitle="Loan Disbursement"
              barChartDescription="Total loan amount disbursed over time."
              barChartTotalAmount="₦ 50,000,000.00"
              barChartHighlightBar="Dec"
              barChartHighlightColor="#EC7910"
              pieChartTitle="Loan Default Rate"
              pieChartDescription="Total unpaid loan metrics."
              pieChartTotal={
                loanProductsStats?.data?.loanDefaultRate?.total_defaulted_loans
              }
              lineChartTitle="Default Rate"
              lineChartDescription="Total unpaid loan value."
              lineChartTotalRevenue="₦ 20,000,000.00"
              lineChartRevenueChange="(30,00)"
              lineChartLineColor="#0F4C5C"
              lineChartDefaultSelectedYear="This Year"
              progressBarTitle="Sales Performance"
              progressBarDescription="Total sales performance of different products"
              href={"#"}
              laon_table_data_all={tabledata}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPages={total}
              total_count={total_count}
              pieChartDataTwo={pieChartDataTwo}
              pieChartTitleTwo={"Loan Approval Rate"}
              pieChartDescriptionTwo={
                "The percentage of loan requests approved."
              }
              pieChartTotalTwo={
                loanProductsStats?.data?.loanApprovalRate
                  ?.total_loan_applications
              }
              bulkAction={() => handleOpenModal()}
            />
          </div>
        </div>
      </div>
      <Deactivate
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => handleSubmit()}
      />
    </section>
  );
}
