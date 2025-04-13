import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
   
  interface user_management{
    search: string,
    role: string
    page: number

 
}


  
  export const UserRoles = createAsyncThunk(
    "UserRoles",
    async ( user_management: user_management, { rejectWithValue }: { rejectWithValue: Function }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }
  const {page}=user_management
        const response = await axios.post(
          `https://credbevy.jbenergyservices.com/public/api/partner/settings/roles-management/all-roles?page=${page}`,
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




    interface user_id {
        user_id:string
      }
      
  
      export const delete_user_role = createAsyncThunk(
        "delete_user_role",
        async ( user_details: user_id, { rejectWithValue }: { rejectWithValue: Function }) => {
          try {
            const token = Cookies.get("authToken");
            if (!token) {
              return rejectWithValue("Authentication token is missing.");
            }
      const {user_id}=user_details
            const response = await axios.delete(
              `https://credbevy.jbenergyservices.com/public/api/partner/settings/roles-management/delete-role/${user_id}`,
   
              
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