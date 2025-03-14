import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  _Loan_Disbursed,
  _Loan_volume,
  _revenue,
  dashboard_wallet,
  loan_approval_rates,
} from "./dashboardThunk";

interface WalletState {
  balance?: string | null;
  loading: boolean;
  error: string | null;
  total_revenue?: number | null;
  last_week_total_revenue?: number | null;
  percentage_difference?: number | null;
  total_loans?: number | null;
  approved_loans?: number | null;
  loan_approval_rate?: number | null;
  loan_disapproval_rate?: number | null;
  Total_Loan_volume?: number | null;
  Total_Loan_Disbursed?: number | null;
  percentage_difference_Total_Loan_Disbursed?:number
  percentage_difference_Total_Loan_volume?:number
}

// Initial state
const initialState: WalletState = {
  balance: null,
  loading: false,
  error: null,
  total_revenue: null,
  last_week_total_revenue: null,
  percentage_difference: null,
  Total_Loan_volume: null,
  Total_Loan_Disbursed: null,
  percentage_difference_Total_Loan_Disbursed:0,
  percentage_difference_Total_Loan_volume:0
};

interface WalletResponse {
  data: string;
  error: boolean;
  message: string;
}

// Define the state structure
interface WalletState {
  balance?: string | null;
  loading: boolean;
  error: string | null;
}

const walletSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    // Add synchronous actions here if needed
    clearWalletBalance: (state) => {
      state.balance = null;
      state.error = null;
      state.total_revenue = null;
      state.last_week_total_revenue = null;
      state.percentage_difference = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // Handle the pending state of the thunk

      //wallet balance
      .addCase(dashboard_wallet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Handle the fulfilled state of the thunk

      .addCase(
        dashboard_wallet.fulfilled,
        (state, action: PayloadAction<WalletResponse>) => {
          state.loading = false;
          state.balance = action.payload.data;
        }
      )
      // Handle the rejected state of the thunk
      .addCase(dashboard_wallet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch wallet balance";
      })

      //totat revenue
      .addCase(_revenue.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(_revenue.fulfilled, (state, action) => {
        state.loading = false;
        const { error, data, message } = action.payload;
        console.log({ action: action.payload });
        if (!error) {
          state.total_revenue = data.total_revenue;
          state.last_week_total_revenue = data.last_week_total_revenue;
          state.percentage_difference = data.percentage_difference;
        } else {
          state.error = message;
        }
      })
      .addCase(_revenue.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //loan approval
      .addCase(loan_approval_rates.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loan_approval_rates.fulfilled, (state, action) => {
        state.loading = false;
        const { error, data, message } = action.payload;
        console.log({ action: action.payload });
        if (!error) {
          state.total_loans = data.total_loans;
          state.approved_loans = data.approved_loans;
          state.loan_approval_rate = data.loan_approval_rate;
          state.loan_disapproval_rate = data.loan_disapproval_rate;
        } else {
          state.error = message;
        }
      })
      .addCase(loan_approval_rates.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //loan disbursed
      .addCase(_Loan_Disbursed.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(_Loan_Disbursed.fulfilled, (state, action) => {
        state.loading = false;
        const { error, data, message } = action.payload;
        console.log({ action: action.payload });
        if (!error) {
          
          state.Total_Loan_Disbursed = data.total_loan_disbursed;
          state.percentage_difference_Total_Loan_Disbursed=data.percentage_difference

        } else {
          state.error = message;
        }
      })
      .addCase(_Loan_Disbursed.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //loan volume
      .addCase(_Loan_volume.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(_Loan_volume.fulfilled, (state, action) => {
        state.loading = false;
        const { error, data, message } = action.payload;
        console.log({ action: action.payload });
        if (!error) {
          
          state.Total_Loan_volume = data.total_loan_count;
          state.percentage_difference_Total_Loan_volume=data.percentage_difference
        } else {
          state.error = message;
        }
      })
      .addCase(_Loan_volume.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
  },
});
export const { clearWalletBalance } = walletSlice.actions;
export default walletSlice.reducer;


// "data": {
//   "error": false,
//   "": 150000,
//   "last_week_loan_disbursed": 0,
//   "current_week_loan_disbursed": 150000,
//   "percentage_difference": 100
// }