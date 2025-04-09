import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { loan_products_single } from "./loan_product_thunk";

interface ProductId {
  product_id?: any;
}

interface LoanProductSingleState {
  loading: boolean;
  success: string | null;
  error: string | null;
  data: any;
}

const initialState: LoanProductSingleState = {
  loading: false,
  success: null,
  error: null,
  data: null,
};



const loanProductSingleSlice = createSlice({
    name: "loanProductSingle",
    initialState,
    reducers: {
      resetLoanProductSingleState: (state) => {
        state.loading = false;
        state.success = null;
        state.error = null;
        state.data = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loan_products_single.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = null;
        })
        .addCase(loan_products_single.fulfilled, (state, action) => {
          state.loading = false;
          state.success = "Loan product fetched successfully";
          state.data = action.payload.data;
        })
        .addCase(loan_products_single.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { resetLoanProductSingleState } = loanProductSingleSlice.actions;
  export default loanProductSingleSlice.reducer;