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
    id: any;
  }
  

  
  export const _single_loan_products_request = createAsyncThunk(
    "single-loan-request",
    async ({ id}: product_id, { rejectWithValue }: { rejectWithValue: Function }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }
  
        const response = await axios.get(
          `https://credbevy.jbenergyservices.com/public/api/partner/loan-requests/single-loan-request/${id}`,
          
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

  
  














    interface RequestParams {
      product_id: string []| number[]; 
      pin: any[]; 
    }
    
    export const accept_interest = createAsyncThunk(
      "accept_interest",
      async ({ product_id, pin }: RequestParams, { rejectWithValue }: { rejectWithValue: Function }) => {
        try {
          const token = Cookies.get("authToken");
          if (!token) {
            return rejectWithValue("Authentication token is missing.");
          }
    
          const response = await axios.post(
            `https://credbevy.jbenergyservices.com/public/api/partner/loan-requests/accept-interest`,
            { pin: pin.join(''),
              loan_ids:product_id
            },
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








    interface RequestParamsreject {
      product_id: string []| number[]; 
    }

    
    export const decline_interest = createAsyncThunk(
      "decline_interest",
      async ({ product_id }: RequestParamsreject, { rejectWithValue }: { rejectWithValue: Function }) => {
        try {
          const token = Cookies.get("authToken");
          if (!token) {
            return rejectWithValue("Authentication token is missing.");
          }
    
          const response = await axios.post(
            `https://credbevy.jbenergyservices.com/public/api/partner/loan-requests/decline-interest`,
            { loan_ids: product_id},
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
            

























































    interface RequestParams {
      product_id: string[] | number[];
      pin: any[];
    }
    
    export const approve_loan = createAsyncThunk(
      "loanCondition/approve_loan",
      async ({ product_id, pin }: RequestParams, { rejectWithValue }) => {
        try {
          const token = Cookies.get("authToken");
          if (!token) {
            return rejectWithValue({ 
              message: "Authentication token is missing.",
              status: 401 
            });
          }
    
          const response = await axios.post(
            `https://credbevy.jbenergyservices.com/public/api/partner/loan-requests/approve-loan/${product_id}`,
            { 
              loan_ids: product_id,
              pin: pin.join('') 
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
              },
              validateStatus: (status) => status < 500
            }
          );
    
          if (response.data.status !== 'success') {
            return rejectWithValue(response.data);
          }
    
          return response.data;
        } catch (error: any) {
          if (error.response?.data) {
            return rejectWithValue({
              ...error.response.data,
              status: error.response.status
            });
          }
          return rejectWithValue({ 
            message: error.message || "Network error occurred",
            status: 503
          });
        }
      }
    );
            
            export const reject_loan = createAsyncThunk(
              "reject_loan",
              async ({ product_id, pin }: RequestParams, { rejectWithValue }: { rejectWithValue: Function }) => {
                try {
                  const token = Cookies.get("authToken");
                  if (!token) {
                    return rejectWithValue({ message: "Authentication token is missing." });
                  }
            
                  const response = await axios.post(
                    `https://credbevy.jbenergyservices.com/public/api/partner/loan-requests/disapprove-loan/${product_id}`,
                    { pin: pin.join(''),
                    
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );
                  return response.data;
                } catch (error: any) {
                  if (error.response?.data) {
                    return rejectWithValue(error.response.data);
                  }
                  return rejectWithValue({ message: error.message || "An unexpected error occurred" });
                }
              }
            );