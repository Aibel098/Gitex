// src/redux/signUpSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const signUpUser = createAsyncThunk(
  "signUp/signUpUser",
  async (userData, { rejectWithValue }) => {
    try {
      // First check if user already exists
      const checkResponse = await fetch(
        `https://67ee3137c11d5ff4bf78a6d8.mockapi.io/signup?email=${encodeURIComponent(userData.email)}`
      );
      const existingUsers = await checkResponse.json();
      if (existingUsers.length > 100) {
        throw new Error("Email already registered");
      }

      const response = await fetch("https://67ee3137c11d5ff4bf78a6d8.mockapi.io/signup", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          ...userData,
          createdAt: new Date().toISOString(),
          // Remove confirmPassword from stored data
          confirmPassword: undefined
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed: Server error");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const signUpSlice = createSlice({
  name: "signUp",
  initialState: { 
    loading: false, 
    error: null, 
    success: false,
    user: null // Added to store user data
  },
  reducers: {
    resetSignupState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.user = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export const { resetSignupState } = signUpSlice.actions;
export default signUpSlice.reducer;