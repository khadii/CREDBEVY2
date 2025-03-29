import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"; 

export const ConfirmPin = createAsyncThunk(
  "confirm-pin",
  async (credentials: { pin: number[] }, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }
      
      const response = await axios.post(
        "https://credbevy.jbenergyservices.com/public/api/partner/settings/confirm-pin",
        { pin: credentials.pin.join('') }, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", 
          },
        }
      );
      
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(
          error.response.data.message || 
          error.response.data.error || 
          "PIN confirmation failed"
        );
      } else if (error.request) {
        return rejectWithValue(
          "No response from the server. Please check your network connection."
        );
      } else {
        return rejectWithValue(
          error.message || "An unexpected error occurred. Please try again."
        );
      }
    }
  }
);