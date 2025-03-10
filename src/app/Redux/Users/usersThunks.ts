import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";




// Fetch all users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token');
      const response = await axios.get("https://api.example.com/users", {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Check your network and try again"
      );
    }
  }
);







// Fetch user by ID
export const fetchUserById = createAsyncThunk(
  "users/fetchUserById",
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = Cookies.get('token'); 
      const response = await axios.get(
        `https://api.example.com/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Check your network and try again"
      );
    }
  }
);