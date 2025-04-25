import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loan_repayment } from "./repayment_thunk";

interface LoanRepaymentItem {
  uuid: string;
  user_name: string;
  date_due: string | null;
  amount_due: number;
  amount_paid: number;
  disbursal_date: string | null;
  duration: number;
  status: string;
  approvalStatus: string;
  created_at: string;
}

interface PaginationLinks {
  url: string | null;
  label: string;
  active: boolean;
}

interface LoanRepaymentResponse {
  current_page: number;
  data: LoanRepaymentItem[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLinks[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}



interface LoanRepaymentState {
  data: LoanRepaymentResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoanRepaymentState = {
  data: null,
  loading: false,
  error: null,
};



const loanRepaymentSlice = createSlice({
  name: "loanRepayment",
  initialState,
  reducers: {
    clearLoanRepaymentData: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loan_repayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loan_repayment.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loan_repayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearLoanRepaymentData } = loanRepaymentSlice.actions;
export default loanRepaymentSlice.reducer;