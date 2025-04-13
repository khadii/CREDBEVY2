import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { get_single_user } from './user_mananagement_thunk';
// import { get_single_user } from './yourThunkFile'; // Import your thunk

// Define types for the user data
interface Role {
  id: number;
  name: string;
  guard_name: string;
  created_at: string | null;
  updated_at: string | null;
  pivot: {
    model_id: number;
    role_id: number;
    model_type: string;
  };
}

interface UserData {
  uuid: string;
  first_name: string;
  last_name: string;
  user_name: string | null;
  email: string;
  phone_number: string;
  deactivated: number;
  created_at: string;
  partner_id: string;
  roles: Role[];
}

interface UserResponse {
  error: boolean;
  message: string;
  data: UserData | null;
}

interface UserState {
  loading: boolean;
  error: string | null;
  user: UserData | null;
  success: boolean;
}

const initialState: UserState = {
  loading: false,
  error: null,
  user: null,
  success: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // You can add other reducers here if needed
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_single_user.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(get_single_user.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload.data;
      })
      .addCase(get_single_user.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user';
        state.user = null;
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;