import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Async thunk for login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/partner/login`,
        credentials
      );
      return response.data;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data.message || "Login failed");
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

// Async thunk for fetching user data
export const fetchUserData = createAsyncThunk(
  "fetchUserData",
  async (
    _,
    { rejectWithValue }: { rejectWithValue: Function }
  ) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      const response = await axios.get(
        `${BASE_URL}/api/partner/me`,
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




  






// const api = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
//   withCredentials: true,
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     'X-Requested-With': 'XMLHttpRequest'
//   }
// });

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (credentials: { email: string; password: string }, { rejectWithValue }) => {
//     try {
//       // First get CSRF cookie
//       await api.get('/sanctum/csrf-cookie');
      
//       // Then make login request
//       const response = await api.post('/api/partner/login', credentials);
//       return response.data;
//     } catch (error: any) {
//       // Enhanced error handling
//       if (error.response?.status === 419) {
//         // CSRF token mismatch - try again with fresh token
//         try {
//           await api.get('/sanctum/csrf-cookie');
//           const retryResponse = await api.post('/api/partner/login', credentials);
//           return retryResponse.data;
//         } catch (retryError) {
//           return rejectWithValue("Session expired. Please refresh the page.");
//         }
//       }
//       return rejectWithValue(error.response?.data?.message || "Login failed");
//     }
//   }
// );