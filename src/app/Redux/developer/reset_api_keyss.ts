import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { reset_api_keyss } from './developerthunk';


interface ApiKeysState {
  loading: boolean;
  error: string | null;
  success: boolean;
  data: {
    api_key: string;
    secret_key: string;
    sandbox_url: string;
  } | null;
}

const initialState: ApiKeysState = {
  loading: false,
  error: null,
  success: false,
  data: null,
};

const resetApiKeysState = createSlice({
  name: 'resetApiKeysState',
  initialState,
  reducers: {
    // You can add other synchronous reducers here if needed
    resetApiKeysStates: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(reset_api_keyss.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(reset_api_keyss.fulfilled, (state, action: PayloadAction<{
        api_key: string;
        secret_key: string;
        sandbox_url: string;
      }>) => {
        state.loading = false;
        state.success = true;
        state.data = action.payload;
      })
      .addCase(reset_api_keyss.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to reset API keys';
        state.success = false;
      });
  },
});

export const { resetApiKeysStates } = resetApiKeysState.actions;
export default resetApiKeysState.reducer;