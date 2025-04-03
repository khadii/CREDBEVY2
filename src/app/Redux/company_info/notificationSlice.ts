import { createSlice } from '@reduxjs/toolkit';
import { 
    Notification as UpdateNotificationThunk,
  GetNotification as GetNotificationThunk 
} from './company_info_thunk';

interface NotificationSettings {
  uuid: string;
  partner_id: string;
  user_id: string | null;
  desktop_notifications: boolean;
  unread_notification_badge: boolean;
  communication_emails: boolean;
  announcements_updates: boolean;
  sound_notifications: boolean;
  created_at: string;
  updated_at: string;
}

interface NotificationState {
  loading: boolean;
  settings: NotificationSettings | null;
  error: string | null;
  success: boolean;
  lastUpdated: string | null;
}

const initialState: NotificationState = {
  loading: false,
  settings: null,
  error: null,
  success: false,
  lastUpdated: null,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clearNotificationError: (state) => {
      state.error = null;
    },
    resetNotificationSuccess: (state) => {
      state.success = false;
    },
    resetNotificationState: () => initialState,
  },
  extraReducers: (builder) => {
    // Update Notification cases
    builder.addCase(UpdateNotificationThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(UpdateNotificationThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload.data;
      state.success = true;
      state.lastUpdated = action.payload.data.updated_at;
    });
    builder.addCase(UpdateNotificationThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });

    // Get Notification cases
    builder.addCase(GetNotificationThunk.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(GetNotificationThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.settings = action.payload.data;
      state.lastUpdated = action.payload.data.updated_at;
    });
    builder.addCase(GetNotificationThunk.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { 
  clearNotificationError, 
  resetNotificationSuccess, 
  resetNotificationState 
} = notificationSlice.actions;

export default notificationSlice.reducer;