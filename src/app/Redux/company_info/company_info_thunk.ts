import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { boolean } from "yup";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Fetch companies info
export const fetchCompanyInfo = createAsyncThunk(
  "fetchCompanyInfo",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_URL}/api/partner/settings/company-info/get-partner-info`,
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

// Company info form submission
export const CompanyInfoForm = createAsyncThunk(
  "partner/updateCompanyInfo",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      
      const response = await axios.post(
        `${BASE_URL}/api/partner/settings/company-info/update-partner-info`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
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

interface Notification {
  desktop_notifications: boolean,
  unread_notification_badge: boolean,
  communication_emails: boolean,
  announcements_updates: boolean,
  sound_notifications: boolean
}

// Company info form notification
export const Notification = createAsyncThunk(
  "Notification",
  async (Notification: Notification, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      
      const response = await axios.post(
        `${BASE_URL}/api/partner/settings/notifications/update-notifications`,
        Notification,
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

export const GetNotification = createAsyncThunk(
  "GetNotification",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      const response = await axios.get(
        `${BASE_URL}/api/partner/settings/notifications/get-notifications`,
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

interface Security {
  current_password?: string,
  new_password?: string,
  new_password_confirmation?: string,
  two_fa?: boolean,
}

// Company password and security settings
export const security = createAsyncThunk(
  "Security",
  async (Security: Security, { rejectWithValue }) => {
    try {
      const token = Cookies.get("authToken");
      
      const response = await axios.post(
        `${BASE_URL}/api/partner/settings/update-password-twofa`,
        Security,
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