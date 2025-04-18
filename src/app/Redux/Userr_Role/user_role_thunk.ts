import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
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
          `${BASE_URL}/api/partner/settings/roles-management/all-roles?page=${page}`,
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
              `${BASE_URL}/api/partner/settings/roles-management/delete-role/${user_id}`,
   
              
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



        export const all_roles_dropdownata = createAsyncThunk(
          "all-roles-dropdown",
          async (_, { rejectWithValue }: { rejectWithValue: Function }) => {
            try {
              const token = Cookies.get("authToken");
              if (!token) {
                return rejectWithValue("Authentication token is missing.");
              }
        
              const response = await axios.get(
               `${BASE_URL}/api/partner/settings/roles-management/all-roles-dropdown`,
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
        
        
        
      


          export const all_roles_permissions = createAsyncThunk(
            "all_roles_permissions",
            async (_, { rejectWithValue }: { rejectWithValue: Function }) => {
              try {
                const token = Cookies.get("authToken");
                if (!token) {
                  return rejectWithValue("Authentication token is missing.");
                }
          
                const response = await axios.get(
                 `${BASE_URL}/api/partner/settings/roles-management/permissions`,
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
          
          
          
        
            export const permissions_by_module = createAsyncThunk(
              "permissions_by_module",
              async (_, { rejectWithValue }: { rejectWithValue: Function }) => {
                try {
                  const token = Cookies.get("authToken");
                  if (!token) {
                    return rejectWithValue("Authentication token is missing.");
                  }
            
                  const response = await axios.get(
                   `${BASE_URL}/api/partner/settings/roles-management/permissions-by-module`,
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




              interface update_role {
                name: string;
                description: string;
                permissions: any[]; // Array of permission IDs
                id: any;
              }

              export const update_role = createAsyncThunk(
                "update_role",
                async (
                  user_details: update_role,
                  { rejectWithValue }: { rejectWithValue: Function }
                ) => {
                  try {
                    const token = Cookies.get("authToken");

                    if (!token) {
                      return rejectWithValue(
                        "Authentication token is missing."
                      );
                    }
                    const { id } = user_details;
                    const response = await axios.put(
                      `${BASE_URL}/api/partner/settings/user-management/add-user${id}`,
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
            
            
            