"use client";

import React, { useEffect, useState } from "react";
import { YearDropdown } from "../Yeardropdown";
import Card from "../Card";
import { TbCurrencyNaira } from "react-icons/tb";
import { LuSquareActivity } from "react-icons/lu";
import Search from "../Search";
import { CustomersTable } from "./customersComponents/customerstable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/Redux/store";
import { Customers_stats } from "@/app/Redux/customer/customer_thunk";
import { fetchCustomerLoanRequests } from "@/app/Redux/customer/customer_request_slice";

export default function Customers() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedYear, setSelectedYear] = useState("2025");
  const Year = { year: selectedYear };
  const years = ["2022", "2023", "2024", "2025", "2026"];

  useEffect(() => {
    dispatch(Customers_stats(Year));
    dispatch(
      fetchCustomerLoanRequests({
        search: "",
        sort_by: "DESC",
        start_date: "",
        end_date: "",
        single: "",
        limit: "10",
        paginate: true,
        filter_by: "",
        approvalStatus: "",
        page: 1
      })
    );
  }, [dispatch, Year.year]);

  const {
    loading: customersLoading,
    error: customersError,
    data: customersData,
  } = useSelector((state: RootState) => state.customerLoanRequests);

  const {
    loading: statsLoading,
    error: statsError,
    data: statsData,
  } = useSelector((state: RootState) => state.customersStats);

  const stats = [
    {
      title: "Total Customers",
      amount: statsData?.totalCustomer ?? "N/A",
      percentage: statsData?.totalCustomerPercentage ?? "N/A",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Profit Generated",
      amount: statsData?.totalProfitGenerated ?? "N/A",
      percentage: statsData?.totalProfitGeneratedPercentage ?? "N/A",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Amount Disbursed",
      amount: statsData?.totalAmountDisbursed ?? "N/A",
      percentage: statsData?.totalAmountDisbursedPercentage ?? "N/A",
      icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
    },
  ];

  const handlePageChange = (page: number) => {
    dispatch(
      fetchCustomerLoanRequests({
        search: "",
        sort_by: "DESC",
        start_date: "",
        end_date: "",
        single: "",
        limit: "10",
        paginate: true,
        filter_by: "",
        approvalStatus: "",
        page: page
      })
    );
  };

  return (
    <section className="bg-[#FAFAFA]">
      <div className="">
        {/* title */}
        <p className="font-semibold text-4xl text-[#333333] mb-6 bg-[#FAFAFA]">
          Customers
        </p>

        {/* year dropdown */}
        <YearDropdown
          years={years}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
        />

        {/* stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
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

        {/* search and table */}
        <Search showSeeAll={false} />
        <CustomersTable
          loan_table_data_all={customersData?.data || []}
          setCurrentPage={handlePageChange}
          currentPage={customersData?.current_page || 1}
          totalPages={customersData?.last_page || 1}
          total_count={customersData?.total || 0}
          bulkAction={1}
        />
      </div>
    </section>
  );
}