"use client";

import { CircleAlert, DollarSign, SquareActivity } from "lucide-react";
import React, { useEffect } from "react";
import Bigcard from "../BigCard";
import { TbCurrencyNaira } from "react-icons/tb";
import { LuSquareActivity } from "react-icons/lu";
import Dashboardone from "./reuseabledashboaardone.";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { _Loan_Disbursed, _Loan_volume, _revenue, dashboard_wallet, loan_approval_rates } from "@/app/Redux/dashboard/dashboardThunk";
import { clearWalletBalance } from "@/app/Redux/dashboard/dashboardSlice";
import toast from "react-hot-toast";

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    balance,
    total_revenue,
    last_week_total_revenue,
    percentage_difference,
    total_loans,
approved_loans,
loan_approval_rate,
loan_disapproval_rate,
Total_Loan_Disbursed,
percentage_difference_Total_Loan_Disbursed,
percentage_difference_Total_Loan_volume,
Total_Loan_volume,
    loading,
    error,
  } = useSelector((state: any) => state.wallet);
  useEffect(() => {
    dispatch(dashboard_wallet());
    dispatch(_revenue());
    dispatch(_Loan_Disbursed());
    dispatch(_Loan_volume());
    dispatch(loan_approval_rates());
    return () => {
      dispatch(clearWalletBalance());
    };
  }, [dispatch]);

  const stats = [
    {
      title: "Total Revenue generated",
      amount: total_revenue ?? "N/A",
      percentage: percentage_difference + "%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Loan Disbursed",
      amount: Total_Loan_Disbursed, 
      percentage: percentage_difference_Total_Loan_Disbursed +"%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Loan Volume",
      amount: Total_Loan_volume,
      percentage: percentage_difference_Total_Loan_volume+"%",
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
    { name: "Approved", value: loan_approval_rate?? "N/A",  color: "#156064" },
    { name: "Unapproved", value: loan_disapproval_rate?? "N/A", color: "#EC7910" },
  ];

  const progressBarData = [
    { label: "Product A", value: 50000, maxValue: 100000 },
    { label: "Product B", value: 75000, maxValue: 100000 },
    { label: "Product C", value: 90000, maxValue: 100000 },
    { label: "Product D", value: 30000, maxValue: 100000 },
  ];
  const formatCurrency = (value: any) =>
    new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(value);

  const requests = [
    {
      name: "Oripeolye Timilehin",
      income: `${formatCurrency(134000000.0)}`, // Number with prefix
      amount: `${formatCurrency(134000000.0)}`, // Number with prefix
      cs: 743, // Number without prefix
      ir: `${23}%`, // Number with suffix
      duration: `${3} Months`, // Number with suffix
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <>{error}</>;
  }

  return (
    <section className="w-full  bg-[#FAFAFA] ">
      <div className="">
        {/* title */}

        <p className="font-semibold text-4xl text-[#333333] mb-6 bg-[#FAFAFA]">
          Dashboard
        </p>
        {/* notification */}
        <div className="w-full pl-[16px] py-4 md:py-0 md:h-[59px] min-w-[#FFFFFF] gap-1 mb-6 flex items-center   bg-white  rounded-[4px]  ">
          <div>
            {" "}
            <CircleAlert className="h-4 w-4 text-[#8A8B9F]" />
          </div>
          <div>
            <p className="text-sm font-normal text-[#8A8B9F]  ">
              You can top up your wallet by doing a transfer from your
              mobile/internet banking app or USSD to the account
              number: 4161312574 (Anchor Micro Finance Bank)
            </p>
          </div>
        </div>
        <div className="mb-6">
          <Bigcard
            balance={balance}
            accountNumber="4675298338"
            onFundClick={handleFundWallet}
          />
        </div>
        <div>
          <div>
            <Dashboardone
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
              pieChartTitle="Loan Approval Rate"
              pieChartDescription="The percentage of loan requests approved."
              pieChartTotal={total_loans?? "N/A"}
              lineChartTitle="Default Rate"
              lineChartDescription="Total unpaid loan value."
              lineChartTotalRevenue="₦ 20,000,000.00"
              lineChartRevenueChange="(30,00)"
              lineChartLineColor="#0F4C5C"
              lineChartDefaultSelectedYear="This Year"
              progressBarTitle="Sales Performance"
              progressBarDescription="Total sales performance of different products"
              href={"#"}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

