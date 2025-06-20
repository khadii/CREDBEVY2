import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
// Assuming you export it

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export interface LoanRequestFilterParams {
  search?: string;
  sort_by?: "ASC" | "DESC";
  start_date?: string; // Format: YYYY-MM-DD
  end_date?: string;   // Format: YYYY-MM-DD
  single?: boolean | string; // May come as a string or boolean
  limit?: number | string;
  paginate?: boolean;
  filter_by?: "interested" | "not_interested" | "";
  approvalStatus?: "pending" | "approved" | "declined" | "";
  page?: number;
  year?: string;
}

export const fetchLoanRequests = createAsyncThunk(
  "loans-history/requests",
  async (params: LoanRequestFilterParams, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        return rejectWithValue("Authentication token is missing.");
      }

      const response = await axios.post(
        `${BASE_URL}/api/partner/loan-history/all-loan-requests`,
        {
          ...params,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        data: response.data.data.loan_requests.data,
        pagination: {
          currentPage: response.data.data.loan_requests.current_page,
          totalPages: response.data.data.loan_requests.last_page,
          totalItems: response.data.data.loan_requests.total,
          perPage: response.data.data.loan_requests.per_page,
          links: response.data.data.loan_requests.links,
          nextPageUrl: response.data.data.loan_requests.next_page_url,
          prevPageUrl: response.data.data.loan_requests.prev_page_url,
          firstPageUrl: response.data.data.loan_requests.first_page_url,
          lastPageUrl: response.data.data.loan_requests.last_page_url,
          from: response.data.data.loan_requests.from,
          to: response.data.data.loan_requests.to,
        },
        totalCount: response.data.data.total_count,
      };
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
