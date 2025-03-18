import { createSlice } from "@reduxjs/toolkit";
import { _loan_products_all, _loan_products_stats } from "./loan_product_thunk"; // Assuming you add the new thunk

interface LoanProductsState {
  data: any; // API response data for loan products
  loading: boolean; // Loading state
  error: string | null; // Error message
  tabledata: any[]; // Table data extracted from the API response
  total: any; // Total pages for pagination
  total_count: any; // Total count of loan products
  loanProductsStats: { // New state for loan products stats
    data: any; // API response data for loan products stats
    loading: boolean; // Loading state for stats
    error: string | null; // Error message for stats
  };
}

const initialState: LoanProductsState = {
  data: null,
  loading: false,
  error: null,
  tabledata: [],
  total: null,
  total_count: null,
  loanProductsStats: { // Initial state for loan products stats
    data: null,
    loading: false,
    error: null,
  },
};

const loanProductsTable = createSlice({
  name: "loanProductsTable",
  initialState,
  reducers: {
    resetLoanProductsState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.tabledata = [];
      state.total = null;
      state.total_count = null;
    },
    resetLoanProductsStatsState: (state) => { // New reducer to reset stats state
      state.loanProductsStats.data = null;
      state.loanProductsStats.loading = false;
      state.loanProductsStats.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Existing cases for _loan_products_all
      .addCase(_loan_products_all.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(_loan_products_all.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.tabledata = action.payload.data.loan_products.data;
        state.total = action.payload.data.loan_products.last_page;
        state.total_count = action.payload.data.total_count;
      })
      .addCase(_loan_products_all.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // New cases for _loan_products_stats
      .addCase(_loan_products_stats.pending, (state) => {
        state.loanProductsStats.loading = true;
        state.loanProductsStats.error = null;
      })
      .addCase(_loan_products_stats.fulfilled, (state, action) => {
        state.loanProductsStats.loading = false;
        state.loanProductsStats.data = action.payload.data;
      })
      .addCase(_loan_products_stats.rejected, (state, action) => {
        state.loanProductsStats.loading = false;
        state.loanProductsStats.error = action.payload as string;
      });
  },
});

export const { resetLoanProductsState, resetLoanProductsStatsState } = loanProductsTable.actions;
export default loanProductsTable.reducer;