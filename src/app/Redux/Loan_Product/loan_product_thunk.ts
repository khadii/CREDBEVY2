import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Define an interface for the credentials
interface LoanProductCredentials {
    product_name: any;
    loan_type: any;
    repayment_frequency: any;
    minimum_amount: any;
    maximum_amount: any;
    duration: any;
    interest_rate: any;
    discount_percentage: any;
    discount_duration: any;
    minimum_credit_score: any;
    maximum_credit_score: any;
    minimum_income: any;
    employment_status: any;
    category: any;
    collateral_uuids: any[];
}

export const _create_loan_product = createAsyncThunk(
    "dashboard/_create_loan_product",
    async (credentials: LoanProductCredentials, { rejectWithValue }) => {
        try {
            const token = Cookies.get("authToken");
            console.log("Token from cookies:", token);

            const response = await axios.post(
                `${BASE_URL}/api/partner/loan-products/add-loan-product`,
                credentials, 
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

interface FiltersProps {
  search?: string;
  sort_by?: string;
  start_date?: string;
  end_date?: string;
  single?: boolean;
  limit?: string;
  pagina?: any;
  page?: number;
}

export const _loan_products_all = createAsyncThunk(
  "loanProducts/_loan_products_all",
  async (filters: FiltersProps, { rejectWithValue }) => {
    const { page } = filters;
    try {
      const token = Cookies.get("authToken");
      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-products/all?page=${page}`,
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
    year?: string;
}

export const _loan_products_stats = createAsyncThunk(
    "loanProducts/_loan_products_stats",
    async (Year: Year, { rejectWithValue }) => {
      const { year } = Year;
      try {
        const token = Cookies.get("authToken");
        const response = await axios.post(
          `${BASE_URL}/api/partner/loan-products/stats?page=${year}`,
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

interface Year2 {
    year?: string | number;
    product_id: string | number; 
}

export const _single_loan_products_stats = createAsyncThunk(
    "_single_loan_products_stats",
    async ({ year, product_id}: Year2, { rejectWithValue }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }
  
        const response = await axios.post(
          `${BASE_URL}/api/partner/loan-products/stats-per-product/${product_id}?page=${year}`,
          { year },
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

interface Delete {
    loan_product_ids?: any;
    action: any;
}

export const bulk_action = createAsyncThunk(
    "bulk_action",
    async ({loan_product_ids,action}: Delete, { rejectWithValue }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }
  
        const response = await axios.post(
          `${BASE_URL}/api/partner/loan-products/bulk-action`,
          { loan_product_ids,action },
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

interface LoanProductCredentialsPut {
    credentials: {
      product_name: any;
      loan_type: any;
      repayment_frequency: any;
      minimum_amount: any;
      maximum_amount: any;
      duration: any;
      interest_rate: any;
      discount_percentage: any;
      discount_duration: any;
      minimum_credit_score: any;
      maximum_credit_score: any;
      minimum_income: any;
      employment_status: any;
      category: any;
      collateral_uuids: any[];
    };
    product_id: string; 
}

export const update_loan = createAsyncThunk(
    "update-loan",
    async ({ credentials, product_id }: LoanProductCredentialsPut, { rejectWithValue }) => {
      try {
        const token = Cookies.get("authToken");
        if (!token) {
          return rejectWithValue("Authentication token is missing.");
        }
  
        const response = await axios.put(
          `${BASE_URL}/api/partner/loan-products/update-loan-product/${product_id}`,
          credentials,
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

interface product_id {
    product_id?: any;
}

export const loan_products_single = createAsyncThunk(
    "loan-products-single",
    async (product_id: product_id, { rejectWithValue }) => {
      try {
        const token = Cookies.get("authToken");
        const response = await axios.get(
          `${BASE_URL}/api/partner/loan-products/single/${product_id}`,
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