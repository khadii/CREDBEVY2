"use client";

import Card from '@/app/components/Card';
import MapGraph from '@/app/components/ChartCards/MapGraph';
import LoanApprovalChart from '@/app/components/ChartCards/Piechart';
import { TheeContainer } from '@/app/components/equator';
import { YearDropdown } from '@/app/components/Yeardropdown';
import { _single_loan_products_stats } from '@/app/Redux/Loan_Product/loan_product_thunk';
import { AppDispatch } from '@/app/Redux/store';
import { SquareActivity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { TbCurrencyNaira } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

export default function LoanPerformance({params}:{params:any}) {

  
  const dispatch = useDispatch<AppDispatch>();
  const router =useRouter()
    // Memoize the filters object using usememo
    const [currentPage, setCurrentPage] = useState(1);
  
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
  
    const requestData = {
      year: selectedYear,
      product_id: params,
    };
   
    const { data, loading, error } = useSelector(
      (state:any) => state.loanProductsTable.singleLoanProduct
    );
  
    // const [totalPages, setTotalPages] = useState(total);
  
    useEffect(() => {
      dispatch(_single_loan_products_stats(requestData));
    
    }, [requestData.product_id,requestData.year]);
  
    const handleYearChange = (year: string) => {
      setSelectedYear(year)
      };
  const stats = [
    {
      title: "Total Defaults Product",
      amount: data?.data?.totalLoanProducts,
      percentage: data?.data?.totalLoanProductPercentage + "%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Revenue Generated",
      amount: data?.data?.totalRevenueGenerated,
      percentage: data?.data?.totalRevenueGeneratedPercentage + "%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Amount Disbursed",
      amount: data?.data?.totalAmountDisbursed,
      percentage: data?.data?.totalAmountDisbursedPercentage + "%",
      icon: <SquareActivity size={"18px"} className="text-gray-500" />,
    },
  ];

  const pieChartData = [
    { name: "active", value: data?.data?.loanDefaultRate.defaulted_percentage, color: "#156064" },
    { name: "overdue",  value: data?.data?.loanDefaultRate.non_defaulted_percentage,  color: "#EC7910" },
  ];
  const pieChartData2 = [
    { name: "Approved", value: data?.data?.loanApprovalRate.approval_percentage, color: "#156064" },
    { name: "Unapproved",  value: data?.data?.loanApprovalRate.declined_percentage,  color: "#EC7910" },
  ];


  return (
    <section className="w-full bg-[#FAFAFA] pb-10  h-full min-h-screen">
      <div className="">
        {/* title */}
        <div className='mb-[32px] space-y-4'>
          <p className="font-semibold text-4xl text-[#333333] bg-[#FAFAFA]">
          Loan Products Performance
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
              total={data?.data?.loanDefaultRate.total_defaulted_loans} 
              data={pieChartData}
            />
          }
          middle={
            <LoanApprovalChart
              title={'Loan Approval Rate'}
              description={'The percentage of loan requests approved.'}
              total={data?.data?.loanApprovalRate.total_approved_loans} 
              data={pieChartData2}
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