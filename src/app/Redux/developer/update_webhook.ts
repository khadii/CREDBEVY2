import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { update_webhook_url } from "./developerthunk";

// Types
export interface WebhookPayload {
  loan_products: string;
  loan_requests: string;
  indicate_interest: string;
  loan_approval: string;
  loan_repayments: string;
}

export interface WebhookData {
  partner_id: number;
  event_type: string;
  url: string;
  type: string;
  token: string;
  uuid: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface WebhookResponse {
  message: string;
  data: {
    "loan_application.create": WebhookData;
    "loan_application.interest": WebhookData;
    "loan_application.disbursal": WebhookData;
    "loan_product.create": WebhookData;
    "loan_product.update": WebhookData;
    "loan_repayment.initiate": WebhookData;
  };
}

interface WebhookState {
  data: WebhookResponse["data"] | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

// Initial state
const initialState: WebhookState = {
  data: null,
  loading: false,
  error: null,
  success: false,
};


// Slice
const webhookSlice = createSlice({
  name: "update_webhook_url",
  initialState,
  reducers: {
    resetWebhookState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(update_webhook_url.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(
        update_webhook_url.fulfilled,
        (state, action: PayloadAction<WebhookResponse>) => {
          state.loading = false;
          state.data = action.payload.data;
          state.success = true;
        }
      )
      .addCase(update_webhook_url.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

// Export actions and reducer
export const { resetWebhookState } = webhookSlice.actions;
export default webhookSlice.reducer;