import { permissions_by_module } from "./user_role_thunk";
import { createSlice } from '@reduxjs/toolkit';



interface PermissionsByModuleState {
    data: any;
    loading: boolean;
    error: string | null;
  }
  
  const initialState: PermissionsByModuleState = {
    data: null,
    loading: false,
    error: null,
  };
  
  const permissionsByModuleSlice = createSlice({
    name: 'permissionsByModule',
    initialState,
    reducers: {
      // You can add additional reducers here if needed
      clearPermissionsByModule: (state) => {
        state.data = null;
        state.error = null;
        state.loading = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(permissions_by_module.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(permissions_by_module.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
        })
        .addCase(permissions_by_module.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export const { clearPermissionsByModule } = permissionsByModuleSlice.actions;
  export default permissionsByModuleSlice.reducer;