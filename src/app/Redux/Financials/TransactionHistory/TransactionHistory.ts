import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Re-defining SearchFilters to match the form values and API expectations
interface SearchFilters {
  search?: string; // For payee or general search
  type?: string; // For transactionType
  min_amount?: string; // Needs to be string for API, but number in form
  max_amount?: string; // Needs to be string for API, but number in form
  start_date?: string;
  end_date?: string;
  status?: string;
  page?: number; // Keep page for pagination
}

// Helper function for unauthorized error handling (assuming it's defined elsewhere or will be)
export const handleUnauthorizedError = () => {
  Cookies.remove("authToken");
  // Optionally, you can redirect the user to the login page here.
  // window.location.href = '/login';
};

export const transactionhistory = createAsyncThunk(
  "transactionhistory",
  async (filters: SearchFilters, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing.");
      }

      // Build query parameters object
      const queryParams: Record<string, string> = {};

      // Add all filter parameters if they exist and are not empty
      if (filters.search && filters.search !== "") queryParams.search = filters.search;
      if (filters.type && filters.type !== "") queryParams.type = filters.type;
      if (filters.min_amount !== undefined && filters.min_amount !== null && filters.min_amount !== "") 
        queryParams.min_amount = filters.min_amount.toString();
      if (filters.max_amount !== undefined && filters.max_amount !== null && filters.max_amount !== "") 
        queryParams.max_amount = filters.max_amount.toString();
      if (filters.start_date && filters.start_date !== "") queryParams.start_date = filters.start_date;
      if (filters.end_date && filters.end_date !== "") queryParams.end_date = filters.end_date;
      if (filters.status && filters.status !== "") queryParams.status = filters.status;
      if (filters.page !== undefined) queryParams.page = filters.page.toString();

      const response = await axios.get(
        `${BASE_URL}/api/partner/financials/transactionhistory`,
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
        return rejectWithValue(error.response.data.message || "An error occurred.");
      } else if (error.request) {
        return rejectWithValue(
          "No response from the server. Please check your network connection."
        );
      } else {
        return rejectWithValue(
          "An unexpected error occurred. Please try again."
        );
      }
    }
  }
);
