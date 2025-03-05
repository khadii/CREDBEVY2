"use client";

import Card from '@/app/components/Card';
import MapGraph from '@/app/components/ChartCards/MapGraph';
import LoanApprovalChart from '@/app/components/ChartCards/Piechart';
import { TheeContainer } from '@/app/components/equator';
import { YearDropdown } from '@/app/components/Yeardropdown';
import { SquareActivity } from 'lucide-react';
import React, { useState } from 'react';
import { TbCurrencyNaira } from 'react-icons/tb';

export default function LoanPerformance() {
  const [selectedYear, setSelectedYear] = useState('This Year');
  const years = ["This Year", "Last Year"];

  const handleYearChange = (year: string) => {
    setSelectedYear(year);
    console.log("Selected Year:", year);
  };

  const stats = [
    {
      title: "Total Revenue generated",
      amount: "₦  20,000,000.00",
      percentage: "15.00%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Loan Disbursed",
      amount: "₦  20,000,000.00", 
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

  const pieChartData = [
    { name: "Approved", value: 200, color: "#156064" },
    { name: "Unapproved", value: 300, color: "#EC7910" },
  ];

  return (
    <section className="w-full bg-[#FAFAFA] pb-10  h-full min-h-screen">
      <div className="">
        {/* title */}
        <div className='mb-[32px] space-y-4'>
          <p className="font-semibold text-4xl text-[#333333] bg-[#FAFAFA]">
            Loan Products List
          </p>
          <p className='font-semibold text-[20px] text-[#333333]'>
            Employee Loans
          </p>
        </div>
        {/* yeardropdown */}
        <YearDropdown
          years={years}
          selectedYear={selectedYear}
          setSelectedYear={handleYearChange}
        />
      </div>
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
        <TheeContainer
          leftContent={
            <LoanApprovalChart
              title={'Loan Default Rate'}
              description={'Total unpaid loan metrics'}
              total={'30,000'}
              data={pieChartData}
            />
          }
          middle={
            <LoanApprovalChart
              title={'Loan Approval Rate'}
              description={'The percentage of loan requests approved.'}
              total={'30,000'}
              data={pieChartData}
            />
          }
          rightContent={
            <MapGraph title={'Customer Demography'} description={'Where customers are from'}/>
          }
        />
      </div>
    </section>
  );
}