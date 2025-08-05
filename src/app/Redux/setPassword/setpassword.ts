import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface SetPasswordPayload {
  token: string;
  password: string;
  password_confirmation :string
}

export const setPasswordWithToken = createAsyncThunk<
  void, // Return type of the payload creator
  SetPasswordPayload, // First argument to the payload creator
  {
    rejectValue: string; // Type to be passed to `rejectWithValue`'s first argument
  }
>(
  'password/setWithToken',
  async ({ token, password,password_confirmation  }: SetPasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/partner/invitation/set-password/${token}`,
        { password,password_confirmation},
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.error) {
        return rejectWithValue(response.data.message || 'Failed to set password');
      }

      return; // No return value on success
    } catch (error: any) {
      if (error.response) {
        // Handle specific error cases
        if (error.response.status === 401) {
          return rejectWithValue('Invalid or expired token');
        }
        if (error.response.status === 400) {
          return rejectWithValue(error.response.data.message || 'Invalid request');
        }
        return rejectWithValue(error.response.data.message || 'Failed to set password');
      }
      if (error.request) {
        return rejectWithValue('No response from server. Please check your connection.');
      }
      return rejectWithValue('An unexpected error occurred.');
    }
  }
);