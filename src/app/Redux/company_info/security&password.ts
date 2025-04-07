import { createSlice } from "@reduxjs/toolkit";
import { security } from "./company_info_thunk";

interface Security {
  current_password: boolean;
  new_password: boolean;
  new_password_confirmation: boolean;
  two_fa: boolean;
}

interface SecurityState {
  data: Security | null;
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
}

const initialState: SecurityState = {
  data: null,
  loading: false,
  error: null,
  success: false,
  message: null,
};

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    resetSecurityState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(security.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(security.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.error === false;
        state.message = action.payload.message;
        state.data = action.payload.data;
      })
      .addCase(security.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetSecurityState } = securitySlice.actions;
export default securitySlice.reducer;
