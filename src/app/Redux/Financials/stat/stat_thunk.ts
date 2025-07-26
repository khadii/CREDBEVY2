import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface Year {
  year: string;
}

export const Financial_stats = createAsyncThunk(
  "Financial_stats",
  async (Year: Year, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      const response = await axios.get(
        `${BASE_URL}/api/partner/financials/stats`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: Year 
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