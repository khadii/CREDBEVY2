import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchLoanRequests } from "./loanRequests_thunk"; // Ensure this import is correct


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

// Adjust the Pagination interface to match your API response exactly.
// Based on typical Laravel/Lumen pagination, it usually looks like this:
interface ApiPaginationResponse {
  current_page: number;
  data: LoanRequest[]; // Note: This 'data' is the actual items, which your thunk separates.
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
  total: number; // This is the total items
}


// Your current state's Pagination interface:
interface StatePagination { // Renamed to avoid conflict with the incoming API response structure
  currentPage: number;
  totalPages: number;
  totalItems: number; // This will come from API's 'total'
  perPage: number;    // This will come from API's 'per_page'
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

// This interface describes the EXACT shape of what fetchLoanRequests thunk returns
interface FetchLoanRequestsPayload {
    data: LoanRequest[]; // This is `response.data.data` from your thunk
    pagination: ApiPaginationResponse; // This is `response.data` from your thunk
}

interface LoanRequestsState {
  data: LoanRequest[];
  pagination: StatePagination; // Updated to StatePagination
  totalCount: number; // This property is correct
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
  totalCount: 0, // Initial state for totalCount
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
        state.data = action.payload.data; // Array of loan requests
        state.totalCount = action.payload.pagination.total; // Corrected: Get 'total' from 'pagination'
        
        // Map the API pagination structure to your desired state.pagination structure
        state.pagination = {
          currentPage: action.payload.pagination.current_page,
          totalPages: action.payload.pagination.last_page, // totalPages usually maps to last_page
          totalItems: action.payload.pagination.total,
          perPage: action.payload.pagination.per_page,
          links: action.payload.pagination.links,
          nextPageUrl: action.payload.pagination.next_page_url,
          prevPageUrl: action.payload.pagination.prev_page_url,
          firstPageUrl: action.payload.pagination.first_page_url,
          lastPageUrl: action.payload.pagination.last_page_url,
          from: action.payload.pagination.from,
          to: action.payload.pagination.to,
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