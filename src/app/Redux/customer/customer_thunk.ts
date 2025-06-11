 
 
 import { createAsyncThunk } from "@reduxjs/toolkit";
 import axios from "axios";
 import Cookies from "js-cookie";
 
 const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
 
 
 interface year{
    year: string,
  

 
}


  
  export const Customers_stats = createAsyncThunk(
    "customers/stats",
    async ( Year: year, { rejectWithValue }: { rejectWithValue: Function }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }

        const response = await axios.post(
          `${BASE_URL}/api/partner/customers/stats`,
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
    })

interface ElectionFilters {
  search?: string; // Optional: Search term for filtering elections
  sort_by?: 'ASC' | 'DESC'; // Optional: Sorting order (ASC or DESC)
  start_date?: string; // Optional: Start date for filtering elections (format: YYYY-MM-DD)
  end_date?: string; // Optional: End date for filtering elections (format: YYYY-MM-DD)
  single?: boolean | string; // Optional: If true, return only a single election (if available)
  limit?: number | string; // Optional: Limit the number of results
  paginate?: boolean; // Optional: Enable pagination (if limit is not set)
  filter_by?: 'interested' | 'not_interested' | string; // Optional: Filter by interest status
  approvalStatus?: 'pending' | 'approved' | 'declined' | string; // Optional: Filter by approval status
}

      export const Customers_stats_loan_requests = createAsyncThunk(
    "customers/all-loan-requests`",
    async ( ElectionFilters: ElectionFilters, { rejectWithValue }: { rejectWithValue: Function }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }

        const response = await axios.post(
          `${BASE_URL}/api/partner/customers/all-loan-requests`,
          ElectionFilters,
          
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

