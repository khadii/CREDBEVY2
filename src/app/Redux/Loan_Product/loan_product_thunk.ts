import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to clear token and potentially redirect (optional)
const handleUnauthorizedError = () => {
  Cookies.remove("authToken");
  // Optionally, you can redirect the user to the login page here.
  // window.location.href = '/login';
};

// Define an interface for the credentials
interface LoanProductCredentials {
  product_name: any;
  loan_type: any;
  repayment_frequency: any;
  minimum_amount: any;
  maximum_amount: any;
  duration: any;
  interest_rate: any;
  discount_percentage: any;
  discount_duration: any;
  minimum_credit_score: any;
  maximum_credit_score: any;
  minimum_income: any;
  employment_status: any;
  category: any;
  collateral_uuids: any[];
}

export const _create_loan_product = createAsyncThunk(
  "dashboard/_create_loan_product",
  async (credentials: LoanProductCredentials, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) { // Added check for missing token before API call
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }
      console.log("Token from cookies:", token);

      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-products/add-loan-product`,
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleUnauthorizedError();
          return rejectWithValue("Unauthorized: Please log in again.");
        }
        return rejectWithValue(error.response.data.message || "Unauthorized");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);

interface FiltersProps {
  search?: string;
  type?: string; // Added for loan product type
  sort_by?: string;
  start_date?: string;
  end_date?: string;
  min_loan_duration?: number | string; // Added for duration filtering
  max_loan_duration?: number | string; // Added for duration filtering
  single?: boolean;
  limit?: string;
  paginate?: boolean;
  page?: number;
  filter_by?: string;
}

export const _loan_products_all = createAsyncThunk(
  "loanProducts/_loan_products_all",
  async (filters: FiltersProps, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }

      // Build query parameters object
      const queryParams: Record<string, string> = {};

      // Add all filter parameters if they exist
      if (filters.search && filters.search !== "") queryParams.search = filters.search;
      if (filters.type && filters.type !== "") queryParams.type = filters.type; // Added type filter
      if (filters.sort_by && filters.sort_by !== "") queryParams.sort_by = filters.sort_by;
      if (filters.start_date && filters.start_date !== "") queryParams.start_date = filters.start_date;
      if (filters.end_date && filters.end_date !== "") queryParams.end_date = filters.end_date;
      
      // Handle loan duration filters
      if (filters.min_loan_duration !== undefined && filters.min_loan_duration !== "") 
        queryParams.min_loan_duration = filters.min_loan_duration.toString();
      if (filters.max_loan_duration !== undefined && filters.max_loan_duration !== "") 
        queryParams.max_loan_duration = filters.max_loan_duration.toString();
      
      // Handle boolean parameters
      if (typeof filters.single === 'boolean') queryParams.single = filters.single.toString();
      if (typeof filters.paginate === 'boolean') queryParams.paginate = filters.paginate.toString();
      
      // Other parameters
      if (filters.limit && filters.limit !== "") queryParams.limit = filters.limit.toString();
      if (filters.filter_by && filters.filter_by !== "") queryParams.filter_by = filters.filter_by;
      if (filters.page !== undefined) queryParams.page = filters.page.toString();

      const response = await axios.get(
        `${BASE_URL}/api/partner/loan-products/all`, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: queryParams
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleUnauthorizedError();
          return rejectWithValue("Unauthorized: Please log in again.");
        }
        return rejectWithValue(error.response.data.message || "Unauthorized");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);

interface Year {
  year?: string;
}

export const _loan_products_stats = createAsyncThunk(
  "loanProducts/_loan_products_stats",
  async (Year: Year, { rejectWithValue }) => {
    const { year } = Year;
    try {
      const token = Cookies.get("authToken");
      if (!token) { // Added check for missing token before API call
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }
      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-products/stats?page=${year}`,
        Year,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleUnauthorizedError();
          return rejectWithValue("Unauthorized: Please log in again.");
        }
        return rejectWithValue(error.response.data.message || "Unauthorized");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);

interface Year2 {
  year?: string | number;
  product_id: string | number;
}

export const _single_loan_products_stats = createAsyncThunk(
  "_single_loan_products_stats",
  async ({ year, product_id }: Year2, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }

      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-products/stats-per-product/${product_id}?page=${year}`,
        { year },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleUnauthorizedError();
          return rejectWithValue("Unauthorized: Please log in again.");
        }
        return rejectWithValue(error.response.data.message || "Unauthorized");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);

interface Delete {
  loan_product_ids?: any;
  action: any;
}

export const bulk_action = createAsyncThunk(
  "bulk_action",
  async ({ loan_product_ids, action }: Delete, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }

      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-products/bulk-action`,
        { loan_product_ids, action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleUnauthorizedError();
          return rejectWithValue("Unauthorized: Please log in again.");
        }
        return rejectWithValue(error.response.data.message || "Unauthorized");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);

interface LoanProductCredentialsPut {
  credentials: {
    product_name: any;
    loan_type: any;
    repayment_frequency: any;
    minimum_amount: any;
    maximum_amount: any;
    duration: any;
    interest_rate: any;
    discount_percentage: any;
    discount_duration: any;
    minimum_credit_score: any;
    maximum_credit_score: any;
    minimum_income: any;
    employment_status: any;
    category: any;
    collateral_uuids: any[];
  };
  product_id: string;
}

export const update_loan = createAsyncThunk(
  "update-loan",
  async ({ credentials, product_id }: LoanProductCredentialsPut, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }

      const response = await axios.put(
        `${BASE_URL}/api/partner/loan-products/update-loan-product/${product_id}`,
        credentials,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleUnauthorizedError();
          return rejectWithValue("Unauthorized: Please log in again.");
        }
        return rejectWithValue(error.response.data.message || "Unauthorized");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);

interface product_id_prop { // Renamed from 'product_id' to avoid conflict with parameter
  product_id?: any;
}

export const loan_products_single = createAsyncThunk(
  "loan-products-single",
  async (product_id: product_id_prop, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) { // Added check for missing token before API call
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }
      const response = await axios.get(
        `${BASE_URL}/api/partner/loan-products/single/${product_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleUnauthorizedError();
          return rejectWithValue("Unauthorized: Please log in again.");
        }
        return rejectWithValue(error.response.data.message || "Unauthorized");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);