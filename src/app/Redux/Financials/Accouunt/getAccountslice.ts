import { createSlice } from "@reduxjs/toolkit";
import { GetAccount } from "./getAccountthunk";


interface AccountData {
  account_number: string;
  account_name: string;
  bank_name: string;
  wallet_balance: string;
}

interface AccountState {
  data: AccountData | null;
  loading: boolean;
  error: string | null;
}

const initialState: AccountState = {
  data: null,
  loading: false,
  error: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    // You can add additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(GetAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAccount.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error === false) {
          state.data = action.payload.data;
        } else {
          state.error = action.payload.message || "Failed to fetch account details";
        }
      })
      .addCase(GetAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to fetch account details";
      });
  },
});

export default accountSlice.reducer;