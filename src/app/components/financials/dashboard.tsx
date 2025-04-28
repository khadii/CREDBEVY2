'use client'

import React, { useState } from 'react'
import { YearDropdown } from '../Yeardropdown'
import { CircleAlert } from 'lucide-react';
import { Tabs } from '../Tabs';
import Card from '../Card';
import { TbCurrencyNaira } from 'react-icons/tb';
import { LuSquareActivity } from 'react-icons/lu';
import CardChart from '../ChartCards/DoubleBatchart';

export default function Dashboard() {
      const [selectedYear, setSelectedYear] = useState("2025");
      const years = ["2022", "2023", "2024", "2025", "2026"];
      const tabs = [
        { name: "Summary" },
        { name: "Trends and History"},
        { name: "Financial Statement" },
        { name: "Transactions History" },
        { name: "Goals and Targets" },
      ];
    
   const [activeTab, setActiveTab] = useState<string>(tabs[0].name);
   const stats = [
    {
      title: "Total Revenue generated",
      amount: "₦5,000,000", 
      percentage: "10%", 
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Loan Disbursed",
      amount: "₦2,500,000", 
      percentage: "5%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Loan Volume",
      amount: "1,200",
      percentage: "7%",
      icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
    },
  ];
  
  return (
    <div>
       <p className="font-semibold text-4xl text-[#333333] mb-6 bg-[#FAFAFA]">
              Repayment
            </p>
       <div className='mb-[26px]'>      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} /></div>
            <div className="w-full pl-[16px] py-4 md:py-0 md:h-[59px] min-w-[#FFFFFF] gap-1 mb-6 flex items-center   bg-white  rounded-[4px]  ">
          <div>
            <CircleAlert className="h-4 w-4 text-[#8A8B9F]" />
          </div>
          <div>
            <p className="text-sm font-normal text-[#8A8B9F]  ">
              You can top up your wallet by doing a transfer from your
              mobile/internet banking app or USSD to the account number:
              4161312574 (Anchor Micro Finance Bank)
            </p>
          </div>
        </div>
        <YearDropdown 
  years={[2023, 2024]} 
  selectedYear={2024} 
  setSelectedYear={(year:any) => console.log(year)}
  withdrawal={2}
  onOptionalButtonClick={() => alert("Button clicked!")}
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
        <CardChart
  title="Revenue Comparison"
  description="Monthly revenue comparison"
  totalAmount="₦150.75M"
   comparisonData = {[
    { name: "Jan", firstDataset: 12.5, secondDataset: 10.2 },
    { name: "Feb", firstDataset: 14.0, secondDataset: 12.1 },
    { name: "Mar", firstDataset: 16.3, secondDataset: 13.7 },
    { name: "Apr", firstDataset: 18.2, secondDataset: 14.5 },
    { name: "May", firstDataset: 17.8, secondDataset: 15.3 },
    { name: "Jun", firstDataset: 19.4, secondDataset: 16.2 },
    { name: "Jul", firstDataset: 20.1, secondDataset: 17.5 },
    { name: "Aug", firstDataset: 21.3, secondDataset: 18.8 },
    { name: "Sep", firstDataset: 22.5, secondDataset: 19.6 },
    { name: "Oct", firstDataset: 20.7, secondDataset: 18.0 },
    { name: "Nov", firstDataset: 18.9, secondDataset: 16.3 },
    { name: "Dec", firstDataset: 15.2, secondDataset: 13.5 }
  ]}
  
  firstDatasetName="2023"
  secondDatasetName="2022"
  selectedYear="2023"
  // setSelectedYear={setYear}
/>
    </div>
  )
}
