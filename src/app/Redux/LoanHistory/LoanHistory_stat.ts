import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';


 const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
// Types
interface LoanDefaultRate {
  total_non_rejected_loans: number;
  total_defaulted_loans: number;
  total_non_defaulted_loans: number;
  defaulted_percentage: number;
  non_defaulted_percentage: number;
}

interface LoanApprovalRate {
  total_loan_applications: number;
  total_approved_loans: number;
  total_declined_loans: number;
  total_pending_loans: number;
  approval_percentage: number;
  declined_percentage: number;
  pending_percentage: number;
}

interface TopProduct {
  product_name: string;
  loan_type: string;
  total_loans: number;
  percentage: number;
}

interface LoanPerformingProducts {
  top_products: TopProduct[];
  overall_total_loans: number;
}

interface CustomerDemography {
  [key: string]: any;
}

interface LoanStatsData {
  totalLoanProducts: number;
  totalLoansCount: number;
  totalLoanProductPercentage: number;
  totalRevenueGenerated: number;
  totalRevenueGeneratedPercentage: number;
  totalAmountDisbursed: string;
  totalAmountDisbursedPercentage: number;
  loanDefaultRate: LoanDefaultRate;
  loanApprovalRate: LoanApprovalRate;
  loanPerformingProducts: LoanPerformingProducts;
  customerDemography: CustomerDemography | null;
  currentStatDisbursedAmount: string;
  currentStatDisbursedPercentage: number;
  previousStatDisbursedAmount: number;
  previousStatDisbursedPercentage: number;
}

interface LoanStatsResponse {
  error: boolean;
  message: string;
  data: LoanStatsData;
}

interface LoanStatsState {
  data: LoanStatsData | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: LoanStatsState = {
  data: null,
  loading: false,
  error: null,
};

// Thunk
export const LoanHistory_stats = createAsyncThunk(
  "LoanHistory_stats",
  async (Year: any, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-history/stats`,
        Year,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; 
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Unauthorized");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);

// Slice
const loanStatsSlice = createSlice({
  name: 'historyloanStats',
  initialState,
  reducers: {
    resetLoanStats: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoanHistory_stats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoanHistory_stats.fulfilled, (state, action: PayloadAction<LoanStatsResponse>) => {
        state.loading = false;
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(LoanHistory_stats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = null;
      });
  },
});

// Export actions
export const { resetLoanStats } = loanStatsSlice.actions;

// Export reducer
export default loanStatsSlice.reducer;