import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "./authThunks";
import Cookies from "js-cookie";

interface AuthState {
  isAuthenticated: boolean;
  user: { email: string; token: string } | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!Cookies.get("token"), 
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle login pending state
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null; 
      })
      // Handle login success state
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ email: string; token: string }>) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
        Cookies.set("token", action.payload.token); 
      })
      // Handle login failure
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        
        // Ensure the error is a string
        if (typeof action.payload === "string") {
          state.error = action.payload;
        } else if (action.error.message) {
          state.error = action.error.message; 
        } else {
          state.error = "An unexpected error occurred"; 
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;