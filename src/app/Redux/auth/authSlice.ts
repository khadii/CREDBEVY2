import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunks";
import Cookies from "js-cookie";

interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      Cookies.remove("authToken"); 
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
        const { error, data,message } = action.payload;
        if (!error) {
          console.log('token', data.access_token);
          state.token = data.access_token;
          state.user = data.partner;

          // Set the token in a cookie instead of localStorage
          Cookies.set("authToken", data.access_token, { expires: 7 }); // Expires in 7 days
        } else {
          state.error=message
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;