
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { all_roles_permissions } from './user_role_thunk';

export interface Permission {
  id: number;
  name: string;
  guard_name: string;
  module: string;
  action: string;
  created_at: string;
  updated_at: string;
}
interface PermissionsState {
  data: Permission[];
  loading: boolean;
  error: string | null;
  message: string | null;
}

const initialState: PermissionsState = {
  data: [],
  loading: false,
  error: null,
  message: null,
};




const permissionsSlice = createSlice({
    name: 'permissions',
    initialState,
    reducers: {
      clearPermissions: (state) => {
        state.data = [];
        state.error = null;
        state.message = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(all_roles_permissions.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null;
        })
        .addCase(all_roles_permissions.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          if (action.payload.error === false) {
            state.data = action.payload.data;
            state.message = action.payload.message;
          } else {
            state.error = action.payload.message || 'Failed to fetch permissions';
          }
        })
        .addCase(all_roles_permissions.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload || 'Failed to fetch permissions';
        });
    },
  });
  export const { clearPermissions } = permissionsSlice.actions;
  export default permissionsSlice.reducer;