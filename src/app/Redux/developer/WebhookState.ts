interface Webhook {
  event_type: string;
  url: string | null;
}

interface WebhookResponse {
  webhooks: Webhook[];
}

const webhookResponse: WebhookResponse = {
  "webhooks": [
    {
      "event_type": "loan_application.create",
      "url": null
    },
    {
      "event_type": "loan_application.interest",
      "url": null
    },
    {
      "event_type": "loan_application.disbursal",
      "url": null
    },
    {
      "event_type": "loan_product.create",
      "url": null
    },
    {
      "event_type": "loan_product.update",
      "url": null
    },
    {
      "event_type": "loan_repayment.initiate",
      "url": null
    }
  ]
};

import { createSlice } from '@reduxjs/toolkit';
import { fetch_webhook_url } from './developerthunk';

interface WebhookState {
  webhooks: Webhook[];
  loading: boolean;
  error: string | null;
}

const initialState: WebhookState = {
  webhooks: [],
  loading: false,
  error: null,
};

const webhookSlice = createSlice({
  name: 'webhooks',
  initialState,
  reducers: {
    resetWebhookState: () => initialState,
    // You can add other reducers here for updating specific webhooks if needed
    updateWebhookUrl: (state, action) => {
      const { event_type, url } = action.payload;
      const webhookToUpdate = state.webhooks.find(wh => wh.event_type === event_type);
      if (webhookToUpdate) {
        webhookToUpdate.url = url;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetch_webhook_url.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch_webhook_url.fulfilled, (state, action) => {
        state.loading = false;
        state.webhooks = action.payload.webhooks;
      })
      .addCase(fetch_webhook_url.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetWebhookState, updateWebhookUrl } = webhookSlice.actions;
export default webhookSlice.reducer;