import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loan_repayments_stats } from './repayment_thunk';

interface Year {
  year?: string;
}

interface LoanStats {
  count: number;
  amount: number;
}

interface RepaidStats extends LoanStats {
  percentage: number;
  amount_percentage: number;
}

interface UpcomingStats extends RepaidStats {}

interface OverdueStats extends RepaidStats {}

interface RepaymentRate {
  active_count: number;
  rejected_count: number;
  overdue_count: number;
  active_percentage: number;
  rejected_percentage: number;
  overdue_percentage: number;
}

interface LoanRepaymentsStatsData {
  total_loans: LoanStats;
  repaid: RepaidStats;
  upcoming: UpcomingStats;
  overdue: OverdueStats;
  repayment_rate: RepaymentRate;
}

interface LoanRepaymentsStatsResponse {
  error: boolean;
  message: string;
  data: LoanRepaymentsStatsData;
}

interface LoanRepaymentsStatsState {
  data: LoanRepaymentsStatsData | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoanRepaymentsStatsState = {
  data: null,
  loading: false,
  error: null,
};

const loanRepaymentsStatsSlice = createSlice({
  name: 'loanRepaymentsStats',
  initialState,
  reducers: {
    clearLoanRepaymentsStats: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loan_repayments_stats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loan_repayments_stats.fulfilled, (state, action: PayloadAction<LoanRepaymentsStatsResponse>) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(loan_repayments_stats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLoanRepaymentsStats } = loanRepaymentsStatsSlice.actions;

export default loanRepaymentsStatsSlice.reducer;