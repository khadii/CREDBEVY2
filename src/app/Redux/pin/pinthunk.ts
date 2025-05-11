import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface ConfirmPinParams {
  pin: number[];
  actionType: "interest" | "accept" | "reject";
}

interface ConfirmPinSuccess {
  message: string;
  actionType: "interest" | "accept" | "reject";
}

interface ConfirmPinError {
  message: string;
  actionType: "interest" | "accept" | "reject";
}

export const ConfirmPin = createAsyncThunk<
  ConfirmPinSuccess,
  ConfirmPinParams,
  { rejectValue: ConfirmPinError }
>("pin/confirm", async ({ pin, actionType }, { rejectWithValue }) => {
  try {
    const token = Cookies.get("authToken");
    if (!token) {
      return rejectWithValue({
        message: "Authentication token is missing.",
        actionType,
      });
    }

    const response = await axios.post(
      `${BASE_URL}/api/partner/settings/confirm-pin`,
      { pin: pin.join("") },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    return {
      message: response.data.message || "Operation successful",
      actionType,
    };
  } catch (error: any) {
    let errorMessage = "PIN confirmation failed";

    if (error.response?.data) {
      errorMessage =
        error.response.data.message ||
        error.response.data.error ||
        errorMessage;
    } else if (error.request) {
      errorMessage = "No response from server. Check your network connection.";
    } else {
      errorMessage = error.message || errorMessage;
    }

    return rejectWithValue({
      message: errorMessage,
      actionType,
    });
  }
});
