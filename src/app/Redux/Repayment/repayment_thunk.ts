import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

   interface LoanRepaymentParams {
  search?: string;
  start_due_date?: string;  // New due date range filter
  end_due_date?: string;
  start_disbursal_date?: string;  // New disbursal date range filter
  end_disbursal_date?: string;
  min_loan_duration?: number | string;  // New loan duration filters
  max_loan_duration?: number | string;
  single?: boolean;
  sort_by?: string;
  start_date?: string; 
  end_date?: string;   
  status?: string;
  approval_status?: string;
  limit?: number | string;
  paginate?: boolean;
  page?: number;  // Added pagination support
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Assuming LoanRepaymentParams is defined elsewhere, but for completeness:
interface LoanRepaymentParams {
  search?: string;
  start_due_date?: string;
  end_due_date?: string;
  start_disbursal_date?: string;
  end_disbursal_date?: string;
  min_loan_duration?: string | number | undefined
  max_loan_duration?: string | number | undefined
  single?: boolean;
  sort_by?: string;
  start_date?: string;
  end_date?: string;
  status?: string;
  approval_status?: string;
  limit?: string | number | undefined
  paginate?: boolean;
  page?: number;
}

// Assuming handleUnauthorizedError is defined elsewhere
declare function handleUnauthorizedError(): void; // Placeholder

export const loan_repayment = createAsyncThunk(
  "loan/repayments",
  async (params: LoanRepaymentParams, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      // Construct URLSearchParams from the params object
      const queryParams = new URLSearchParams();

      // Add all parameters to queryParams if they exist
      if (params.search) queryParams.append('search', params.search);
      if (params.start_due_date) queryParams.append('start_due_date', params.start_due_date);
      if (params.end_due_date) queryParams.append('end_due_date', params.end_due_date);
      if (params.start_disbursal_date) queryParams.append('start_disbursal_date', params.start_disbursal_date);
      if (params.end_disbursal_date) queryParams.append('end_disbursal_date', params.end_disbursal_date);
      
      // Handle numeric duration filters, convert to string for query params
      if (params.min_loan_duration !== undefined) queryParams.append('min_loan_duration', String(params.min_loan_duration));
      if (params.max_loan_duration !== undefined) queryParams.append('max_loan_duration', String(params.max_loan_duration));
      
      // Existing parameters
      if (params.single !== undefined) queryParams.append('single', String(params.single)); // Convert boolean to string
      if (params.sort_by) queryParams.append('sort_by', params.sort_by);
      if (params.start_date) queryParams.append('start_date', params.start_date);
      if (params.end_date) queryParams.append('end_date', params.end_date);
      if (params.status) queryParams.append('status', params.status);
      if (params.approval_status) queryParams.append('approval_status', params.approval_status);
      if (params.limit !== undefined) queryParams.append('limit', String(params.limit));
      if (params.paginate !== undefined) queryParams.append('paginate', String(params.paginate)); // Convert boolean to string
      if (params.page !== undefined) queryParams.append('page', String(params.page));

      // Construct the full URL with query parameters
      const url = `${BASE_URL}/api/partner/loan-repayments/all-loans?${queryParams.toString()}`;

      const response = await axios.get( // Changed to axios.get
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        data: response.data.data,
        pagination: response.data
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        handleUnauthorizedError();
        return rejectWithValue("Session expired. Please login again");
      }
      return rejectWithValue(
        error.response?.data?.message || 
        "An error occurred while fetching loan repayments"
      );
    }
  }
);

    interface UserProps {
        
        user_id:string
      }
      
  
      export const single_loan_repayments = createAsyncThunk(
        "single_loan_repayments",
        async ( user_details: UserProps, { rejectWithValue }: { rejectWithValue: Function }) => {
          try {
            const token = Cookies.get("authToken");
            if (!token) {
              return rejectWithValue("Authentication token is missing.");
            }
      const {user_id}=user_details
            const response = await axios.get(
              `${BASE_URL}/api/partner/loan-repayments/loan/${user_id}`,
              
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
        })



       

  interface Year {
    year?:string,
  }
export const loan_repayments_stats = createAsyncThunk(
    "loan_repayments_stats",
    async (Year: Year, { rejectWithValue }) => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.post(
          `${BASE_URL}/api/partner/loan-repayments/stats`,
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



 
  interface Year {
    year?:string,
    month?: string,
    week?: string
  }
export const loan_repayments_trend = createAsyncThunk(
    "loan_repayments_trend",
    async (Year: Year, { rejectWithValue }) => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.post(
          `${BASE_URL}/api/partner/loan-repayments/trend`,
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

  