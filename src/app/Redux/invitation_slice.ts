// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InvitationState, verifyInvitation, VerifyInvitationPayload } from "./invitation_thunk";


const initialState: InvitationState = {
  loading: false,
  error: null,
  verified: false,
  invitationData: null,
};

const invitationSlice = createSlice({
  name: "invitation",
  initialState,
  reducers: {
    clearInvitationError: (state) => {
      state.error = null;
    },
    resetInvitationState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyInvitation.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verified = false;
      })
      .addCase(
        verifyInvitation.fulfilled,
        (state, action: PayloadAction<VerifyInvitationPayload>) => {
          state.loading = false;
          state.verified = true;
          state.invitationData = action.payload;
        }
      )
      .addCase(
        verifyInvitation.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to verify invitation";
          state.verified = false;
        }
      );
  },
});

export const { clearInvitationError, resetInvitationState } =
  invitationSlice.actions;

export default invitationSlice.reducer;