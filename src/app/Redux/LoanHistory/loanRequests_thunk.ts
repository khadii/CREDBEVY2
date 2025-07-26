// loanRequests_thunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export interface LoanRequestsParams {
  email?: string;
  search?: string;
  min_amount?: number | string;
  max_amount?: number | string;
  min_credit_score?: number | string;
  max_credit_score?: number | string;
  status?: string;
  page?: number;
  limit?: number | string;
  sort_by?: "ASC" | "DESC";
  start_date?: string;
  end_date?: string;
}

export const handleUnauthorizedError = () => {
  Cookies.remove("authToken");
  // Optionally redirect to login page
  // window.location.href = '/login';
};

export const fetchLoanRequests = createAsyncThunk(
  "loan-requests/fetch",
  async (params: LoanRequestsParams, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing");
      }

      const response = await axios.get(
        `${BASE_URL}/api/partner/loan-history/all-loan-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            ...params,
            // Convert all values to strings
            ...(params.min_amount !== undefined && { min_amount: params.min_amount.toString() }),
            ...(params.max_amount !== undefined && { max_amount: params.max_amount.toString() }),
            ...(params.min_credit_score !== undefined && { min_credit_score: params.min_credit_score.toString() }),
            ...(params.max_credit_score !== undefined && { max_credit_score: params.max_credit_score.toString() }),
            ...(params.page !== undefined && { page: params.page.toString() }),
            ...(params.limit !== undefined && { limit: params.limit.toString() }),
          }
        }
      );

      return {
        data: response.data.data.loan_requests.data, // Access nested loan_requests.data
        pagination: response.data.data.loan_requests, // The pagination object
        total_count: response.data.data.total_count // The total count from the root
      };
    } catch (error: any) {
      if (error.response?.status === 401) {
        handleUnauthorizedError();
        return rejectWithValue("Session expired. Please login again");
      }
      return rejectWithValue(
        error.response?.data?.message || 
        "An error occurred while fetching loan requests"
      );
    }
  }
);