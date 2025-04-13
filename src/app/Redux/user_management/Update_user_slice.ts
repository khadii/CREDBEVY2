import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Update_user } from './user_mananagement_thunk';

interface UserProps {
  email: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  roleId: number;
  deactivated: number;
  user_id: string;
}
interface UserState {
    loading: boolean;
    success: boolean;
    error: string | null;
    userData: UserProps | null;
  }
  
  const initialState: UserState = {
    loading: false,
    success: false,
    error: null,
    userData: null,
  };
  
const updatuserSlice = createSlice({
    name: 'Adduser',
    initialState,
    reducers: {
      resetUserState: (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.userData = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(Update_user.pending, (state) => {
          state.loading = true;
          state.success = false;
          state.error = null;
        })
        .addCase(Update_user.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.success = true;
          state.userData = action.payload;
        })
        .addCase(Update_user.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.success = false;
          state.error = action.payload || "Failed to add user";
        });
    },
  });
  
  export const { resetUserState } = updatuserSlice.actions;
  export default updatuserSlice.reducer;