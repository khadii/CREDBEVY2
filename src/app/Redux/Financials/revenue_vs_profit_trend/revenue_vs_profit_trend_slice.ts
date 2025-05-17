import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { revenue_vs_profit_trend } from "./revenue_vs_profit_trend_thunk";


interface RevenueProfitData {
  month?: number;
  day?: number | string;
  revenue: number;
  expense: number;
  profit: number;
}

interface Filters {
  year: string;
  month: string;
  week_start: string;
}

interface RevenueVsProfitTrendState {
  data: {
    by_year: RevenueProfitData[];
    by_month: RevenueProfitData[];
    by_week: RevenueProfitData[];
    filters: Filters;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: RevenueVsProfitTrendState = {
  data: null,
  loading: false,
  error: null,
};

const revenueVsProfitTrendSlice = createSlice({
  name: "revenueVsProfitTrend",
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
    clearRevenueProfitData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(revenue_vs_profit_trend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        revenue_vs_profit_trend.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload.data;
        }
      )
      .addCase(
        revenue_vs_profit_trend.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch revenue vs profit trend";
        }
      );
  },
});

export const { clearRevenueProfitData } = revenueVsProfitTrendSlice.actions;
export default revenueVsProfitTrendSlice.reducer;