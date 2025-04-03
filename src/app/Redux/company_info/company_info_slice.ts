import { createSlice } from "@reduxjs/toolkit";
import { fetchCompanyInfo } from "./company_info_thunk";

// Define a proper type for your company data
interface CompanyData {
  id: string;
  name: string;
  // ... other company fields
}

interface CompanyInfoState {
  loading: boolean;
  error: string | null;
  success: string | null;
  data: CompanyData | null;
}

const initialState: CompanyInfoState = {
  loading: false,
  error: null,
  success: null,
  data: null,
};

const CompanyInfoSlice = createSlice({
  name: "companyInfo",  
  initialState,
  reducers: {
    clearCompanyInfo(state) {
      state.data = null;
      state.error = null;
      state.success = null;
    },
    refreshCompanyInfo(state) {
      state.loading = true;  // This will trigger loading UI
      state.error = null;
      state.success = null;
      // Note: The actual data refresh will happen when the thunk is dispatched
      // after this reducer is called
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Company info fetched successfully"; 
        state.data = action.payload.data; 
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' 
          ? action.payload 
          : "Failed to fetch company info";
      });
  },
});

export const { clearCompanyInfo, refreshCompanyInfo } = CompanyInfoSlice.actions;
export default CompanyInfoSlice.reducer;