import { createSlice } from '@reduxjs/toolkit';
import { accept_interest, decline_interest } from './loan_request_thunk';

interface LoanInterestState {
  declineLoading: boolean;
  declineSuccess: boolean;
  declineError: string | null;
  declineData: any;
  
  acceptLoading: boolean;
  acceptSuccess: boolean;
  acceptError: string | null;
  acceptData: any;
}

const initialState: LoanInterestState = {
  declineLoading: false,
  declineSuccess: false,
  declineError: null,
  declineData: null,
  
  acceptLoading: false,
  acceptSuccess: false,
  acceptError: null,
  acceptData: null,
};

export const loanrejectaccept = createSlice({
  name: 'loanInterest',
  initialState,
  reducers: {
    resetDeclineState: (state) => {
      state.declineLoading = false;
      state.declineSuccess = false;
      state.declineError = null;
      state.declineData = null;
    },
    resetAcceptState: (state) => {
      state.acceptLoading = false;
      state.acceptSuccess = false;
      state.acceptError = null;
      state.acceptData = null;
    },
    resetAllLoanInterestState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Decline Interest Cases
      .addCase(decline_interest.pending, (state) => {
        state.declineLoading = true;
        state.declineSuccess = false;
        state.declineError = null;
        state.declineData = null;
      })
      .addCase(decline_interest.fulfilled, (state, action) => {
        state.declineLoading = false;
        state.declineSuccess = true;
        state.declineData = action.payload;
      })
      .addCase(decline_interest.rejected, (state, action) => {
        state.declineLoading = false;
        state.declineSuccess = false;
        state.declineError = action.payload as string || 'Failed to decline interest';
      })
      
      // Accept Interest Caseswww
      .addCase(accept_interest.pending, (state) => {
        state.acceptLoading = true;
        state.acceptSuccess = false;
        state.acceptError = null;
        state.acceptData = null;
      })
      .addCase(accept_interest.fulfilled, (state, action) => {
        state.acceptLoading = false;
        state.acceptSuccess = true;
        state.acceptData = action.payload;
      })
      .addCase(accept_interest.rejected, (state, action) => {
        state.acceptLoading = false;
        state.acceptSuccess = false;
        state.acceptError = action.payload as string || 'Failed to accept interest';
      });
  },
});

export const { 
  resetDeclineState, 
  resetAcceptState,
  resetAllLoanInterestState 
} = loanrejectaccept.actions;

export default loanrejectaccept.reducer;