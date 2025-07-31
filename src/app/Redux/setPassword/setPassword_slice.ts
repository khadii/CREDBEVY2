import { createSlice } from '@reduxjs/toolkit';
import { setPasswordWithToken } from './setpassword';

interface PasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: PasswordState = {
  loading: false,
  error: null,
  success: false,
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    resetPasswordState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setPasswordWithToken.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(setPasswordWithToken.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(setPasswordWithToken.rejected, (state, action) => {
        state.loading = false;
        // Handle both rejected with value and without value cases
        if (action.payload) {
          // When rejected with value
          state.error = action.payload as string;
        } else if (action.error.message) {
          // When rejected without value
          state.error = action.error.message;
        } else {
          state.error = 'Failed to set password';
        }
      });
  },
});

export const { resetPasswordState } = passwordSlice.actions;

// Selectors
export const selectPasswordLoading = (state: { password: PasswordState }) => state.password.loading;
export const selectPasswordError = (state: { password: PasswordState }) => state.password.error;
export const selectPasswordSuccess = (state: { password: PasswordState }) => state.password.success;

export default passwordSlice.reducer;