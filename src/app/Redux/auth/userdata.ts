import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to clear token and potentially redirect (optional)
const handleUnauthorizedError = () => {
  Cookies.remove("authToken");
  // Optionally, you can redirect the user to the login page here.
  // window.location.href = '/login';
};

export const fetchUserData = createAsyncThunk(
  "user/fetchUserData",
  async (_, { rejectWithValue, dispatch }) => { // Add dispatch here
    try {
      const token = Cookies.get("authToken");
      if (!token) {
        handleUnauthorizedError(); // Clear token even if it's missing initially
        return rejectWithValue("Authentication token is missing. Please log in again.");
      }

      const response = await axios.get(
        `${BASE_URL}/api/partner/me`,
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
          // Dispatch an action to clear user data from the Redux store
          dispatch(userSlice.actions.clearUserData());
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

interface UserState {
  data: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserData: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        // The error payload will contain the specific message including "Unauthorized"
        state.error = action.payload as string;
      });
  },
});

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;