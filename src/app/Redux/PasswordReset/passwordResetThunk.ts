import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface PasswordUpdatePayload {
  current_password: string;
  new_password: string;
  new_password_confirmation: string;
  two_fa: boolean;
}

export const updatePasswordWith2FA = createAsyncThunk<
  { message: string; data: any[] }, // Return type
  PasswordUpdatePayload, // Input type
  {
    rejectValue: string; // Type for rejectWithValue
  }
>(
  'passwordUpdate/with2FA',
  async (payload: PasswordUpdatePayload, { rejectWithValue }) => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.post(
        `${BASE_URL}/api/partner/settings/update-password-twofa`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.error) {
        return rejectWithValue(response.data.message || 'Failed to update password');
      }

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // Handle specific error statuses
        if (error.response.status === 401) {
          return rejectWithValue('Unauthorized: Please log in again');
        }
        if (error.response.status === 400) {
          return rejectWithValue(error.response.data.message || 'Invalid request');
        }
        if (error.response.status === 403) {
          return rejectWithValue(error.response.data.message || '2FA verification required');
        }
        return rejectWithValue(error.response.data.message || 'Failed to update password');
      } else if (error.request) {
        return rejectWithValue('No response from server. Please check your connection.');
      } else {
        return rejectWithValue(error.message || 'An unexpected error occurred');
      }
    }
  }
);