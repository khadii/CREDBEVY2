import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { update_role } from './user_role_thunk';


// Interfaces
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

interface RoleData {
  id: number;
  name: string;
  description: string;
  guard_name: string;
  partner_id: string;
  created_at: string;
  updated_at: string;
  permissions: Permission[];
}

interface UpdateRoleResponse {
  error: boolean;
  message: string;
  data: RoleData;
}

interface UpdateRoleState {
  loading: boolean;
  success: boolean;
  error: string | null;
  updatedRole: RoleData | null;
  message: string| null;
}

interface UpdateRolePayload {
  name: string;
  description: string;
  permissions: any[]; 
  id: any;
}

// Initial state
const initialState: UpdateRoleState = {
  loading: false,
  success: false,
  error: null,
  updatedRole: null,
  message: null
};




const updateRoleSlice = createSlice({
    name: 'updateRole',
    initialState,
    reducers: {
      resetUpdateRoleState: (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.updatedRole = null;
        state.message= null

      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(update_role.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
          state.updatedRole = null;
          state.message= null
        })
        .addCase(update_role.fulfilled, (state, action: PayloadAction<UpdateRoleResponse>) => {
          state.loading = false;
          state.success = true;
          state.error = null;
          state.updatedRole = action.payload.data;
          state.message=action.payload.message
        })
        .addCase(update_role.rejected, (state, action) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload as string;
          state.updatedRole = null;
        });
    },
  });
  
  // Export actions and reducer
  export const { resetUpdateRoleState } = updateRoleSlice.actions;
  export default updateRoleSlice.reducer;