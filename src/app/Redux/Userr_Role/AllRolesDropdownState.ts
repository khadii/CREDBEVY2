import { all_roles_dropdownata } from "./user_role_thunk";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'




interface AllRolesDropdownState {
    data: any[];
    loading: boolean;
    error: string | null;
    message: string | null;
  }
  
  const initialState: AllRolesDropdownState = {
    data: [],
    loading: false,
    error: null,
    message: null,
  };
  
  const allRolesDropdownSlice = createSlice({
    name: 'allRolesDropdown',
    initialState,
    reducers: {
      // You can add additional reducers here if needed
      resetRolesDropdownState: (state) => {
        state.data = [];
        state.loading = false;
        state.error = null;
        state.message = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(all_roles_dropdownata.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.message = null;
        })
        .addCase(all_roles_dropdownata.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload.data;
          state.message = action.payload.message;
        })
        .addCase(all_roles_dropdownata.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
          state.data = [];
        });
    },
  });
  
  export const { resetRolesDropdownState } = allRolesDropdownSlice.actions;
  export default allRolesDropdownSlice.reducer;