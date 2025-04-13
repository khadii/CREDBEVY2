import { createSlice } from "@reduxjs/toolkit";
import { delete_user_role } from "./user_role_thunk";

interface DeleteUserState {
  loading: boolean;
  error: string | null;
  message: string | null;
  success: boolean;
}

const initialState: DeleteUserState = {
  loading: false,
  error: null,
  message: null,
  success: false,
};

const deleteUserroleSlice = createSlice({
  name: "deleteUserrole",
  initialState,
  reducers: {
    clearDeleteUserRoleState: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(delete_user_role.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
        state.success = false;
      })
      .addCase(delete_user_role.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload?.message || "Role deleted successfully";
        state.success = true;
      })
      .addCase(delete_user_role.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error?.message || "Failed to delete role";
      });
  },
});

export const { clearDeleteUserRoleState } = deleteUserroleSlice.actions;
export default deleteUserroleSlice.reducer;