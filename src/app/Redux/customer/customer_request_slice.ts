import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface CustomerFilters {
  search?: string;
  sort_by?: 'ASC' | 'DESC';
  start_date?: string;
  end_date?: string;
  single?: string;
  limit?: string;
  paginate?: boolean;
  filter_by?: string;
  approvalStatus?: string;
  page?: number;
}

interface Customer {
  uuid: string;
  first_name: string;
  last_name: string;
  email: string;
  telephone: string;
  credit_score: string;
  approval_status: string;
  created_at: string;
  loan_count: number;
}

interface CustomersResponse {
  current_page: number;
  data: Customer[];
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
    customers: CustomersResponse;
  };
}

interface CustomersState {
  data: CustomersResponse | null;
  loading: boolean;
  error: string | null;
  filters: CustomerFilters;
  totalCount: number;
}

const initialState: CustomersState = {
  data: null,
  loading: false,
  error: null,
  filters: {},
  totalCount: 0,
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const fetchCustomerLoanRequests = createAsyncThunk(
  'customers/fetchCustomers',
  async (filters: CustomerFilters, { rejectWithValue }) => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        return rejectWithValue('Authentication token is missing.');
      }

      const response = await axios.post<ApiResponse>(
        `${BASE_URL}/api/partner/customers/all-customers`,
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
        return rejectWithValue('No response from server. Please check your network.');
      } else {
        return rejectWithValue('An unexpected error occurred. Please try again.');
      }
    }
  }
);

const customerRequestSlice = createSlice({
  name: 'customerLoanRequests',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = {};
    },
    clearCustomers: (state) => {
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
        state.data = action.payload.data.customers;
        state.totalCount = action.payload.data.total_count;
      })
      .addCase(fetchCustomerLoanRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, resetFilters, clearCustomers } = customerRequestSlice.actions;

export default customerRequestSlice.reducer;