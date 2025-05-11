import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetch_api_keys } from "./developerthunk";

interface ApiKeysState {
  loading: boolean;
  error: string | null;
  message: string | null;
  data: {
    api_key: string | null;
    secret_key: string | null;
    sandbox_url: string | null;
  };
}

const initialState: ApiKeysState = {
  loading: false,
  error: null,
  message: null,
  data: {
    api_key: null,
    secret_key: null,
    sandbox_url: null,
  },
};

const apiKeysSlice = createSlice({
  name: "apiKeys",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_api_keys.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(
        fetch_api_keys.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.message =
            action.payload.message || "API Credentials Fetched Successfully";
          state.data = {
            api_key: action.payload.data.api_key,
            secret_key: action.payload.data.secret_key,
            sandbox_url: action.payload.data.sandbox_url,
          };
        }
      )
      .addCase(fetch_api_keys.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch API keys";
        state.message = null;
        state.data = {
          api_key: null,
          secret_key: null,
          sandbox_url: null,
        };
      });
  },
});

export default apiKeysSlice.reducer;
