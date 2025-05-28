import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Policy } from "./policy_thunk";

interface PolicyState {
  loading: boolean;
  error: string | null;
  success: boolean;
  message: string | null;
  data: any;
}

const initialState: PolicyState = {
  loading: false,
  error: null,
  success: false,
  message: null,
  data: null,
};

const policySlice = createSlice({
  name: "policy",
  initialState,
  reducers: {
    resetPolicyState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Policy.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(
        Policy.fulfilled,
        (
          state,
          action: PayloadAction<{
            error: boolean;
            message: string;
            data: any;
          }>
        ) => {
          state.loading = false;
          state.success = !action.payload.error;
          state.message = action.payload.message;
          state.data = action.payload.data;
        }
      )
      .addCase(Policy.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to accept policy";
        state.success = false;
      });
  },
});

export const { resetPolicyState } = policySlice.actions;
export default policySlice.reducer;
