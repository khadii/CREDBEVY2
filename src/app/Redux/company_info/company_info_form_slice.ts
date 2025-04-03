import { createSlice } from "@reduxjs/toolkit";
import { CompanyInfoForm } from "./company_info_thunk";

// Define types for company data
interface CompanyData {
  partner_name: string;
  partner_website: string;
  partner_contact_phone_number: string;
  partner_logo: string;
  partner_contact_email: string;
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

const CompanyInfoFormSlice = createSlice({
  name: "companyInfoForm",
  initialState,
  reducers: {
    // Clear company info state
    clearCompanyInfo(state) {
      state.data = null;
      state.error = null;
      state.success = null;
    },
    // Reset success message
    resetSuccess(state) {
      state.success = null;
    },
    // Reset error message
    resetError(state) {
      state.error = null;
    },
    // Optional: Set initial data
    setCompanyData(state, action: { payload: CompanyData }) {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(CompanyInfoForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(CompanyInfoForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message || "Company information updated successfully";
        state.data = action.payload.data || state.data;
      })
      .addCase(CompanyInfoForm.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === 'string' 
          ? action.payload 
          : "Failed to update company information";
      });
  },
});

export const { 
  clearCompanyInfo, 
  resetSuccess, 
  resetError,
  setCompanyData 
} = CompanyInfoFormSlice.actions;
export default CompanyInfoFormSlice.reducer;