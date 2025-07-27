import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Year {
  year: string;
}

export const Customers_stats = createAsyncThunk(
  "customers/stats",
  async (Year: Year, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      const response = await axios.get(
        `${BASE_URL}/api/partner/customers/stats`,
        {
          params: Year,
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

export const Customers_stats_loan_requests = createAsyncThunk(
  "customers/all-loan-requests",
  async (ElectionFilters: ElectionFilters, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      const response = await axios.get(
        `${BASE_URL}/api/partner/customers/all-loan-requests`,
        {
          params: ElectionFilters,
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