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
  // Optionally, you can redirect the user to the login page here.
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

      // Build query parameters
      const queryParams: Record<string, string> = {};
      
      // Add all filter parameters
      if (params.email) queryParams.email = params.email;
      if (params.search) queryParams.search = params.search;
      if (params.status) queryParams.status = params.status;
      
      // Handle numeric ranges
      if (params.min_amount !== undefined) queryParams.min_amount = params.min_amount.toString();
      if (params.max_amount !== undefined) queryParams.max_amount = params.max_amount.toString();
      if (params.min_credit_score !== undefined) queryParams.min_credit_score = params.min_credit_score.toString();
      if (params.max_credit_score !== undefined) queryParams.max_credit_score = params.max_credit_score.toString();
      
      // Pagination and sorting
      if (params.page) queryParams.page = params.page.toString();
      if (params.limit) queryParams.limit = params.limit.toString();
      if (params.sort_by) queryParams.sort_by = params.sort_by;
      
      // Date ranges
      if (params.start_date) queryParams.start_date = params.start_date;
      if (params.end_date) queryParams.end_date = params.end_date;

      const response = await axios.get(
        `${BASE_URL}/api/partner/loan-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: queryParams
        }
      );

      return {
        data: response.data.data,
        pagination: response.data.meta // Adjust according to your API response
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