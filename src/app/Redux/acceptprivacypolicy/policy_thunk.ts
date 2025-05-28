import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface AcceptPolicyPayload {
  accept: boolean;
}

export const Policy = createAsyncThunk(
  "Policy",
  async (payload: AcceptPolicyPayload, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `${BASE_URL}/api/partner/accept`,
        payload,
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