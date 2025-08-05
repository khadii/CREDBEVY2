import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestParams {
  search?: string;
  audit_level?: string; 
  status?: string;  
  page: number    
}

export const LogsSlice = createAsyncThunk(
  "LogsSlice",
  async (params: RequestParams, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");

      if (!token) {
        return rejectWithValue({ message: "Authentication token is missing." });
      }

      // Convert params object to query string
      const queryParams = new URLSearchParams();
      
      if (params.search) queryParams.append('search', params.search);
      if (params.audit_level) queryParams.append('audit_level', params.audit_level);
      if (params.status) queryParams.append('status', params.status);
      queryParams.append('page', params.page.toString());

      const response = await axios.get(
        `${BASE_URL}/api/partner/settings/logs-management/get-logs?${queryParams.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response?.data) {
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message || "An unexpected error occurred" });
    }
  }
);