import { createSlice } from "@reduxjs/toolkit";
import { Financial_stats } from "./stat_thunk";
// Interface definitions for the response structure
interface TotalRevenue {
  total_revenue: string;
  last_month_total_revenue: string;
  percentage_difference: string;
}
interface CustomerCount {
  total_customers: number;
  active_customers: number;
  inactive_customers: number;
  active_percentage: number;
  inactive_percentage: number;
}

interface TotalLoanVolume {
  total_loan_count: number;
  current_week_loan_count: number;
  last_week_loan_count: number;
  weekly_percentage_difference: number;
  current_month_loan_count: number;
  last_month_loan_count: number;
  monthly_percentage_difference: number;
  percentage_difference: number;
}

interface LoanDefaultRate {
  total_non_rejected_loans: number;
  total_defaulted_loans: number;
  total_non_defaulted_loans: number;
  defaulted_percentage: number;
  non_defaulted_percentage: number;
}

interface LoanApprovalRate {
  total_loan_applications: number;
  total_approved_loans: number;
  total_declined_loans: number;
  total_pending_loans: number;
  approval_percentage: number;
  declined_percentage: number;
  pending_percentage: number;
}

interface LoanProduct {
  product_name: string;
  loan_type: string;
  total_loans: number;
  percentage: number;
}

interface LoanPerformingProducts {
  top_products: LoanProduct[];
  overall_total_loans: number;
}

interface PeriodStats {
  start_date: string | null;
  end_date: string | null;
  totalTransactionVolume: number;
  totalTransactionsProcessed: number;
  depositsCount: number;
  withdrawalsCount: number;
  totalDeposits: number;
  totalWithdrawals: number;
  netRevenue: number;
  totalRevenue: number;
  netProfit: number;
}

interface PercentageChanges {
  transactionVolumePercentageChange: number;
  transactionsProcessedPercentageChange: number;
  depositsPercentageChange: number;
  withdrawalsPercentageChange: number;
  netRevenuePercentageChange: number;
  totalRevenuePercentageChange: number;
  netProfitPercentageChange: number;
}

interface Filters {
  year: string;
  date_range: string | null;
}

interface TransactionStats {
  currentPeriod: PeriodStats;
  previousPeriod: PeriodStats;
  percentageChanges: PercentageChanges;
  filters: Filters;
}

interface LoanStats {
  totalLoanProducts: number;
  totalLoansCount: number;
  totalLoanProductPercentage: number;
  totalRevenueGenerated: number;
  totalRevenueGeneratedPercentage: number;
  totalAmountDisbursed: string;
  totalAmountDisbursedPercentage: number;
  loanDefaultRate: LoanDefaultRate;
  loanApprovalRate: LoanApprovalRate;
  loanPerformingProducts: LoanPerformingProducts;
  customerDemography: any; // Can be typed more specifically if needed
  currentStatDisbursedAmount: string;
  currentStatDisbursedPercentage: number;
  previousStatDisbursedAmount: number;
  previousStatDisbursedPercentage: number;
}

interface FinancialStatsData {
  totalRevenue: TotalRevenue;
  totalNetProfit: number;
  totalLoanVolume: TotalLoanVolume;
  loanStats: LoanStats;
  transactionStats: TransactionStats;
  customerCount: CustomerCount; // Add this line
}

interface ApiResponse {
  error: boolean;
  message: string;
  data: FinancialStatsData;
}

interface FinancialStatsState {
  data: FinancialStatsData | null;
  loading: boolean;
  error: string | null;
  selectedYear: string | null;
}

const initialState: FinancialStatsState = {
  data: null,
  loading: false,
  error: null,
  selectedYear: null,
};

const financialStatsSlice = createSlice({
  name: "financialStats",
  initialState,
  reducers: {
    // You can add reducers here if needed
    clearFinancialStats: (state) => {
      state.data = null;
      state.error = null;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Financial_stats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Financial_stats.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error === false) {
          state.data = action.payload.data;
          if (action.meta?.arg?.year) {
            state.selectedYear = action.meta.arg.year;
          }
        } else {
          state.error = action.payload.message || "Failed to fetch financial stats";
        }
      })
      .addCase(Financial_stats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch financial stats";
      });
  },
});

export const { clearFinancialStats, setSelectedYear } = financialStatsSlice.actions;
export default financialStatsSlice.reducer;