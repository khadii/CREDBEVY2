import { createSlice } from "@reduxjs/toolkit";
import { ConfirmPin } from "./pinthunk";

interface pin {
  ConfirmPin: {
    loading: boolean;
    success: boolean;
    error: string | null;
    message: string | null;
  };
}

const initialState: pin = {
  ConfirmPin: { loading: false, success: false, error: null, message: null },
};

const PinSlice = createSlice({
  name: "confirm-pin",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.ConfirmPin.loading = false;
      state.ConfirmPin.success = false;
      state.ConfirmPin.error = null;
      state.ConfirmPin.message = null;
    },
    resetPinState: (state) => {
      state.ConfirmPin = { ...initialState.ConfirmPin };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ConfirmPin.pending, (state) => {
        state.ConfirmPin.loading = true;
        state.ConfirmPin.success = false;
        state.ConfirmPin.error = null;
        state.ConfirmPin.message = null;
      })
      .addCase(ConfirmPin.fulfilled, (state, action) => {
        state.ConfirmPin.loading = false;
        state.ConfirmPin.success = !action.payload.error;
        state.ConfirmPin.message = action.payload.message || "Operation successful";
      })
      .addCase(ConfirmPin.rejected, (state, action) => {
        state.ConfirmPin.loading = false;
        state.ConfirmPin.success = false;
        state.ConfirmPin.error = (action.payload as string) || "PIN confirmation failed";
      });
  },
});

export const {  resetPinState } = PinSlice.actions;
export default PinSlice.reducer;