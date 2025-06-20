// src/app/Redux/LoanHistory/loanDefaultRateSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Types
interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface LoanDefaultRateData {
  status: string;
  default_rate: number;
  active_loans: number;
  overdue_loans: number;
  total_unpaid_loans: number;
  total_loans: number;
}

interface LoanDefaultRateResponse {
  error: boolean;
  message: string;
  data: LoanDefaultRateData;
}

interface LoanDefaultRateState {
  pieChartData: PieChartData[] | null;
  loading: boolean;
  error: string | null;
  totalLoans: number | null;
}

// Initial state
const initialState: LoanDefaultRateState = {
  pieChartData: null,
  loading: false,
  error: null,
  totalLoans: null,
};

// Thunk
export const fetchLoanDefaultRate = createAsyncThunk(
  "loanDefaultRate/fetch",
  async (_, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      const response = await axios.get(
        `${BASE_URL}/api/partner/loan-history/loan-default-rate`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Failed to fetch loan default rate");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);

// Slice
const loanDefaultRateSlice = createSlice({
  name: 'loanDefaultRate',
  initialState,
  reducers: {
    resetLoanDefaultRate: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoanDefaultRate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLoanDefaultRate.fulfilled, (state, action: PayloadAction<LoanDefaultRateResponse>) => {
        state.loading = false;
        const responseData = action.payload.data;
        
        // Transform the API data into pie chart format
        state.pieChartData = [
          { 
            name: "Paid Loans", 
            value: responseData.total_loans - responseData.total_unpaid_loans, 
            color: "#156064" 
          },
          { 
            name: "Unpaid Loans", 
            value: responseData.total_unpaid_loans, 
            color: "#EC7910" 
          }
        ];
        
        state.totalLoans = responseData.total_loans;
        state.error = null;
      })
      .addCase(fetchLoanDefaultRate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.pieChartData = null;
        state.totalLoans = null;
      });
  },
});

// Export actions
export const { resetLoanDefaultRate } = loanDefaultRateSlice.actions;

// Export reducer
export default loanDefaultRateSlice.reducer;