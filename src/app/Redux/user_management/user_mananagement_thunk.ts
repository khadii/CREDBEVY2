import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
   
  interface user_management{
    search: string,
    role: string
    page: number

 
}


  
  export const list_of_users = createAsyncThunk(
    "list_of_users",
    async ( user_management: user_management, { rejectWithValue }: { rejectWithValue: Function }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }
  const {page}=user_management
        const response = await axios.post(
          `https://credbevy.jbenergyservices.com/public/api/partner/settings/user-management/all-users?page=${page}`,
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

    interface AddUserProps {
      email: string;
      first_name: string;
      last_name: string;
      user_name: string;
      password: string;
      role_id: number;
      deactivated: number;
    }


    export const Add_user = createAsyncThunk(
      "Add_user",
      async (
        user_details: AddUserProps,
        { rejectWithValue }: { rejectWithValue: Function }
      ) => {
        try {
          const token = Cookies.get("authToken");
          if (!token) {
            return rejectWithValue("Authentication token is missing.");
          }
          const response = await axios.post(
            `https://credbevy.jbenergyservices.com/public/api/partner/settings/user-management/add-user`,
            user_details,

            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          return response.data;
        } catch (error: any) {
          if (error.response && error.response.data) {
            return rejectWithValue(
              error.response.data.message || "Unauthorized"
            );
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
  



      interface UserProps {
        email: string;
        first_name: string;
        last_name: string;
        user_name: string;
        password: any;
        role_id: number;
        deactivated: number;
        
        user_id:string
      }
      
  
      export const Update_user = createAsyncThunk(
        "Update_user",
        async ( user_details: UserProps, { rejectWithValue }: { rejectWithValue: Function }) => {
          try {
            const token = Cookies.get("authToken");
            if (!token) {
              return rejectWithValue("Authentication token is missing.");
            }
      const {user_id}=user_details
            const response = await axios.post(
              `https://credbevy.jbenergyservices.com/public/api/partner/settings/user-management/update-user/${user_id}`,
              user_details,
              
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
      
  
      export const get_single_user = createAsyncThunk(
        "get_single_user",
        async ( user_details: user_id, { rejectWithValue }: { rejectWithValue: Function }) => {
          try {
            const token = Cookies.get("authToken");
            if (!token) {
              return rejectWithValue("Authentication token is missing.");
            }
      const {user_id}=user_details
            const response = await axios.get(
              `https://credbevy.jbenergyservices.com/public/api/partner/settings/user-management/single-user/${user_id}`,
   
              
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
      
  
      export const delete_user = createAsyncThunk(
        "delete_user",
        async ( user_details: user_id, { rejectWithValue }: { rejectWithValue: Function }) => {
          try {
            const token = Cookies.get("authToken");
            if (!token) {
              return rejectWithValue("Authentication token is missing.");
            }
      const {user_id}=user_details
            const response = await axios.delete(
              `https://credbevy.jbenergyservices.com/public/api/partner/settings/user-management/delete-user/${user_id}`,
   
              
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