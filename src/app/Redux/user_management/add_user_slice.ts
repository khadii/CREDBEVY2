// userSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Add_user } from "./user_mananagement_thunk";


interface UserState {
  loading: boolean;
  error: string | null;
  success: boolean;
  userData: any;
}

const initialState: UserState = {
  loading: false,
  error: null,
  success: false,
  userData: null,
};

const add_userSlice = createSlice({
  name: "adduser",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.userData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(Add_user.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(Add_user.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userData = action.payload;
      })
      .addCase(Add_user.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.success = false;
      });
  },
});

export const { resetUserState } = add_userSlice.actions;
export default add_userSlice.reducer;