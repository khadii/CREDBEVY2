import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLoanRequests } from "./loanRequests_thunk";


interface LoanRequest {
  first_name: string;
  last_name: string;
  average_income: number;
  credit_score: string;
  interest_rate: number;
  loan_duration: number;
  amount_requested: number;
  loan_name: string;
  loan_purpose: string;
  date_and_time: string;
  loan_uuid: string;
  info_status: string | null;
  repayment_status: string;
  image: string;
  total_expense_fee: string;
  indication_of_interest_expense_fee: number;
  approval_expense_fee: number;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
  firstPageUrl: string;
  lastPageUrl: string;
  from: number;
  to: number;
}

interface LoanRequestsState {
  data: LoanRequest[];
  pagination: Pagination;
  totalCount: number;
  loading: boolean;
  error: string | null;
}

const initialState: LoanRequestsState = {
  data: [],
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    perPage: 10,
    links: [],
    nextPageUrl: null,
    prevPageUrl: null,
    firstPageUrl: '',
    lastPageUrl: '',
    from: 0,
    to: 0,
  },
  totalCount: 0,
  loading: false,
  error: null,
};

const loanRequestsSlice = createSlice({
  name: "loanhistoryRequests",
  initialState,
  reducers: {
    // You can add manual reducers here if needed
    resetLoanRequests: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = action.payload.pagination;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchLoanRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetLoanRequests } = loanRequestsSlice.actions;
export default loanRequestsSlice.reducer;