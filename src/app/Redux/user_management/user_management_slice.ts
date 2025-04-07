import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { list_of_users } from "./user_mananagement_thunk";


interface userManagementSlice {
  loading: boolean;
  error: string | null;
  success: string | null;
  data: any | null;
}

const initialState: userManagementSlice = {
  loading: false,
  error: null,
  success: null,
  data: null,
};

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState,
  reducers: {
    resetUserManagementState: (state) => {
      return initialState;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(list_of_users.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(list_of_users.fulfilled, (state, action) => {
        state.loading = false;
        state.success = "Users loaded successfully";
        state.data = action.payload;
      })
      .addCase(list_of_users.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || "Failed to load users";
        state.data = null;
      });
  }
});

export const { resetUserManagementState } = userManagementSlice.actions;
export default userManagementSlice.reducer;