import { createSlice } from "@reduxjs/toolkit";

import Cookies from "js-cookie";
import { isTokenValid, isTokenConsistent } from "../isTokenValid";

import { verifyTwoFa, resendOtp, loginUser } from "./AuthTwo";


interface AuthState {
  user: any | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  otpData: {
    partnerUserId: string | null;
    otp: number | null;
  } | null;
  verificationLoading: boolean;
  verificationError: string | null;
  resendLoading: boolean;
  resendError: string | null;
  resendSuccess: boolean;
}

const token = Cookies.get("authToken");
const initialState: AuthState = {
  user: null,
  token: token || null,
  loading: false,
  error: null,
  isAuthenticated: !!token && isTokenValid(token),
  otpData: null,
  verificationLoading: false,
  verificationError: null,
  resendLoading: false,
  resendError: null,
  resendSuccess: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.otpData = null;
      state.resendSuccess = false;
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
        state.otpData = null;
        Cookies.remove("authToken");
      }
    },
    clearOtpData: (state) => {
      state.otpData = null;
    },
    clearVerificationError: (state) => {
      state.verificationError = null;
    },
    clearResendStatus: (state) => {
      state.resendError = null;
      state.resendSuccess = false;
    },
    resetAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.otpData = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        const { error, data, message } = action.payload;
        
        if (!error) {
          state.otpData = {
            partnerUserId: data.partner_user_id,
            otp: data.otp
          };
          state.error = null;
        } else {
          state.error = message;
          state.otpData = null;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.otpData = null;
      })

      // Verify 2FA cases
      .addCase(verifyTwoFa.pending, (state) => {
        state.verificationLoading = true;
        state.verificationError = null;
      })
      .addCase(verifyTwoFa.fulfilled, (state, action) => {
        state.verificationLoading = false;
        const { error, data, message } = action.payload;
        
        if (!error) {
          state.token = data.access_token;
          state.user = data.partner;
          state.isAuthenticated = true;
          state.otpData = null;
          state.resendSuccess = false;
          Cookies.set("authToken", data.access_token);
        } else {
          state.verificationError = message;
        }
      })
      .addCase(verifyTwoFa.rejected, (state, action) => {
        state.verificationLoading = false;
        state.verificationError = action.payload as string;
      })

      // Resend OTP cases
      .addCase(resendOtp.pending, (state) => {
        state.resendLoading = true;
        state.resendError = null;
        state.resendSuccess = false;
      })
      .addCase(resendOtp.fulfilled, (state, action) => {
        state.resendLoading = false;
        const { error, data, message } = action.payload;
        
        if (!error) {
          state.resendSuccess = true;
          if (data.otp) {
            state.otpData = {
              partnerUserId: data.partner_user_id,
              otp: data.otp
            };
          }
        } else {
          state.resendError = message;
        }
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.resendLoading = false;
        state.resendError = action.payload as string;
      });
  },
});

export const { 
  logout,
  revalidateToken,
  checkTokenConsistency,
  clearOtpData,
  clearVerificationError,
  clearResendStatus,
  resetAuthState
} = authSlice.actions;

export default authSlice.reducer;