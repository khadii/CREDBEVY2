"use client";

import { CircleAlert, DollarSign, SquareActivity } from "lucide-react";
import React from "react";
import Bigcard from "./BigCard";
import Card from "./Card";
import { TrendingUp } from "lucide-react";
import RevenueChart from "./Revenuechart";
import PieChartComponent from "./PieChart";
import Loanaprov from "./Loanaprov";
import DefaultRatePage from "./DefaultRate";
import LoanPerformancePage from "./Loanperformance";
import EqualHeightContainer from "./equator";
import LoanRequestActions from "./Search";
import LoanRequests from "./Loantable";
import { TbCurrencyNaira } from "react-icons/tb";
import { LuSquareActivity } from "react-icons/lu";

export default function Dashboard() {
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
    <section className="w-full  bg-[#FAFAFA] pb-20 ">
      <div className="">
        {/* title */}

        <p className="font-semibold text-4xl text-[#333333] mb-6">Dashboard</p>
        {/* notification */}
        <div className="w-full pl-[15px] pr-[117px] gap-1 mb-6 flex items-center py-[20px] border border-gray-200 ">
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
            <EqualHeightContainer
              leftContent={<RevenueChart />}
              rightContent={<Loanaprov />}
            />
            <EqualHeightContainer
              leftContent={<DefaultRatePage />}
              rightContent={<LoanPerformancePage />}
            />
          </div>
          <LoanRequestActions
            onSearchClick={handleSearchClick}
            onFilterClick={handleFilterClick}
            onSeeAllClick={handleSeeAllClick}
          />
          <LoanRequests/>
        </div>
      </div>
    </section>
  );
}

const stats = [
  {
    title: "Total Revenue generated",
    amount: "₦ 20,000",
    percentage: "15.00%",
    icon: <TbCurrencyNaira size={'14px'} className="text-gray-500" />,
  },
  {
    title: "Total Loan Disbursed",
    amount: "₦ 20,000",
    percentage: "15.00%",
    icon: <TbCurrencyNaira size={'14px'} className="text-gray-500" />,
  },
  {
    title: "Total Loan Volume",
    amount: "₦ 3,000,00",
    percentage: "15.00%",
    icon: <SquareActivity   size={14} className="text-gray-500" />,
  },
];
