import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Customers_stats } from "./customer_thunk";


interface StatsData {
  totalCustomer: number;
  totalCustomerPercentage: number;
  totalAmountDisbursed: number;
  totalAmountDisbursedPercentage: number;
  totalProfitGenerated: number;
  totalProfitGeneratedPercentage: number;
}

interface CustomersStatsState {
  data: StatsData;
  loading: boolean;
  error: string | null;
}

const initialState: CustomersStatsState = {
  data: {
    totalCustomer: 0,
    totalCustomerPercentage: 0,
    totalAmountDisbursed: 0,
    totalAmountDisbursedPercentage: 0,
    totalProfitGenerated: 0,
    totalProfitGeneratedPercentage: 0,
  },
  loading: false,
  error: null,
};

const customersStatsSlice = createSlice({
  name: "customersStats",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(Customers_stats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(Customers_stats.fulfilled, (state, action: PayloadAction<{ data: StatsData }>) => {
        state.loading = false;
        state.data = action.payload.data;
      })
      .addCase(Customers_stats.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch stats.";
      });
  },
});

export default customersStatsSlice.reducer;
