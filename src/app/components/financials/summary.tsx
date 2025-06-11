import { CircleAlert } from "lucide-react";
import React, { useEffect, useState } from "react";
import { LuSquareActivity } from "react-icons/lu";
import { TbCurrencyNaira } from "react-icons/tb";
import { YearDropdown } from "../Yeardropdown";
import Card from "../Card";
import CardChart from "../ChartCards/DoubleBatchart";
import EqualHeightContainer from "../equator";
import LineChartTwo from "../ChartCards/doublelinechart";
import LoanApprovalChart from "../ChartCards/Piechart";
import Bigcard, { Smallcard } from "../BigCard";
import { AppDispatch } from "@/app/Redux/store";
import { useDispatch, useSelector } from "react-redux";
import { GetAccount } from "@/app/Redux/Financials/Accouunt/getAccountthunk";
import { Financial_stats } from "@/app/Redux/Financials/stat/stat_thunk";
import { repayment_vs_default_trend } from "@/app/Redux/Financials/repayment_vs_default_trend/repayment_vs_default_trend_thunk";
import { revenue_vs_profit_trend } from "@/app/Redux/Financials/revenue_vs_profit_trend/revenue_vs_profit_trend_thunk";
import { formatCurrency } from "@/app/lib/utillity/formatCurrency";

