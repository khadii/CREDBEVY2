import { createSlice } from "@reduxjs/toolkit";
import { ConfirmPin } from "./pinthunk";

interface PinActionState {
  loading: boolean;
  success: boolean;
  error: string | null;
  message: string | null;
}

interface PinState {
  interest: PinActionState;
  accept: PinActionState;
  reject: PinActionState;
}

const initialState: PinState = {
  interest: { loading: false, success: false, error: null, message: null },
  accept: { loading: false, success: false, error: null, message: null },
  reject: { loading: false, success: false, error: null, message: null },
};

const PinSlice = createSlice({
  name: "pin",
  initialState,
  reducers: {
    resetPinState: (state) => {
      Object.assign(state, initialState);
    },
    resetPinActionState: (
      state,
      action: { payload: "interest" | "accept" | "reject" }
    ) => {
      state[action.payload] = initialState[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ConfirmPin.pending, (state, action) => {
        const { actionType } = action.meta.arg;
        state[actionType] = {
          ...initialState[actionType],
          loading: true,
        };
      })
      .addCase(ConfirmPin.fulfilled, (state, action) => {
        const { actionType } = action.meta.arg;
        state[actionType] = {
          loading: false,
          success: true,
          error: null,
          message: action.payload.message || "Operation successful",
        };
      })
      .addCase(ConfirmPin.rejected, (state, action) => {
        const actionType = action.meta.arg.actionType;
        state[actionType] = {
          loading: false,
          success: false,
          error: action.payload?.message || "PIN confirmation failed",
          message: null,
        };
      });
  },
});

export const { resetPinState, resetPinActionState } = PinSlice.actions;
export default PinSlice.reducer;
