import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { bulk_action } from './loan_product_thunk';


interface BulkActionState {
  loading: boolean;
  success: boolean;
  error: string | null;
  data: any; 
}

const initialState: BulkActionState = {
  loading: false,
  success: false,
  error: null,
  data: null,
};

const bulkActionSlice = createSlice({
  name: 'bulkAction',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(bulk_action.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
        state.data = null;
      })
      .addCase(bulk_action.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.data = action.payload;
      })
      .addCase(bulk_action.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "An unexpected error occurred.";
        state.data = null;
      });
  },
});

export default bulkActionSlice.reducer;