export default function Summary() {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedYear, setSelectedYear] = useState("This Year");
  
  const { loading, error, data } = useSelector((state: any) => state.account);
  const { loading: loadinStat, error: errorStat, data: dataStat } = useSelector((state: any) => state.financialStats);
  const { data: dataRD = {} } = useSelector((state: any) => state.repaymentVsDefaultTrend) || {};
  const { data: dataTP = {} } = useSelector((state: any) => state.revenueVsProfitTrend) || {};

  const handleFundWallet = () => {
    alert("Redirecting to funding page...");
  };

  const Year = {
    year: "2025"
  };

  useEffect(() => {
    dispatch(GetAccount());
    dispatch(Financial_stats(Year));
    dispatch(repayment_vs_default_trend());
    dispatch(revenue_vs_profit_trend(Year));
  }, [dispatch]);

  // Utility functions moved inside component to access state
  const safeNumber = (value: any, fallback = 0): number => {
    const num = Number(value);
    return isNaN(num) ? fallback : num;
  };

  const getTimeLabel = (item: any, timePeriod: string) => {
    if (timePeriod === "This Year") {
      return item.month && item.month >= 1 && item.month <= 12
        ? new Date(2025, item.month - 1).toLocaleString('default', { month: 'short' })
        : 'Unknown Month';
    } else if (timePeriod === "This Month") {
      return typeof item.day === 'number' && item.day >= 1 && item.day <= 31
        ? item.day.toString()
        : 'Unknown Day';
    } else {
      return typeof item.day === 'string'
        ? item.day
        : 'Unknown Day';
    }
  };
      const color1 = [
    { 
      color: "#156064", 
   
      name: "Repayment" 
    },
    { 
      color: "#EC7910", 
      name: " Default Trends" 
    },
  ];


      const color2 = [
    { 
      color: "#156064", 
   
      name: "Revenue" 
    },
    { 
      color: "#EC7910", 
      name: " Profit" 
    },
  ];



  // Data transformation functions
  const transformRepaymentDefaultData = () => {
    const timeData = dataRD?.data || {
      yearly: [],
      monthly: [],
      weekly: []
    };

    const generateData = (dataArray: any[]) => {
      if (!Array.isArray(dataArray)) return [];
      
      return dataArray.map((item: any) => ({
        month: getTimeLabel(item, selectedYear),
        firstValue: safeNumber(item?.repayments),
        secondValue: safeNumber(item?.defaults)
      }));
    };

    if (selectedYear === "This Year") {
      return generateData(timeData.yearly);
    } else if (selectedYear === "This Month") {
      return generateData(timeData.monthly);
    } else {
      return generateData(timeData.weekly);
    }
  };

  const transformRevenueProfitData = () => {
    const revenueData = dataTP?.data || {
      by_year: [],
      by_month: [],
      by_week: []
    };

    const generateData = (dataArray: any[]) => {
      if (!Array.isArray(dataArray)) return [];
      
      return dataArray.map((item: any) => ({
        name: getTimeLabel(item, selectedYear),
        firstDataset: safeNumber(item?.revenue),
        secondDataset: safeNumber(item?.profit)
      }));
    };

    if (selectedYear === "This Year") {
      return generateData(revenueData.by_year);
    } else if (selectedYear === "This Month") {
      return generateData(revenueData.by_month);
    } else {
      return generateData(revenueData.by_week);
    }
  };

  // Chart data
  const datas = [
    { color: "#156064", value: safeNumber(dataStat?.loanStats?.loanDefaultRate?.defaulted_percentage), name: "defualt" },
    { color: "#EC7910", value: safeNumber(dataStat?.loanStats?.loanDefaultRate?.non_defaulted_percentage, 100), name: "no defualt" },
  ];

  const repaymentDefaultLineData = transformRepaymentDefaultData();
  const revenueProfitData = transformRevenueProfitData();

  // Rest of your original component
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
      <div className="w-full pl-[16px] py-4 md:py-0 md:h-[59px] min-w-[#FFFFFF] gap-1 mb-6 flex items-center bg-white rounded-[4px]">
        <div>
          <CircleAlert className="h-4 w-4 text-[#8A8B9F]" />
        </div>
        <div>
          <p className="text-sm font-normal text-[#8A8B9F]">
            You can top up your wallet by doing a transfer from your
            mobile/internet banking app or USSD to the account number:
            4161312574 (Anchor Micro Finance Bank)
          </p>
        </div>
      </div>
      
      <YearDropdown
        years={[2023, 2024]}
        selectedYear={2024}
        setSelectedYear={(year: any) => console.log(year)}
        withdrawal={2}
        optionalButtonText="Withdraw"
        onOptionalButtonClick={() => alert("Button clicked!")}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Smallcard
          balance={`₦ ${data?.wallet_balance}` || 'N/A'}
          accountNumber={data?.account_number || 'N/A'}
          onFundClick={handleFundWallet}
        />

        <Card
          title="Total Revenue"
          amount={dataStat?.totalRevenue.total_revenue || 'N/A'}
          percentage={`${dataStat?.totalRevenue.percentage_difference}%` || 'N/A'}
          icon={<TbCurrencyNaira size={"18px"} className="text-gray-500" />}
        />
        <Card
          title="Total Loan Volume"
          amount={dataStat?.totalLoanVolume.total_loan_count || 'N/A'}
          percentage={`${dataStat?.totalLoanVolume.percentage_difference}%` || 'N/A'}
          icon={<LuSquareActivity size={"18px"} className="text-gray-500" />}
        />
      </div>

      {/* Revenue VS Profit Trend Chart */}
      <div className="mb-6">
        <CardChart
          title="Revenue VS Profit Trend"
          description="Trend comparing Revenue and profit"
          totalAmount={formatCurrency(
            revenueProfitData.reduce((sum, item) => sum + item.firstDataset + item.secondDataset, 0)
          )}
          comparisonData={revenueProfitData.length > 0 ? revenueProfitData : [{ name: 'No Data', firstDataset: 0, secondDataset: 0 }]}
          firstDatasetName="Revenue"
          secondDatasetName="Profit"
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          data={color2}
        />
      </div>

      {/* Repayment VS Default Trends Chart */}
      <div className="mb-[107px]">
        <EqualHeightContainer
          leftContent={
            <LineChartTwo
            firstDatasetName="Repayment"
            secondDatasetName="Trends"
              title="Repayment VS Default Trends"
              description="Trend showing repayment vs default"
              totalAmount={formatCurrency(
                repaymentDefaultLineData.reduce((sum, item) => sum + item.firstValue + item.secondValue, 0)
              )}
              data={color1}
              lineData={repaymentDefaultLineData.length > 0 ? repaymentDefaultLineData : [{ month: 'No Data', firstValue: 0, secondValue: 0 }]}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          }
          rightContent={
            <LoanApprovalChart
              title="Loan Default Rate"
              description="Total unpaid loan metrics"
              total={dataStat?.loanStats.loanDefaultRate?.total_defaulted_loans}
              data={datas}
            />
          }
        />
      </div>
    </div>
  );
}