import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resetTransactionPin } from './updatePinthunk';


interface PinState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PinState = {
  loading: false,
  error: null,
  success: false,
};

const pinSlice = createSlice({
  name: 'pinReset',
  initialState,
  reducers: {
    resetPinState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetTransactionPin.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetTransactionPin.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetTransactionPin.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to reset transaction PIN';
      });
  },
});

export const { resetPinState } = pinSlice.actions;

// Selectors
export const selectPinLoading = (state: { pin: PinState }) => state.pin.loading;
export const selectPinError = (state: { pin: PinState }) => state.pin.error;
export const selectPinSuccess = (state: { pin: PinState }) => state.pin.success;

export default pinSlice.reducer;