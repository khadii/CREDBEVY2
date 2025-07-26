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

// This interface defines the pagination metadata, which is nested under 'pagination'
interface PaginationMetaData {
  current_page: number;
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

// This interface defines the exact shape of what loan_repayment thunk returns
interface LoanRepaymentPayload {
  data: LoanRepaymentItem[];
  pagination: PaginationMetaData; // Note: Renamed from LoanRepaymentResponse to avoid confusion if it's not the root.
                                  // In your thunk, you called this 'response.data', which is the full pagination object.
}

interface LoanRepaymentState {
  data: LoanRepaymentPayload | null; // <-- Changed this type
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
        // action.payload now correctly matches LoanRepaymentPayload
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