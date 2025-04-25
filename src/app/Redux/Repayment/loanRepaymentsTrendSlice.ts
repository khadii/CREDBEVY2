import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';
import { loan_repayments_trend } from './repayment_thunk';

const BASE_URL = 'your_base_url_here';



interface RepaymentData {
  [key: string]: string;
}

interface LoanRepaymentsTrendResponse {
  error: boolean;
  message: string;
  data: {
    total_repayment_by_month: RepaymentData;
    total_repayment_by_week: RepaymentData;
    total_repayment_by_year: RepaymentData;
    total_sum_repayment_by_month: number;
    total_sum_repayment_by_week: number;
    total_sum_repayment_by_year: number;
  };
}

interface LoanRepaymentsTrendState {
  data: LoanRepaymentsTrendResponse['data'] | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoanRepaymentsTrendState = {
  data: null,
  loading: false,
  error: null,
};



const loanRepaymentsTrendSlice = createSlice({
  name: 'loanRepaymentsTrend',
  initialState,
  reducers: {
    clearLoanRepaymentsTrend: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loan_repayments_trend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loan_repayments_trend.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(loan_repayments_trend.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLoanRepaymentsTrend } = loanRepaymentsTrendSlice.actions;
export default loanRepaymentsTrendSlice.reducer;