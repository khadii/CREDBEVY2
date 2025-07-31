// setPin.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;


interface SetPinPayload {
  pin: any;
  confirm_pin: any; 
}


interface SetPinResponse {
  error: boolean;
  message: string;
  data: null;
}


export const handleUnauthorizedError = () => {
  Cookies.remove("authToken");
  
};

export const setPin = createAsyncThunk<
  SetPinResponse,
  SetPinPayload, 
  { rejectValue: string }
>(
  "settings/setPin",
  async (pinPayload: SetPinPayload, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing.");
      }

      const response = await axios.post<SetPinResponse>(
        `${BASE_URL}/api/partner/settings/set-pin`,
        pinPayload, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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