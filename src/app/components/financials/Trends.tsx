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

// Utility function to safely convert to number
const safeNumber = (value: any, fallback = 0): number => {
  const num = Number(value);
  return isNaN(num) ? fallback : num;
};
// Updated helper function to get time period labels
const getTimeLabel = (item: any, timePeriod: string) => {
  if (timePeriod === "This Year") {
    // For yearly data, use the month name (e.g., Jan, Feb)
    return item.month && item.month >= 1 && item.month <= 12
      ? new Date(2025, item.month - 1).toLocaleString('default', { month: 'short' })
      : 'Unknown Month';

  } else if (timePeriod === "This Month") {
    // Return just the day number as a string (e.g., "1", "2", ..., "30")
    return typeof item.day === 'number' && item.day >= 1 && item.day <= 31
      ? item.day.toString()
      : 'Unknown Day';

  } else {
    // For weekly data, return day name (e.g., Mon, Tue)
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
      name: " Default Trends" 
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

  // Repayment vs Default line data
  const repaymentDefaultLineData = useMemo(() => {
    const timeData = dataRD?.data || {
      yearly: [],
      monthly: [],
      weekly: []
    };

    const generateData = (dataArray: any[]) => {
      if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return [];
      }
      
      return dataArray.map((item: any) => {
        if (!item || typeof item !== 'object') {
          return {
            month: 'Unknown',
            firstValue: 0,
            secondValue: 0
          };
        }
        
        return {
          month: getTimeLabel(item, selectedTIME),
          ...transformLineData(item)
        };
      });
    };

    if (selectedTIME === "This Year") {
      return generateData(timeData.yearly);
    } else if (selectedTIME === "This Month") {
      return generateData(timeData.monthly);
    } else {
      return generateData(timeData.weekly);
    }
  }, [dataRD, selectedTIME]);

  // Calculate total repayment + default
  const repaymentDefaultTotal = useMemo(() => {
    const timeData = dataRD?.data || {
      yearly: [],
      monthly: [],
      weekly: []
    };

    let total = 0;
    const sumReducer = (sum: number, item: any) => {
      if (!item || typeof item !== 'object') return sum;
      return sum + safeNumber(item.repayments) + safeNumber(item.defaults);
    };

    if (selectedTIME === "This Year" && Array.isArray(timeData.yearly)) {
      total = timeData.yearly.reduce(sumReducer, 0);
    } else if (selectedTIME === "This Month" && Array.isArray(timeData.monthly)) {
      total = timeData.monthly.reduce(sumReducer, 0);
    } else if (Array.isArray(timeData.weekly)) {
      total = timeData.weekly.reduce(sumReducer, 0);
    }

    return formatCurrency(total)
  }, [dataRD, selectedTIME]);

  // Customer growth data formatted for ChartCard
  // Customer growth data formatted for ChartCard
const customerGrowthData = useMemo(() => {
  const growthData = dataCus || {
    customer_growth_by_year: [],
    customer_growth_by_month: [],
    customer_growth_by_week: [],
    total_customers_by_year: 0,
    total_customers_by_month: 0,
    total_customers_by_week: 0
  };

  const transformGrowthItem = (item: any) => ({
    month: getTimeLabel(item, selectedYear),
    value: safeNumber(item?.customer_count)
  });

  const generateData = (dataArray: any[]) => {
    if (!Array.isArray(dataArray) || dataArray.length === 0) {
      return [{ month: 'No Data', value: 0 }];
    }
    
    return dataArray.map((item: any) => ({
      ...transformGrowthItem(item)
    }));
  };

  // Calculate total customers based on the selected time period
  const totalCustomers = 
    selectedYear === "This Year" ? growthData.total_customers_by_year :
    selectedYear === "This Month" ? growthData.total_customers_by_month :
    growthData.total_customers_by_week;

  return {
    chartData: 
      selectedYear === "This Year" ? generateData(growthData.customer_growth_by_year) :
      selectedYear === "This Month" ? generateData(growthData.customer_growth_by_month) :
      generateData(growthData.customer_growth_by_week),
    totalCustomers
  };
}, [dataCus, selectedYear]);

  // Total customers
  const totalCustomers = useMemo(() => {
    return safeNumber(customerCount.total_customers).toLocaleString();
  }, [customerCount.total_customers]);

  // Revenue vs Profit data
  const comparisonData = useMemo(() => {
    const revenueData = dataTP?.data || {
      by_year: [],
      by_month: [],
      by_week: []
    };

    const transformRevenueItem = (item: any) => ({
      firstDataset: safeNumber(item?.revenue),
      secondDataset: safeNumber(item?.profit)
    });

    const generateData = (dataArray: any[]) => {
      if (!Array.isArray(dataArray) || dataArray.length === 0) {
        return [];
      }
      
      return dataArray.map((item: any, index: number) => {
        if (!item || typeof item !== 'object') {
          return {
            name: `Item ${index + 1}`,
            firstDataset: 0,
            secondDataset: 0
          };
        }
        
        return {
          name: getTimeLabel(item, selectedYear),
          ...transformRevenueItem(item)
        };
      });
    };

    if (selectedYear === "This Year") {
      return generateData(revenueData.by_year);
    } else if (selectedYear === "This Month") {
      return generateData(revenueData.by_month);
    } else {
      return generateData(revenueData.by_week);
    }
  }, [dataTP, selectedYear]);

  // Total revenue + profit
  const totalAmount = useMemo(() => {
    const revenueData = dataTP?.data || {
      by_year: [],
      by_month: [],
      by_week: []
    };

    let total = 0;
    const sumReducer = (sum: number, item: any) => {
      if (!item || typeof item !== 'object') return sum;
      return sum + safeNumber(item.revenue) + safeNumber(item.profit);
    };

    if (selectedYear === "This Year" && Array.isArray(revenueData.by_year)) {
      total = revenueData.by_year.reduce(sumReducer, 0);
    } else if (selectedYear === "This Month" && Array.isArray(revenueData.by_month)) {
      total = revenueData.by_month.reduce(sumReducer, 0);
    } else if (Array.isArray(revenueData.by_week)) {
      total = revenueData.by_week.reduce(sumReducer, 0);
    }

    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(total);
  }, [dataTP, selectedYear]);

  // Fetch data
  useEffect(() => {
    dispatch(customer_growth_trend({ year: "2025" }));
    dispatch(revenue_vs_profit_trend({ year: "2025" }));
  }, [dispatch]);

  // Provide empty data fallbacks for charts
  const ensureNonEmptyData = (data: any) => {
    if (!Array.isArray(data) || data.length === 0) {
      return [{ name: 'No Data', value: 0 }];
    }
    return data;
  };

  return (
    <div className="pb-[227px]">
      {/* Revenue vs Profit Trend */}
      <div className="mb-6">
        <CardChart
          title="Revenue VS Profit Trend"
          description="Trend comparing Revenue and profit"
          totalAmount={totalAmount}
          comparisonData={comparisonData.length > 0 ? comparisonData : [{ name: 'No Data', firstDataset: 0, secondDataset: 0 }]}
          firstDatasetName="Revenue"
          secondDatasetName="Profit"
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          data={ensureNonEmptyData(color2)}
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
              data={ensureNonEmptyData(color1)}
              lineData={repaymentDefaultLineData.length > 0 ? repaymentDefaultLineData : [{ month: 'No Data', firstValue: 0, secondValue: 0 }]}
              selectedYear={selectedTIME}
              setSelectedYear={setSelectedTIME}
            />
          }
          rightContent={
            <LoanApprovalChart
              title="Loan Default Rate"
              description="Total unpaid loan metrics"
              total={safeNumber(loanDefaultRate.total_defaulted_loans)}
              data={ensureNonEmptyData(defaultRateData)}
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
              data={ensureNonEmptyData(customerStatusData)}
            />
          }
        />
      </div>
    </div>
  );
}