import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
   
interface loanRepayment {
    search: string;
    single: boolean;
    sort_by: string
    start_date: string; 
    end_date: string;   
    status: string;
    approval_status: string;
    limit: number;
    paginate: boolean;
  }
  

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  export const loan_repayment = createAsyncThunk(
    "loan_repayment",
    async ( user_management: loanRepayment, { rejectWithValue }: { rejectWithValue: Function }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }
        const response = await axios.post(
          `${BASE_URL}/api/partner/loan-repayments/all-loans`,
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


    interface UserProps {
        
        user_id:string
      }
      
  
      export const single_loan_repayments = createAsyncThunk(
        "single_loan_repayments",
        async ( user_details: UserProps, { rejectWithValue }: { rejectWithValue: Function }) => {
          try {
            const token = Cookies.get("authToken");
            if (!token) {
              return rejectWithValue("Authentication token is missing.");
            }
      const {user_id}=user_details
            const response = await axios.get(
              `${BASE_URL}/api/partner/loan-repayments/loan/${user_id}`,
              
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



       

  interface Year {
    year?:string,
  }
export const loan_repayments_stats = createAsyncThunk(
    "loan_repayments_stats",
    async (Year: Year, { rejectWithValue }) => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.post(
          `${BASE_URL}/api/partner/loan-repayments/stats`,
          Year,
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
    }
  );



 
  interface Year {
    year?:string,
    month?: string,
    week?: string
  }
export const loan_repayments_trend = createAsyncThunk(
    "loan_repayments_trend",
    async (Year: Year, { rejectWithValue }) => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.post(
          `${BASE_URL}/api/partner/loan-repayments/trend`,
          Year,
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
    }
  );

  