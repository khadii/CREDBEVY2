// loanRequests_slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLoanRequests } from "./loanRequests_thunk";

interface LoanRequest {
  first_name: string;
  last_name: string;
  email: string;
  average_income: string;
  credit_score: string;
  interest_rate: string;
  loan_duration: number;
  amount_requested: string;
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

interface ApiPaginationResponse {
  current_page: number;
  data: LoanRequest[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface StatePagination {
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

interface FetchLoanRequestsPayload {
  data: LoanRequest[];
  pagination: ApiPaginationResponse;
  total_count: number;
}

interface LoanRequestsState {
  data: LoanRequest[];
  pagination: StatePagination;
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
    resetLoanRequests: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanRequests.fulfilled, (state, action: PayloadAction<FetchLoanRequestsPayload>) => {
        state.loading = false;
        state.data = action.payload.data;
        state.totalCount = action.payload.total_count;
        
        const apiPagination = action.payload.pagination;
        state.pagination = {
          currentPage: apiPagination.current_page,
          totalPages: apiPagination.last_page,
          totalItems: apiPagination.total,
          perPage: apiPagination.per_page,
          links: apiPagination.links,
          nextPageUrl: apiPagination.next_page_url,
          prevPageUrl: apiPagination.prev_page_url,
          firstPageUrl: apiPagination.first_page_url,
          lastPageUrl: apiPagination.last_page_url,
          from: apiPagination.from,
          to: apiPagination.to,
        };
      })
      .addCase(fetchLoanRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetLoanRequests } = loanRequestsSlice.actions;
export default loanRequestsSlice.reducer;