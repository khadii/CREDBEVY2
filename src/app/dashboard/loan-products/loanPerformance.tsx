"use client";

import AnimatedLoader from '@/app/components/animation';
import Card from '@/app/components/Card';
import MapGraph from '@/app/components/ChartCards/MapGraph';
import LoanApprovalChart from '@/app/components/ChartCards/Piechart';
import { TheeContainer } from '@/app/components/equator';
import { DropdownMenu } from '@/app/components/Modals/activateDeActivate';
import { YearDropdown } from '@/app/components/Yeardropdown';
import { useDashboard } from '@/app/Context/DahboardContext';
import { formatCurrency } from '@/app/lib/utillity/formatCurrency';
import { resetBulkAction } from '@/app/Redux/Loan_Product/Bulkslice';
import { _single_loan_products_stats, loan_products_single } from '@/app/Redux/Loan_Product/loan_product_thunk';
import { AppDispatch, RootState } from '@/app/Redux/store';
import { SquareActivity } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { SlOptionsVertical } from 'react-icons/sl';
import { TbCurrencyNaira } from 'react-icons/tb';
import { useDispatch, useSelector } from 'react-redux';

export default function LoanPerformance({params}:{params:any}) {

  
  const dispatch = useDispatch<AppDispatch>();
  const router =useRouter()
    // Memoize the filters object using usememo
    const [currentPage, setCurrentPage] = useState(1);
    const product_id= params
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
  
    const [selectedYear, setSelectedYear] = useState("2025");
    const years = ["2022", "2023", "2024", "2025", "2026"];
  const modalRef = useRef<HTMLDivElement | null>(null);
  
    const requestData = {
      year: selectedYear,
      product_id: product_id.id
    };
    
    const {
       loading: bulkActionLoading,
       success: bulkActionSuccess,
       error: bulkActionError,
       data: bulkActionData,
     } = useSelector((state: RootState) => state.bulkAction);
    const { data, loading, error } = useSelector(
      (state:any) => state.loanProductsTable.singleLoanProduct
    );

    useEffect(() => {
      if (bulkActionSuccess) {
        toast.success(bulkActionData.message);
        dispatch(loan_products_single(product_id.id));
        setActiveDropdown(null);
        dispatch(resetBulkAction());
      }
      if (bulkActionError) {
        toast.error(bulkActionError);
        dispatch(resetBulkAction());
      }
    }, [bulkActionSuccess, bulkActionError, dispatch]);
  
    // const [totalPages, setTotalPages] = useState(total);
    const { data: loanProductData, loading: productLoading } = useSelector(
      (state: any) => state.loanProductSingle
    );
    useEffect(() => {
      if (product_id) {
        dispatch(loan_products_single(product_id.id));
      }
    }, [product_id, dispatch]);
    useEffect(() => {
      if (product_id) {
        console.log("product_id:", product_id); 
        dispatch(_single_loan_products_stats(requestData));
      }
    }, [product_id, requestData.year]);
    
    const handleYearChange = (year: string) => {
      setSelectedYear(year)
      };
  const stats = [
    {
      title: "Total Defaults Product",
      amount:formatCurrency( data?.data?.totalLoanProducts),
      percentage: data?.data?.totalLoanProductPercentage + "%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Revenue Generated",
      amount: formatCurrency(data?.data?.totalRevenueGenerated),
      percentage: data?.data?.totalRevenueGeneratedPercentage + "%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Amount Disbursed",
      amount:formatCurrency( data?.data?.totalAmountDisbursed),
      percentage: data?.data?.totalAmountDisbursedPercentage + "%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
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
  const { selectedIds, setSelectedIds } = useDashboard();
 const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
 const handleOptionsClick = (e: React.MouseEvent) => {
  e.stopPropagation();
  setActiveDropdown(activeDropdown ? null : product_id.id);
  setSelectedIds(product_id.id)
};
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setActiveDropdown(null);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  return (
    <section className="w-full bg-[#FAFAFA] pb-10  h-full min-h-screen">
      <div className="">
        {/* title */}
        <div className='mb-[32px] space-y-4'>
      <div className=' flex w-full items-center justify-between'>    <p className="font-semibold text-4xl text-[#333333] bg-[#FAFAFA]">
          Loan Products Performance
          </p>
          <div className="">
                  <SlOptionsVertical 
                    color="#8A8B9F" 
                    onClick={handleOptionsClick} 
                    className="cursor-pointer hover:opacity-80 " 
                  />
                  {activeDropdown && <div ref={modalRef} className="absolute right-6  z-50"> <DropdownMenu onClick={(e) => e.stopPropagation()} productId={product_id.id} setActiveDropdown={setActiveDropdown} /></div>}
                </div></div>
          <p className='font-semibold text-[20px] text-[#333333] max-w-[300px] truncate'>
         
        {loanProductData?.product_name}
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
      <AnimatedLoader isLoading={productLoading ||bulkActionLoading}/>
    </section>
  );
}