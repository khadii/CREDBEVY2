import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post("https://credbevy.jbenergyservices.com/public/api/partner/login", credentials);
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Login failed");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);