
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { delete_user } from './user_mananagement_thunk';

interface UserId {
  user_id: string;
}

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
  success: false
};



const deleteUserSlice = createSlice({
    name: 'deleteUser',
    initialState,
    reducers: {
      clearDeleteUserState: (state) => {
        state.loading = false;
        state.error = null;
        state.message = null;
        state.success=false
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(delete_user.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null;
        })
        .addCase(delete_user.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
          state.loading = false;
          state.message = action.payload.message;
          state.success=true;
        })
        .addCase(delete_user.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { clearDeleteUserState } = deleteUserSlice.actions;
  export default deleteUserSlice.reducer;
  