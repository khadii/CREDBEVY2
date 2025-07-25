import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to clear token and potentially redirect (optional)
const handleUnauthorizedError = () => {
  Cookies.remove("authToken");
  // Optionally, you can redirect the user to the login page here.
  // window.location.href = '/login';
};

interface Year {
  year?: string;
}
export const loan_request_stat = createAsyncThunk(
  "loan_request_stat",
  async (Year: Year, { rejectWithValue }) => {
    const { year } = Year;
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }
      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-requests/stats?page=${year}`,
        Year,
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

interface LoanRequestsFilters {
  search?: string;
  min_amount?: number | string;
  max_amount?: number | string;
  min_credit_score?: number | string;
  max_credit_score?: number | string;
  start_date?: string;
  end_date?: string;
  min_user_income?: number | string;
  max_user_income?: number | string;
  sort_by?: string;
  single?: boolean;
  limit?: string;
  pagina?: any;
  filter_by?: any;
  approvalStatus?: any;
  page?: any;
}

export const all_loan_requests = createAsyncThunk(
  "loan-requests/all-loan-requests",
  async (filters: LoanRequestsFilters, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }

      // Build query parameters object, excluding empty values
      const queryParams: Record<string, string> = {};

      // Add all filter parameters if they exist
      if (filters.search && filters.search !== "") queryParams.search = filters.search;
      if (filters.min_amount && filters.min_amount !== "") queryParams.min_amount = filters.min_amount.toString();
      if (filters.max_amount && filters.max_amount !== "") queryParams.max_amount = filters.max_amount.toString();
      if (filters.min_credit_score && filters.min_credit_score !== "") 
        queryParams.min_credit_score = filters.min_credit_score.toString();
      if (filters.max_credit_score && filters.max_credit_score !== "") 
        queryParams.max_credit_score = filters.max_credit_score.toString();
      if (filters.start_date && filters.start_date !== "") queryParams.start_date = filters.start_date;
      if (filters.end_date && filters.end_date !== "") queryParams.end_date = filters.end_date;
      if (filters.min_user_income && filters.min_user_income !== "") 
        queryParams.min_user_income = filters.min_user_income.toString();
      if (filters.max_user_income && filters.max_user_income !== "") 
        queryParams.max_user_income = filters.max_user_income.toString();
      if (filters.sort_by && filters.sort_by !== "") queryParams.sort_by = filters.sort_by;
      if (filters.limit && filters.limit !== "") queryParams.limit = filters.limit;
      if (filters.page) queryParams.page = filters.page.toString();

      // Add optional parameters if they exist
      if (filters.filter_by) queryParams.filter_by = filters.filter_by;
      if (filters.approvalStatus) queryParams.approvalStatus = filters.approvalStatus;
      if (filters.pagina) queryParams.pagina = filters.pagina;
      if (filters.single !== undefined) queryParams.single = filters.single.toString();

      const response = await axios.get(
        `${BASE_URL}/api/partner/loan-requests/all-loan-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: queryParams,
        }
      );

      return response.data;
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          handleUnauthorizedError();
          return rejectWithValue("Unauthorized: Please log in again.");
        }
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
  year?: string;
  month?: string;
  week?: string;
}
export const _loan_request_trend = createAsyncThunk(
  "loan-request-trend",
  async (Year: Year2, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }
      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-requests/loan-request-trend`,
        Year,
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
  id: any;
}

export const _single_loan_products_request = createAsyncThunk(
  "single-loan-request",
  async ({ id }: product_id, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }

      const response = await axios.get(
        `${BASE_URL}/api/partner/loan-requests/single-loan-request/${id}`,
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

export const accept_interest = createAsyncThunk(
  "accept_interest",
  async ({ product_id, pin }: RequestParams, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }

      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-requests/accept-interest`,
        {
          pin: pin.join(""),
          loan_ids: product_id,
        },
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
  product_id: string[] | number[];
}

export const decline_interest = createAsyncThunk(
  "decline_interest",
  async ({ product_id }: RequestParamsreject, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }

      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-requests/decline-interest`,
        { loan_ids: product_id },
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
        return rejectWithValue(error.response.data.message || "Unauthorized");
      } else if (error.request) {
        return rejectWithValue("No response from the server. Please check your network connection.");
      } else {
        return rejectWithValue("An unexpected error occurred. Please try again.");
      }
    }
  }
);

export const approve_loan = createAsyncThunk(
  "loanCondition/approve_loan",
  async ({ product_id, pin }: RequestParams, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue({ message: "Authentication token is missing. Please log in again." });
      }

      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-requests/approve-loan/${product_id}`,
        {
          pin: pin.join(""),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) { // Check for error.response
        if (error.response.status === 401) { // Specifically check for 401
          handleUnauthorizedError();
          return rejectWithValue({ message: "Unauthorized: Please log in again." });
        }
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message || "An unexpected error occurred" });
    }
  }
);

export const reject_loan = createAsyncThunk(
  "reject_loan",
  async ({ product_id, pin }: RequestParams, { rejectWithValue }: { rejectWithValue: Function }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError();
        return rejectWithValue({ message: "Authentication token is missing. Please log in again." });
      }

      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-requests/disapprove-loan/${product_id}`,
        {
          pin: pin.join(""),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      if (error.response) { // Check for error.response
        if (error.response.status === 401) { // Specifically check for 401
          handleUnauthorizedError();
          return rejectWithValue({ message: "Unauthorized: Please log in again." });
        }
        return rejectWithValue(error.response.data);
      }
      return rejectWithValue({ message: error.message || "An unexpected error occurred" });
    }
  }
);