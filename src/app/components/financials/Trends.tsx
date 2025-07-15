import React, { useEffect, useMemo, useState } from "react";
import CardChart from "../ChartCards/DoubleBatchart";
import EqualHeightContainer, { TwoContainer } from "../equator";
import LineChartTwo from "../ChartCards/doublelinechart";
import LoanApprovalChart from "../ChartCards/Piechart";
import { useDispatch, useSelector } from "react-redux";
import { customer_growth_trend } from "@/app/Redux/Financials/customer_growth_trend/customer_growth_trend_thunk";
import { AppDispatch } from "@/app/Redux/store";
import { revenue_vs_profit_trend } from "@/app/Redux/Financials/revenue_vs_profit_trend/revenue_vs_profit_trend_thunk";
import ChartCard from "../DefaultRate";
import { formatCurrency } from "@/app/lib/utillity/formatCurrency";
import ErrorDisplay from "../ErrorDisplay";

// Utility function to safely convert to number
const safeNumber = (value: any, fallback = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};

// Updated helper function to get time period labels
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

export default function Trends() {
  const [selectedYear, setSelectedYear] = useState("This Year");
  const [selectedTIME, setSelectedTIME] = useState("This Year");
  const dispatch = useDispatch<AppDispatch>();
  
  // Redux selectors with deep fallbacks
  const { data: dataStat = {} } = useSelector((state: any) => state.financialStats) || {};
  const { data: dataRD = {} } = useSelector((state: any) => state.repaymentVsDefaultTrend) || {};
  const { data: dataCus = {} } = useSelector((state: any) => state.customer) || {};
  const { data: dataTP = {} } = useSelector((state: any) => state.revenueVsProfitTrend) || {};
 const { loading, error } = useSelector((state: any) => state.revenueVsProfitTrend);
  // Safe data access with nested fallbacks
  const loanStats = dataStat?.loanStats || {};
  const customerCount = dataStat?.customerCount || {};
  const loanDefaultRate = loanStats.loanDefaultRate || { 
    defaulted_percentage: 0, 
    non_defaulted_percentage: 100,
    total_defaulted_loans: 0
  };

  // Default rate data with guaranteed numbers
  const defaultRateData = [
    { 
      color: "#156064", 
      value: safeNumber(loanDefaultRate.defaulted_percentage), 
      name: "Default" 
    },
    { 
      color: "#EC7910", 
      value: safeNumber(loanDefaultRate.non_defaulted_percentage, 100), 
      name: "No Default" 
    },
  ];

  const color1 = [
    { 
      color: "#156064", 
      value: safeNumber(loanDefaultRate.defaulted_percentage), 
      name: "Repayment" 
    },
    { 
      color: "#EC7910", 
      value: safeNumber(loanDefaultRate.non_defaulted_percentage, 100), 
      name: "Default Trends" 
    },
  ];

  const color2 = [
    { 
      color: "#156064", 
      value: safeNumber(loanDefaultRate.defaulted_percentage), 
      name: "Revenue" 
    },
    { 
      color: "#EC7910", 
      value: safeNumber(loanDefaultRate.non_defaulted_percentage, 100), 
      name: "Profit" 
    },
  ];

  const customerStatusData = [
    { 
      color: "#156064", 
      value: safeNumber(customerCount.active_customers), 
      name: "Active" 
    },
    { 
      color: "#EC7910", 
      value: safeNumber(customerCount.inactive_customers), 
      name: "Inactive" 
    },
  ];

  // Transform data for repayment vs default line chart
  const transformLineData = (item: any) => ({
    firstValue: safeNumber(item.repayments),
    secondValue: safeNumber(item.defaults)
  });

  // Generate default time periods for empty data
  const generateDefaultTimePeriods = (timePeriod: string) => {
    if (timePeriod === "This Year") {
      return Array.from({ length: 12 }, (_, i) => ({
        month: new Date(2025, i).toLocaleString('default', { month: 'short' }),
        firstValue: 0,
        secondValue: 0
      }));
    } else if (timePeriod === "This Month") {
      const daysInMonth = new Date(2025, new Date().getMonth() + 1, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => ({
        month: (i + 1).toString(),
        firstValue: 0,
        secondValue: 0
      }));
    } else {
      return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
        month: day,
        firstValue: 0,
        secondValue: 0
      }));
    }
  };

  // Repayment vs Default line data
  const repaymentDefaultLineData = useMemo(() => {
    const timeData = dataRD?.data || {
      yearly: [],
      monthly: [],
      weekly: []
    };

    const generateData = (dataArray: any[], timePeriod: string) => {
      if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return generateDefaultTimePeriods(timePeriod);
      }
      
      return dataArray.map((item: any) => ({
        month: getTimeLabel(item, timePeriod),
        ...transformLineData(item)
      }));
    };

    if (selectedTIME === "This Year") {
      return generateData(timeData.yearly, selectedTIME);
    } else if (selectedTIME === "This Month") {
      return generateData(timeData.monthly, selectedTIME);
    } else {
      return generateData(timeData.weekly, selectedTIME);
    }
  }, [dataRD, selectedTIME]);

  // Calculate total repayment + default
  const repaymentDefaultTotal = useMemo(() => {
    return formatCurrency(
      repaymentDefaultLineData.reduce(
        (sum, item) => sum + item.firstValue + item.secondValue,
        0
      )
    );
  }, [repaymentDefaultLineData]);

  // Customer growth data with default time periods
  const customerGrowthData = useMemo(() => {
    const growthData = dataCus || {
      customer_growth_by_year: [],
      customer_growth_by_month: [],
      customer_growth_by_week: [],
      total_customers_by_year: 0,
      total_customers_by_month: 0,
      total_customers_by_week: 0
    };

    const generateData = (dataArray: any[], timePeriod: string) => {
      if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return generateDefaultTimePeriods(timePeriod).map(item => ({
          month: item.month,
          value: 0
        }));
      }
      
      return dataArray.map((item: any) => ({
        month: getTimeLabel(item, timePeriod),
        value: safeNumber(item?.customer_count)
      }));
    };

    const chartData = 
      selectedYear === "This Year" ? generateData(growthData.customer_growth_by_year, selectedYear) :
      selectedYear === "This Month" ? generateData(growthData.customer_growth_by_month, selectedYear) :
      generateData(growthData.customer_growth_by_week, selectedYear);

    const totalCustomers = 
      selectedYear === "This Year" ? growthData.total_customers_by_year :
      selectedYear === "This Month" ? growthData.total_customers_by_month :
      growthData.total_customers_by_week;

    return {
      chartData,
      totalCustomers: safeNumber(totalCustomers)
    };
  }, [dataCus, selectedYear]);

  // Total customers
  const totalCustomers = useMemo(() => {
    return safeNumber(customerCount.total_customers).toLocaleString();
  }, [customerCount.total_customers]);

  // Revenue vs Profit data with default time periods
  const comparisonData = useMemo(() => {
    const revenueData = dataTP?.data || {
      by_year: [],
      by_month: [],
      by_week: []
    };

    const generateData = (dataArray: any[], timePeriod: string) => {
      if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return generateDefaultTimePeriods(timePeriod).map(item => ({
          name: item.month,
          firstDataset: 0,
          secondDataset: 0
        }));
      }
      
      return dataArray.map((item: any) => ({
        name: getTimeLabel(item, timePeriod),
        firstDataset: safeNumber(item?.revenue),
        secondDataset: safeNumber(item?.profit)
      }));
    };

    if (selectedYear === "This Year") {
      return generateData(revenueData.by_year, selectedYear);
    } else if (selectedYear === "This Month") {
      return generateData(revenueData.by_month, selectedYear);
    } else {
      return generateData(revenueData.by_week, selectedYear);
    }
  }, [dataTP, selectedYear]);

  // Total revenue + profit
  const totalAmount = useMemo(() => {
    return formatCurrency(
      comparisonData.reduce(
        (sum, item) => sum + item.firstDataset + item.secondDataset,
        0
      )
    );
  }, [comparisonData]);

  // Fetch data
  useEffect(() => {
    dispatch(customer_growth_trend({ year: "2025" }));
    dispatch(revenue_vs_profit_trend({ year: "2025" }));
  }, [dispatch]);

  return (
      <>
    {error ? <ErrorDisplay error={error}/> : (
     <div className="pb-[227px]">
      {/* Revenue vs Profit Trend */}
      <div className="mb-6">
        <CardChart
          title="Revenue VS Profit Trend"
          description="Trend comparing Revenue and profit"
          totalAmount={totalAmount}
          comparisonData={comparisonData}
          firstDatasetName="Revenue"
          secondDatasetName="Profit"
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          data={color2}
        />
      </div>

      {/* Repayment vs Default Trends */}
      <div className="mb-6">
        <EqualHeightContainer
          leftContent={
            <LineChartTwo
              firstDatasetName="Repayment"
              secondDatasetName="Trends"
              title="Repayment VS Default Trends"
              description="Trend showing repayment vs default"
              totalAmount={repaymentDefaultTotal}
              data={color1}
              lineData={repaymentDefaultLineData}
              selectedYear={selectedTIME}
              setSelectedYear={setSelectedTIME}
            />
          }
          rightContent={
            <LoanApprovalChart
              title="Loan Default Rate"
              description="Total unpaid loan metrics"
              total={safeNumber(loanDefaultRate.total_defaulted_loans)}
              data={defaultRateData}
            />
          }
        />
      </div>

      {/* Customer Growth and Status */}
      <div>
        <EqualHeightContainer
          leftContent={
            <ChartCard
              chartData={customerGrowthData.chartData}
              title={"All Customers"}
              description={"Number of Customers"}
              totalRevenue={customerGrowthData.totalCustomers}
              revenueChange={"30.00"} // You should calculate this dynamically based on your data
              lineColor={"#0F4C5C"}
              defaultSelectedYear={selectedYear}
              selectedYear={selectedYear}
              setSelectedYear={setSelectedYear}
            />
          }
          rightContent={
            <LoanApprovalChart
              title="Customer Status"
              description="Active vs inactive customers"
              total={totalCustomers}
              data={customerStatusData}
            />
          }
        />
      </div>
    </div>
    )}
  </>
   
  );
}