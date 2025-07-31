import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { updatePasswordWith2FA } from './passwordResetThunk';


interface PasswordUpdateState {
  loading: boolean;
  error: string | null;
  success: boolean;
  twoFAResponse: any | null;
}

const initialState: PasswordUpdateState = {
  loading: false,
  error: null,
  success: false,
  twoFAResponse: null,
};

const passwordUpdateSlice = createSlice({
  name: 'passwordUpdate/with2FA',
  initialState,
  reducers: {
    resetPasswordUpdateState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.twoFAResponse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePasswordWith2FA.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.twoFAResponse = null;
      })
      .addCase(updatePasswordWith2FA.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        // Store 2FA response if it exists
        if (action.payload.data && action.payload.data.length > 0) {
          state.twoFAResponse = action.payload.data[0];
        }
      })
      .addCase(updatePasswordWith2FA.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to update password';
      });
  },
});

export const { resetPasswordUpdateState } = passwordUpdateSlice.actions;

// Selectors
export const selectPasswordUpdateLoading = (state: { passwordUpdate: PasswordUpdateState }) => 
  state.passwordUpdate.loading;
export const selectPasswordUpdateError = (state: { passwordUpdate: PasswordUpdateState }) => 
  state.passwordUpdate.error;
export const selectPasswordUpdateSuccess = (state: { passwordUpdate: PasswordUpdateState }) => 
  state.passwordUpdate.success;
export const selectTwoFAResponse = (state: { passwordUpdate: PasswordUpdateState }) => 
  state.passwordUpdate.twoFAResponse;

export default passwordUpdateSlice.reducer;