// authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const verifyInvitation = createAsyncThunk<
  VerifyInvitationPayload,
  string,
  { rejectValue: string }
>("auth/verifyInvitation", async (token: string, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/invitations/verify/${token}`
    );
    
    return {
      email: response.data.email,
      organization: response.data.organization,
      inviter: response.data.inviter,
      role: response.data.role
    };
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(
        error.response.data.message || "Failed to verify invitation"
      );
    }
    return rejectWithValue("Network error. Please try again.");
  }
});



// types.ts
export interface InvitationState {
  loading: boolean;
  error: string | null;
  verified: boolean;
  invitationData: {
    email: string;
    organization: string;
    inviter: string;
    role: string;
  } | null;
}

export interface VerifyInvitationPayload {
  email: string;
  organization: string;
  inviter: string;
  role: string;
}