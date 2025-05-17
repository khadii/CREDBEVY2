import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { repayment_vs_default_trend } from "./repayment_vs_default_trend_thunk";


interface RepaymentDefaultData {
  year: number;
  month?: number;
  week?: number;
  repayments: number;
  defaults: number;
}

interface RepaymentVsDefaultTrendState {
  data: {
    yearly: RepaymentDefaultData[];
    monthly: RepaymentDefaultData[];
    weekly: RepaymentDefaultData[];
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: RepaymentVsDefaultTrendState = {
  data: null,
  loading: false,
  error: null,
};

const repaymentVsDefaultTrendSlice = createSlice({
  name: "repaymentVsDefaultTrend",
  initialState,
  reducers: {
    clearRepaymentDefaultData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(repayment_vs_default_trend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        repayment_vs_default_trend.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload.data;
        }
      )
      .addCase(
        repayment_vs_default_trend.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch repayment vs default trend";
        }
      );
  },
});

export const { clearRepaymentDefaultData } = repaymentVsDefaultTrendSlice.actions;
export default repaymentVsDefaultTrendSlice.reducer;