'use client'

import { CircleAlert, DollarSign } from "lucide-react";
import React from "react";
import Bigcard from "./BigCard";
import Card from "./Card";
import { TrendingUp,  } from "lucide-react";
import RevenueChart from "./Revenuechart";
import PieChartComponent from "./PieChart";
import Loanaprov from "./Loanaprov";
import DefaultRatePage from "./DefaultRate";
import LoanPerformancePage from "./Loanperformance";




export default function Dashboard() {
  
      
    const stats = [
        {
          title: "Total Revenue generated",
          amount: "₦ 20,000,000",
          percentage: "15.00%",
          icon: <DollarSign size={24} className="text-gray-500" />,
        },
        {
          title: "Total Loan Disbursed",
          amount: "₦ 20,000,000",
          percentage: "15.00%",
          icon: <DollarSign  size={24} className="text-gray-500" />,
        },
        {
          title: "Total Loan Volume",
          amount: "₦ 3,000,000,000",
          percentage: "15.00%",
          icon: <TrendingUp size={24} className="text-gray-500" />,
        },
      ];
    const handleFundWallet = () => {
        alert("Redirecting to funding page...");
      };
  return (
    <section className="w-full  bg-white ">
      <div className="">
        {/* title */}

        <p className="font-semibold text-4xl text-[#333333] mb-6">Dashboard</p>
        {/* notification */}
     <div className="w-full max-w-4xl  ml-4 gap-1 mb-11 flex items-center ">
   <div>  <CircleAlert className="h-4 w-4 text-[#8A8B9F]" /></div>
        <div><p className="text-sm font-normal text-[#8A8B9F]  ">
        You can top up your wallet by doing a transfer from your
          mobile/internet banking app or USSD to the account
          number: 4161312574 (Anchor Micro Finance Bank)
        </p></div>
     </div>
     <div className="mb-6">
     <Bigcard 
        balance="430,434,684.54" 
        accountNumber="4675298338" 
        onFundClick={handleFundWallet} 
      />
     </div>
     <div>
     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    <div className="w-full grid grid-cols-1 gap-6 mt-6 md:grid-cols-3">
  <div className="md:col-span-2 flex flex-col h-full">
    <RevenueChart />
  </div>
  <div className="md:col-span-1 flex flex-col h-full">
    <Loanaprov />
  </div>

</div>
<div className="w-full grid grid-cols-1 gap-6 mt-6 md:grid-cols-3 mb-6">
  <div className="md:col-span-2 flex flex-col h-full">
  <DefaultRatePage/>
  </div>
  <div className="md:col-span-1 flex flex-col h-full">
  <LoanPerformancePage/>
  </div>

</div>


    </div>
     </div>
      </div>
    </section>
  );
}
