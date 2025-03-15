import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunks";
import Cookies from "js-cookie";
import { isTokenConsistent, isTokenValid } from "../isTokenValid";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  last_login_token: string | null;
}

const token = Cookies.get("authToken");
// const isAuthenticated = 
const initialState: AuthState = {
  user: null,
  token: token || null,
  last_login_token: null,
  loading: false,
  error: null,
  isAuthenticated: !!token && isTokenValid(token)
  ,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      Cookies.remove("authToken");
    },
    revalidateToken: (state) => {
      if (state.token) {
        state.isAuthenticated = isTokenValid(state.token);
      } else {
        state.isAuthenticated = false;
      }
    },
    checkTokenConsistency: (state) => {
      const cookieToken = Cookies.get("authToken");
      if (!isTokenConsistent(cookieToken, state.token)) {
        state.token = null;
        state.user = null;
        state.isAuthenticated = false;
        Cookies.remove("authToken");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { error, data, message } = action.payload;
        if (!error) {
          state.token = data.access_token;
          state.user = data.partner;
          state.isAuthenticated = true;
          Cookies.set("authToken", data.access_token);
        } else {
          state.error = message;
          state.isAuthenticated = false;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
      });
  },
});

export const { logout, revalidateToken, checkTokenConsistency } = authSlice.actions;
export default authSlice.reducer;