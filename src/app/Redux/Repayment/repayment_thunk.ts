import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { handleUnauthorizedError } from "../LoanHistory/loanRequests_thunk";
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
  
export const loan_repayment = createAsyncThunk(
  "loan/repayments",
  async (params: LoanRepaymentParams, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      // Prepare the request payload
      const payload: Record<string, any> = {};

      // Add all parameters to payload if they exist
      if (params.search) payload.search = params.search;
      if (params.start_due_date) payload.start_due_date = params.start_due_date;
      if (params.end_due_date) payload.end_due_date = params.end_due_date;
      if (params.start_disbursal_date) payload.start_disbursal_date = params.start_disbursal_date;
      if (params.end_disbursal_date) payload.end_disbursal_date = params.end_disbursal_date;
      
      // Handle numeric duration filters
      if (params.min_loan_duration !== undefined) payload.min_loan_duration = Number(params.min_loan_duration);
      if (params.max_loan_duration !== undefined) payload.max_loan_duration = Number(params.max_loan_duration);
      
      // Existing parameters
      if (params.single !== undefined) payload.single = params.single;
      if (params.sort_by) payload.sort_by = params.sort_by;
      if (params.start_date) payload.start_date = params.start_date;
      if (params.end_date) payload.end_date = params.end_date;
      if (params.status) payload.status = params.status;
      if (params.approval_status) payload.approval_status = params.approval_status;
      if (params.limit !== undefined) payload.limit = Number(params.limit);
      if (params.paginate !== undefined) payload.paginate = params.paginate;
      if (params.page !== undefined) payload.page = params.page;

      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-repayments/all-loans`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        data: response.data.data,
        pagination: response.data.meta || {} // Adjust according to your API response
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

  