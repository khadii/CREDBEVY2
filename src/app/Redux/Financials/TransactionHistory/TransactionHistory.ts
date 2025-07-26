import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SearchFilters {
  year: string;
  search: string;
  start_date: string;
  end_date: string;
  min_amount: string;
  max_amount: string;
  page: any;
}

export const transactionhistory = createAsyncThunk(
  "transactionhistory",
  async (SearchFilters: SearchFilters, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      const response = await axios.get(
        `${BASE_URL}/api/partner/financials/transactionhistory`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            ...SearchFilters, // Spread all filter properties
            page: SearchFilters.page // Explicitly include page for clarity
          }
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Unauthorized");
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