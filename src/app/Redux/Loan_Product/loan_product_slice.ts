import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { isTokenConsistent, isTokenValid } from "../isTokenValid";
import { _create_loan_product } from "./loan_product_thunk";

interface LoanProductState {
  loading: boolean;
  error: string | null;
  success: string | null;
  data: any | null;
}

interface LoanProduct {
  loanProduct: LoanProductState;
}

const initialState: LoanProduct = {
  loanProduct: {
    loading: false,
    error: null,
    success: null,
    data: null,
  },
};

const loanProducts = createSlice({
  name: "loanProduct",
  initialState,
  reducers: {
    resetLoanProductState: (state) => {
      state.loanProduct = initialState.loanProduct;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Loan Product Cases
      .addCase(_create_loan_product.pending, (state) => {
        state.loanProduct.loading = true;
        state.loanProduct.error = null;
        state.loanProduct.success = null;
      })
      .addCase(_create_loan_product.fulfilled, (state, action) => {
        state.loanProduct.loading = false;
        state.loanProduct.success = action.payload.message; 
        state.loanProduct.data = action.payload.data; 
      })
      .addCase(_create_loan_product.rejected, (state, action) => {
        state.loanProduct.loading = false;
        state.loanProduct.error = action.payload as string; 
      });
  },
});

export const { resetLoanProductState } = loanProducts.actions;
export default loanProducts.reducer;