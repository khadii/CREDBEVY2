import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { single_role } from './user_role_thunk';


// Define interfaces for your data structure
interface Permission {
  id: number;
  name: string;
  guard_name: string;
  module: string;
  action: string;
  created_at: string;
  updated_at: string;
  pivot: {
    role_id: number;
    permission_id: number;
  };
}

interface Role {
  id: number;
  name: string;
  description: string | null;
  guard_name: string;
  partner_id: number | null;
  created_at: string | null;
  updated_at: string | null;
  permissions: Permission[];
}

interface PermissionsGrouped {
  [key: string]: Permission[];
}

interface RoleData {
  role: Role;
  permissions_grouped: PermissionsGrouped;
}

interface ApiResponse {
  error: boolean;
  message: string;
  data: RoleData;
}

interface SingleRoleState {
  data: ApiResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: SingleRoleState = {
  data: null,
  loading: false,
  error: null,
};

const singleRoleSlice = createSlice({
  name: 'singleRole',
  initialState,
  reducers: {
    // You can add any synchronous reducers here if needed
    clearRoleData: (state) => {
      state.data = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(single_role.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(single_role.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(single_role.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearRoleData } = singleRoleSlice.actions;
export default singleRoleSlice.reducer;