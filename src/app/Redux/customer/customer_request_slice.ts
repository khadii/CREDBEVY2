import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface ElectionFilters {
  search?: string;
  sort_by?: 'ASC' | 'DESC';
  start_date?: string;
  end_date?: string;
  single?: boolean | string;
  limit?: number | string;
  paginate?: boolean;
  filter_by?: 'interested' | 'not_interested' | string;
  approvalStatus?: 'pending' | 'approved' | 'declined' | string;
}

interface LoanRequest {
  first_name: string;
  last_name: string;
  average_income: number;
  credit_score: string;
  interest_rate: number;
  loan_duration: number;
  amount_requested: number;
  loan_name: string;
  loan_purpose: string;
  date_and_time: string;
  loan_uuid: string;
  info_status: string | null;
  repayment_status: string;
  image: string;
  total_expense_fee: string;
  indication_of_interest_expense_fee: number;
  approval_expense_fee: number;
}

interface LoanRequestsResponse {
  current_page: number;
  data: LoanRequest[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: Array<{
    url: string | null;
    label: string;
    active: boolean;
  }>;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

interface ApiResponse {
  error: boolean;
  message: string;
  data: {
    total_count: number;
    loan_requests: LoanRequestsResponse;
  };
}

interface LoanRequestsState {
  data: LoanRequestsResponse | null;
  loading: boolean;
  error: string | null;
  filters: ElectionFilters;
  totalCount: number;
}

const initialState: LoanRequestsState = {
  data: null,
  loading: false,
  error: null,
  filters: {},
  totalCount: 0,
};

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fetchCustomerLoanRequests = createAsyncThunk(
  'customers/loanRequests',
  async (filters: ElectionFilters, { rejectWithValue }) => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        return rejectWithValue('Authentication token is missing.');
      }

      const response = await axios.post<ApiResponse>(
        `${BASE_URL}/api/partner/customers/all-loan-requests`,
        filters,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || 'Unauthorized');
      } else if (error.request) {
        return rejectWithValue('No response from the server. Please check your network connection.');
      } else {
        return rejectWithValue('An unexpected error occurred. Please try again.');
      }
    }
  }
);

const loanRequestsSlice = createSlice({
  name: 'loanRequests',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {};
    },
    clearLoanRequests: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCustomerLoanRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCustomerLoanRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.loan_requests;
        state.totalCount = action.payload.data.total_count;
      })
      .addCase(fetchCustomerLoanRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, resetFilters, clearLoanRequests } = loanRequestsSlice.actions;

export default loanRequestsSlice.reducer;