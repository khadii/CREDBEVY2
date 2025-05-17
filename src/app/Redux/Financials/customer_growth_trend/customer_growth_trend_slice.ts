import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { customer_growth_trend } from "./customer_growth_trend_thunk";


interface CustomerGrowthData {
  month?: number;
  day?: number | string;
  customer_count: number;
  growth_percentage: string;
}

interface Filters {
  year: string;
  month: string;
  partner_id: {
    partner_id: string;
    partner_name: string;
    partner_logo: string | null;
    // Include all other partner_id fields from the response
    [key: string]: any;
  };
}

interface CustomerGrowthTrendState {
  data: {
    customer_growth_by_year: CustomerGrowthData[];
    customer_growth_by_month: CustomerGrowthData[];
    customer_growth_by_week: CustomerGrowthData[];
    total_customers_by_year: number;
    total_customers_by_month: number;
    total_customers_by_week: number;
    filters: Filters;
  } | null;
  loading: boolean;
  error: string | null;
}

const initialState: CustomerGrowthTrendState = {
  data: null,
  loading: false,
  error: null,
};

const customerGrowthTrendSlice = createSlice({
  name: "customerGrowthTrend",
  initialState,
  reducers: {
    // Add any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(customer_growth_trend.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        customer_growth_trend.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.data = action.payload.data;
        }
      )
      .addCase(
        customer_growth_trend.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch customer growth trend";
        }
      );
  },
});

export default customerGrowthTrendSlice.reducer;