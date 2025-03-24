import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
interface Year {
  year?: string;
}
export const loan_request_stat = createAsyncThunk(
  "loan_request_stat",
  async (Year: Year, { rejectWithValue }) => {
    const { year } = Year;
    try {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `https://credbevy.jbenergyservices.com/public/api/partner/loan-requests/stats?page=${year}`,
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






interface FiltersProps {
    search?: string;
    sort_by?: string;
    start_date?: string;
    end_date?: string;
    single?: boolean;
    limit?: string;
    pagina?: any;
    filter_by: any;
    approvalStatus:any;
    page:any;
  }


  
  export const all_loan_requests = createAsyncThunk(
    "all_loan_requests`",
    async (filters: FiltersProps, { rejectWithValue }) => {
      const {page}=filters
      try {
        const token = Cookies.get("authToken");
        const response = await axios.post(
          `https://credbevy.jbenergyservices.com/public/api/partner/loan-requests/all-loan-requests?page=${page}`,
          filters,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data; // Return the entire API response
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
export const _loan_request_trend = createAsyncThunk(
    "loan-request-trend",
    async (Year: Year, { rejectWithValue }) => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.post(
          `https://credbevy.jbenergyservices.com/public/api/partner/loan-requests/loan-request-trend`,
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

  




    
  interface product_id{
    product_id: any;
  }
  

  
  export const _single_loan_products_request = createAsyncThunk(
    "single-loan-request",
    async ({ product_id}: product_id, { rejectWithValue }: { rejectWithValue: Function }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }
  
        const response = await axios.post(
          `https://credbevy.jbenergyservices.com/public/api/partner/loan-requests/single-loan-request/${product_id}`,
          
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data; // Return the API response
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





    interface product_id{
      product_id: any;
    }
    
  
  




      interface product_id{
        product_id: any;
      }
      
    
      
      export const approve_loan = createAsyncThunk(
        "approve_loan",
        async ({ product_id}: product_id, { rejectWithValue }: { rejectWithValue: Function }) => {
          try {
            const token = Cookies.get("authToken");
            if (!token) {
              return rejectWithValue("Authentication token is missing.");
            }
      
            const response = await axios.post(
              `https://credbevy.jbenergyservices.com/public/api/partner/loan-requests/approve-loan/${product_id}`,
              
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            return response.data; // Return the API response
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