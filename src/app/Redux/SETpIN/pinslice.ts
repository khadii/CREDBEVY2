// setPinSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { setPin } from "./pin_thunk";


// Interface for the state of the set PIN operation
interface SetPinState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null; // To store the success message from the API
}

const initialState: SetPinState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

const setPinSlice = createSlice({
  name: "setPin",
  initialState,
  reducers: {
    // Reducer to reset the state, useful after a successful operation or on component unmount
    resetSetPinState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPin.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.message = null;
      })
      .addCase(setPin.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.error === false) {
          state.success = true;
          state.message = action.payload.message;
        } else {
          state.success = false;
          state.error = action.payload.message || "Failed to set transaction PIN";
        }
      })
      .addCase(setPin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string || "Failed to set transaction PIN";
        state.message = null;
      });
  },
});

export const { resetSetPinState } = setPinSlice.actions;

// Selectors for convenience
export const selectSetPinLoading = (state: { setPin: SetPinState }) => state.setPin.loading;
export const selectSetPinSuccess = (state: { setPin: SetPinState }) => state.setPin.success;
export const selectSetPinError = (state: { setPin: SetPinState }) => state.setPin.error;
export const selectSetPinMessage = (state: { setPin: SetPinState }) => state.setPin.message;

export default setPinSlice.reducer;