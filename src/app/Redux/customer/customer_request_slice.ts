import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

interface CustomerFilters {
  search?: string;
  sort_by?:any
  start_date?: string;
  end_date?: string;
  single?: string; // This might be a boolean in other thunks, check API if it's string or boolean
  limit?: string;
  paginate?: boolean;
  filter_by?: string; // This seems generic, might need specific filters like 'status'
  approvalStatus?: string;
  page?: number;
  email?: string; // Added for email filter
  min_credit_score?: number | string; // Added for credit score filter
  max_credit_score?: number | string; // Added for credit score filter
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

// Helper function for unauthorized error handling
export const handleUnauthorizedError = () => {
  Cookies.remove("authToken");
  // Optionally, you can redirect the user to the login page here.
  // window.location.href = '/login';
};

export const fetchCustomerLoanRequests = createAsyncThunk(
  'customers/fetchCustomers',
  async (filters: CustomerFilters, { rejectWithValue }) => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        handleUnauthorizedError(); // Call the helper function
        return rejectWithValue('Authentication token is missing.');
      }

      // Build query parameters object
      const queryParams: Record<string, string> = {};

      // Add all filter parameters if they exist and are not empty
      if (filters.search && filters.search !== "") queryParams.search = filters.search;
      if (filters.sort_by && filters.sort_by !== "") queryParams.sort_by = filters.sort_by;
      if (filters.start_date && filters.start_date !== "") queryParams.start_date = filters.start_date;
      if (filters.end_date && filters.end_date !== "") queryParams.end_date = filters.end_date;
      
      // Handle boolean parameters, convert to string
      if (typeof filters.single === 'boolean') queryParams.single = filters.single;
      else if (filters.single !== undefined && filters.single !== null && filters.single !== "") queryParams.single = filters.single;

      if (typeof filters.paginate === 'boolean') queryParams.paginate = filters.paginate.toString();
      else if (filters.paginate !== undefined && filters.paginate !== null && filters.paginate !== "") queryParams.paginate = filters.paginate;
      
      // Other parameters
      if (filters.limit && filters.limit !== "") queryParams.limit = filters.limit.toString();
      if (filters.filter_by && filters.filter_by !== "") queryParams.filter_by = filters.filter_by;
      if (filters.approvalStatus && filters.approvalStatus !== "") queryParams.approvalStatus = filters.approvalStatus;
      if (filters.page !== undefined) queryParams.page = filters.page.toString();

      // Specific filters for CustomerFilterModal
      if (filters.email && filters.email !== "") queryParams.email = filters.email;
      if (filters.min_credit_score !== undefined && filters.min_credit_score !== null && filters.min_credit_score !== "") 
        queryParams.min_credit_score = filters.min_credit_score.toString();
      if (filters.max_credit_score !== undefined && filters.max_credit_score !== null && filters.max_credit_score !== "") 
        queryParams.max_credit_score = filters.max_credit_score.toString();

      const response = await axios.get<ApiResponse>( 
        `${BASE_URL}/api/partner/customers/all-customers`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: queryParams // Pass filters as query parameters
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleUnauthorizedError();
          return rejectWithValue("Unauthorized: Please log in again.");
        }
        return rejectWithValue(error.response.data.message || 'An error occurred.');
      } else if (error.request) {
        return rejectWithValue('No response from server. Please check your network connection.');
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
