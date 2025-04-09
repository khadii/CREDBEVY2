import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { update_loan } from "./loan_product_thunk";

interface LoanProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: any | null;
}

const initialState: LoanProductState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const loanProductSliceFormUpdate = createSlice({
  name: "loanProductFormUpdate",
  initialState,
  reducers: {
    resetLoanProductStateFormUpdate: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(update_loan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.data = null;
      })
      .addCase(update_loan.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(update_loan.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string ?? "Failed to update loan product";
        state.data = null;
      });
  },
});

export const { resetLoanProductStateFormUpdate } = loanProductSliceFormUpdate.actions;
export default loanProductSliceFormUpdate.reducer;