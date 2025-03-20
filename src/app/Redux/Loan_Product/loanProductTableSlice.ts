import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _loan_products_all, _loan_products_stats, _single_loan_products_stats } from "./loan_product_thunk";

interface LoanProductsState {
  data: any; 
  loading: boolean; 
  error: string | null; 
  tabledata: any[];
  total: any; 
  total_count: any;
  loanProductsStats: { 
    data: any;
    loading: boolean;
    error: string | null; 
    
  };
  singleLoanProduct: { 
    data: any; 
    loading: boolean;
    error: string | null; 

  };
}

const initialState: LoanProductsState = {
  data: null,
  loading: false,
  error: null,
  tabledata: [],
  total: null,
  total_count: null,
  loanProductsStats: { 
    data: null,
    loading: false,
    error: null,
  },
  singleLoanProduct: { 
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
    resetLoanProductsStatsState: (state) => { 
      state.loanProductsStats.data = null;
      state.loanProductsStats.loading = false;
      state.loanProductsStats.error = null;
    },
    resetSingleLoanProductState: (state) => { 
      state.singleLoanProduct.data = null;
      state.singleLoanProduct.loading = false;
      state.singleLoanProduct.error = null;
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
      })

      // New cases for fetchLoan (single loan product)
      .addCase(_single_loan_products_stats.pending, (state) => {
        state.singleLoanProduct.loading = true;
        state.singleLoanProduct.error = null;
      })
      .addCase(_single_loan_products_stats.fulfilled, (state, action) => {
        state.singleLoanProduct.loading = false;
        state.singleLoanProduct.data = action.payload;
      })
      .addCase(_single_loan_products_stats.rejected, (state, action) => {
        state.singleLoanProduct.loading = false;
        state.singleLoanProduct.error = action.payload as string;
      });
  },
});

export const {
  resetLoanProductsState,
  resetLoanProductsStatsState,
  resetSingleLoanProductState, 
} = loanProductsTable.actions;

export default loanProductsTable.reducer;