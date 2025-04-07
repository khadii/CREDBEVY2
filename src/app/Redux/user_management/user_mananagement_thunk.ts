import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
   
  interface user_management{
    search: string,
    role: string
}


  
  export const list_of_users = createAsyncThunk(
    "list_of_users",
    async ( user_management: user_management, { rejectWithValue }: { rejectWithValue: Function }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }
  
        const response = await axios.post(
          `https://credbevy.jbenergyservices.com/public/api/partner/settings/user-management/all-users`,
          user_management,
          
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
