import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ResetPinPayload {
  old_pin: number;
  new_pin: number;
  confirm_pin: number;
}

export const resetTransactionPin = createAsyncThunk<
  void,
  ResetPinPayload, 
  {
    rejectValue: string; 
  }
>(
  'pin/reset',
  async ({ old_pin, new_pin, confirm_pin }: ResetPinPayload, { rejectWithValue }) => {
    try {
      const token = Cookies.get('authToken');
      if (!token) {
        throw new Error('Authentication token is missing');
      }

      const response = await axios.post(
        `${BASE_URL}/api/partner/settings/reset-pin`,
        { old_pin, new_pin, confirm_pin },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.error) {
        return rejectWithValue(response.data.message || 'Failed to reset PIN');
      }

      return; // No return value on success
    } catch (error: any) {
      if (error.response) {
        // Handle specific error statuses
        if (error.response.status === 401) {
          return rejectWithValue('Unauthorized: Please log in again');
        }
        if (error.response.status === 400) {
          return rejectWithValue(error.response.data.message || 'Invalid PIN format');
        }
        return rejectWithValue(error.response.data.message || 'Failed to reset PIN');
      } else if (error.request) {
        return rejectWithValue('No response from server. Please check your connection.');
      } else {
        return rejectWithValue(error.message || 'An unexpected error occurred');
      }
    }
  }
);