"use client";

import { CircleAlert, DollarSign, SquareActivity } from "lucide-react";
import React from "react";
import Bigcard from "../BigCard";
import Card from "../Card";
import { TrendingUp } from "lucide-react";
import RevenueChart from "../Revenuechart";
import PieChartComponent from "../PieChart";
import Loanaprov from "../Loanaprov";
import DefaultRatePage from "../DefaultRate";
import LoanPerformancePage from "../Loanperformance";
import EqualHeightContainer from "../equator";
import LoanRequestActions from "../Search";
import LoanRequests from "../Loantable";
import { TbCurrencyNaira } from "react-icons/tb";
import { LuSquareActivity } from "react-icons/lu";
import Dashboardone from "./reuseabledashboaardone.";

export default function Dashboard() {
    const stats = [
      {
        title: "Total Revenue generated",
        amount: "₦ 20,000,000.00",
        percentage: "15.00%",
        icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
      },
      {
        title: "Total Loan Disbursed",
        amount: "₦ 20,000,000.00",
        percentage: "15.00%",
        icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
      },
      {
        title: "Total Loan Volume",
        amount: "3,000,000,000",
        percentage: "15.00%",
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
      { name: "Approved", value: 200, color: "#156064" },
      { name: "Unapproved", value: 300, color: "#EC7910" },
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
            balance="430,434,684.54"
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
              pieChartTotal="80,000"
              lineChartTitle="Default Rate"
              lineChartDescription="Total unpaid loan value."
              lineChartTotalRevenue="₦ 20,000,000.00"
              lineChartRevenueChange="(30,00)"
              lineChartLineColor="#0F4C5C"
              lineChartDefaultSelectedYear="This Year"
              progressBarTitle="Sales Performance"
              progressBarDescription="Total sales performance of different products" href={"#"}                 />
        </div>
        </div>
      </div>
    </section>
  );
}

const stats = [
  {
    title: "Total Revenue generated",
    amount: "₦  20,000,000.00",
    percentage: "15.00%",
    icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
  },
  {
    title: "Total Loan Disbursed",
    amount: "₦  20,000,000.00", // Removed ₦
    percentage: "15.00%",
    icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
  },
  {
    title: "Total Loan Volume",
    amount: "3,000,000,000",
    percentage: "15.00%",
    icon: <SquareActivity size={"18px"} className="text-gray-500" />,
  },
];
