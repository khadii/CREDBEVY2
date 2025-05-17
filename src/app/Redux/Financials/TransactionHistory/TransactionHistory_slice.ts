import { createSlice } from "@reduxjs/toolkit"; 
import { transactionhistory } from "./TransactionHistory";
// Interface definitions for the response structure
interface Transaction {
  user_uuid: string;
  amount: number;
  account_name: string;
  transaction_reference: string;
  transaction_type: string;
  transaction_date: string;
  verified: string;
  source: number;
}

interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginatedResult {
  current_page: number;
  data: Transaction[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface TransactionHistoryData {
  count: number;
  result: PaginatedResult;
}

interface ApiResponse {
  error: boolean;
  message: string;
  data: TransactionHistoryData;
}

interface TransactionHistoryState {
  data: TransactionHistoryData | null;
  loading: boolean;
  error: string | null;
  filters: SearchFilters;
}


interface SearchFilters {
  year: string;
  search: string;
  start_date: string;
  end_date: string;
  min_amount: string;
  max_amount: string;
  page?: number; 
}

const initialState: TransactionHistoryState = {
  data: null,
  loading: false,
  error: null,
  filters: {
    year: '',
    search: '',
    start_date: '',
    end_date: '',
    min_amount: '',
    max_amount: '',
    page: 1
  }
};

const transactionHistorySlice = createSlice({
  name: "transactionHistory",
  initialState,
  reducers: {
    clearTransactionHistory: (state) => {
      state.data = null;
      state.error = null;
    },
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setPage: (state, action) => {
      state.filters.page = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(transactionhistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(transactionhistory.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error === false) {
          state.data = action.payload.data;
        } else {
          state.error = action.payload.message || "Failed to fetch transaction history";
        }
      })
      .addCase(transactionhistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch transaction history";
      });
  },
});

export const { 
  clearTransactionHistory, 
  setFilters, 
  resetFilters,
  setPage
} = transactionHistorySlice.actions;

// Selectors
export const selectTransactions = (state: { transactionHistory: { data: { result: { data: any; }; }; }; }) => state.transactionHistory.data?.result.data || [];
export const selectPagination = (state: { transactionHistory: { data: { result: { current_page: any; last_page: any; total: any; per_page: any; links: any; }; }; }; }) => ({
  currentPage: state.transactionHistory.data?.result.current_page || 1,
  totalPages: state.transactionHistory.data?.result.last_page || 1,
  totalItems: state.transactionHistory.data?.result.total || 0,
  perPage: state.transactionHistory.data?.result.per_page || 15,
  links: state.transactionHistory.data?.result.links || []
});
export const selectFilters = (state: { transactionHistory: { filters: any; }; }) => state.transactionHistory.filters;
export const selectLoading = (state: { transactionHistory: { loading: any; }; }) => state.transactionHistory.loading;
export const selectError = (state: { transactionHistory: { error: any; }; }) => state.transactionHistory.error;

export default transactionHistorySlice.reducer;