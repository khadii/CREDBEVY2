"use client"

import { CircleAlert } from "lucide-react"
import { useEffect, useState } from "react"
import Bigcard from "../BigCard"
import { TbCurrencyNaira } from "react-icons/tb"
import { LuSquareActivity } from "react-icons/lu"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch } from "@/app/Redux/store"
import {
  _Loan_Disbursed,
  _Loan_volume,
  _revenue,
  dashboard_wallet,
  loan_approval_rates,
  _pending_loans,
  _Default_Rate,
  total_revenue_perer_time,
  _loan_performance,
} from "@/app/Redux/dashboard/dashboardThunk"
import { clearWalletBalance } from "@/app/Redux/dashboard/dashboardSlice"
import SpinningFaceExact from "../credbevyLoader"
import Dashboardone from "./reuseabledashboaardone."
import { formatToNaira } from "@/app/lib/Naira"
import AnimatedLoader from "../animation"
import { useRouter } from "next/navigation"

// Helper function to format values to Naira

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const {
    balance,
    total_revenue,
    last_week_total_revenue,
    percentage_difference,
    total_loans,
    approved_loans,
    loan_pending_rate,
    loan_approval_rate,
    loan_disapproval_rate,
    Total_Loan_Disbursed,
    percentage_difference_Total_Loan_Disbursed,
    percentage_difference_Total_Loan_volume,
    Total_Loan_volume,
    pending_loans,
    total_count,
    total_defaults_by_month,
    total_defaults_by_week,
    total_defaults_by_year,
    total_sum_defaults_by_year,
    total_sum_defaults_by_month,
    total_sum_defaults_by_week,
    total_revenue_by_year,
    total_revenue_by_month,
    total_revenue_by_week,
    total_sum_revenue_by_year,
    total_sum_revenue_by_month,
    total_sum_revenue_by_week,
    loan_performance,
    loading,
    error,
  } = useSelector((state: any) => state.wallet)

  useEffect(() => {
    dispatch(dashboard_wallet())
    dispatch(_revenue())
    dispatch(_Loan_Disbursed())
    dispatch(_Loan_volume())
    dispatch(_pending_loans())
    dispatch(_Default_Rate())
    dispatch(_loan_performance())
    dispatch(total_revenue_perer_time())
    dispatch(loan_approval_rates())
    return () => {
      dispatch(clearWalletBalance())
    }
  }, [dispatch])
  const router = useRouter()
  const stats = [
    {
      title: "Total Revenue generated",
      amount: formatToNaira(total_revenue) ?? "N/A",
      percentage: percentage_difference + "%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Loan Disbursed",
      amount: formatToNaira(Total_Loan_Disbursed),
      percentage: percentage_difference_Total_Loan_Disbursed + "%",
      icon: <TbCurrencyNaira size={"18px"} className="text-gray-500" />,
    },
    {
      title: "Total Loan Volume",
      amount: Total_Loan_volume,
      percentage: percentage_difference_Total_Loan_volume + "%",
      icon: <LuSquareActivity size={"18px"} className="text-gray-500" />,
    },
  ]

  const currentYear = new Date().getFullYear()
  const lineChartDefaultSelectedYear = "This Year"
  const [linechartselectedYear, setlinechartSelectedYear] = useState(lineChartDefaultSelectedYear)

  const total_sum_defaults =
    linechartselectedYear === "This Year"
      ? total_sum_defaults_by_year
      : linechartselectedYear === "This Month"
        ? total_sum_defaults_by_month
        : total_sum_defaults_by_week

  const chartData =
    linechartselectedYear === "This Year"
      ? total_defaults_by_year?.map((item: any) => ({
          month: new Date(currentYear, item.month - 1).toLocaleString("default", { month: "long" }),
          value: item.default_percentage,
        }))
      : linechartselectedYear === "This Month"
        ? total_defaults_by_month?.map((item: any) => ({
            month: `${item.day}`,
            value: item.default_percentage,
          }))
        : total_defaults_by_week?.map((item: any) => ({
            month: item.day,
            value: Number.parseFloat(item.default_percentage),
          }))

  const formattedTotalSumDefaults = formatToNaira(total_sum_defaults)

  const barChartDefaultSelectedYear = "This Year"
  const [barchartselectedYear, setbarchartSelectedYear] = useState(barChartDefaultSelectedYear)

  const total_sum_revenue_generated =
    barchartselectedYear === "This Year"
      ? total_sum_revenue_by_year
      : barchartselectedYear === "This Month"
        ? total_sum_revenue_by_month
        : total_sum_revenue_by_week

  const formattedTotalSumRevenue = formatToNaira(total_sum_revenue_generated)

  const barChartData =
    barchartselectedYear === "This Year"
      ? Object.entries(total_revenue_by_year || {}).map(([month, value]) => ({
          name: month,
          revenue: value ? Number(((Number.parseFloat((value as string).replace(/,/g, "")) || 0) / 1).toFixed(2)) : 0,
        }))
      : barchartselectedYear === "This Month"
        ? Object.entries(total_revenue_by_month || {}).map(([day, value]) => ({
            name: `${day}`,
            revenue: value ? Number(((Number.parseFloat((value as string).replace(/,/g, "")) || 0) / 1).toFixed(2)) : 0,
          }))
        : Object.entries(total_revenue_by_week || {}).map(([day, value]) => ({
            name: day,
            revenue: value ? Number(((Number.parseFloat((value as string).replace(/,/g, "")) || 0) / 1).toFixed(2)) : 0,
          }))

  const pieChartData = [
    { name: "Approved", value: loan_approval_rate, color: "#156064" },
    { name: "Pending", value: loan_pending_rate, color: "#EC7910" },
    { name: "declined", value: loan_disapproval_rate, color: "#FA4D56" },
  ]

  const progressBarData =
    loan_performance?.map((item: any) => ({
      label: item.product_name,
      value: item.approved_loans_count,
      maxValue: item.total_count,
    })) || []

  const tableHeaders = ["Name", "Average Income", "Amount Requested", "C.S", "I.R", "Duration", "Quick Actions"]

  const tableTitleProps = {
    mainTitle: "Pending Loan request",
    requestCount: total_count + "" + " requests",
    subtitle: "Loans awaiting a decision",
  }

  const handleSearchClick = () => {
    console.log("Search button clicked")
  }

  const handleFilterClick = () => {
    console.log("Filter button clicked")
  }

  const handleSeeAllClick = () => {
    console.log("See All link clicked")
  }

  const handleFundWallet = () => {
    alert("Redirecting to funding page...")
  }

  // Add this useEffect to handle navigation when error occurs
  useEffect(() => {
    if (error==='Unauthorized') {
      router.push("/")
    }
  }, [error, router])

  return (
    <section className="w-full  bg-[#FAFAFA] ">
      <div className="">
        {/* title */}
        <p className="font-semibold text-4xl text-[#333333] mb-6 bg-[#FAFAFA]">Dashboard</p>
        {/* notification */}
        <div className="w-full pl-[16px] py-4 md:py-0 md:h-[59px] min-w-[#FFFFFF] gap-1 mb-6 flex items-center   bg-white  rounded-[4px]  ">
          <div>
            <CircleAlert className="h-4 w-4 text-[#8A8B9F]" />
          </div>
          <div>
            <p className="text-sm font-normal text-[#8A8B9F]  ">
              You can top up your wallet by doing a transfer from your mobile/internet banking app or USSD to the
              account number: 4161312574 (Anchor Micro Finance Bank)
            </p>
          </div>
        </div>
        <div className="mb-6">
          <Bigcard balance={formatToNaira(balance)} accountNumber="4675298338" onFundClick={handleFundWallet} />
        </div>
        <div>
          <div>
            <Dashboardone
              stats={stats}
              chartData={chartData}
              barChartData={barChartData}
              pieChartData={pieChartData}
              progressBarData={progressBarData}
              tableData={pending_loans}
              tableHeaders={tableHeaders}
              tableTitleProps={tableTitleProps}
              onSearchClick={handleSearchClick}
              onFilterClick={handleFilterClick}
              onSeeAllClick={handleSeeAllClick}
              onFundWallet={handleFundWallet}
              barChartTitle="Revenue Generated"
              barChartDescription="Total loan amount disbursed over time."
              barChartTotalAmount={formattedTotalSumRevenue}
              barChartHighlightBar="Dec"
              barChartHighlightColor="#EC7910"
              pieChartTitle="Loan Approval Rate"
              pieChartDescription="The percentage of loan requests approved."
              pieChartTotal={total_loans ?? "N/A"}
              lineChartTitle="Default Rate"
              lineChartDescription="Total unpaid loan value."
              lineChartTotalRevenue={formattedTotalSumDefaults}
              lineChartRevenueChange="(30,00)"
              lineChartLineColor="#0F4C5C"
              lineChartDefaultSelectedYear={lineChartDefaultSelectedYear}
              selectedYear={linechartselectedYear}
              setSelectedYear={setlinechartSelectedYear}
              barselectedYear={barchartselectedYear}
              barsetSelectedYear={setbarchartSelectedYear}
              progressBarTitle="Sales Performance"
              progressBarDescription="Total sales performance of different products"
              href={"#"}
              total_count={total_count}
              laon_table_data_all={pending_loans}
              bulkAction={undefined}
            />
          </div>
        </div>
      </div>
      <AnimatedLoader isLoading={loading}></AnimatedLoader>
    </section>
  )
}
