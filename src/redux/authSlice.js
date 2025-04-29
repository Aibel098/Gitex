// src/redux/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Rate limiting configuration
const MAX_ATTEMPTS = 5;
const ATTEMPT_RESET_TIMEOUT = 15 * 60 * 1000; // 15 minutes

// Initialize attempts from localStorage
let loginAttempts = parseInt(localStorage.getItem('loginAttempts') || '0');
const lastAttemptTime = localStorage.getItem('lastAttemptTime');

// Reset attempts if timeout has elapsed
if (lastAttemptTime && Date.now() - parseInt(lastAttemptTime) > ATTEMPT_RESET_TIMEOUT) {
  loginAttempts = 0;
  localStorage.setItem('loginAttempts', '0');
  localStorage.removeItem('lastAttemptTime');
}

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      // Check rate limit
      if (loginAttempts >= MAX_ATTEMPTS) {
        const timeSinceLastAttempt = Date.now() - parseInt(lastAttemptTime || '0');
        if (timeSinceLastAttempt < ATTEMPT_RESET_TIMEOUT) {
          const remainingTime = Math.ceil((ATTEMPT_RESET_TIMEOUT - timeSinceLastAttempt) / 60000);
          throw new Error(`Too many login attempts. Please try again in ${remainingTime} minutes.`);
        } else {
          // Reset if timeout has elapsed
          loginAttempts = 0;
          localStorage.setItem('loginAttempts', '0');
          localStorage.removeItem('lastAttemptTime');
        }
      }

      const response = await fetch(
        `https://67ee3137c11d5ff4bf78a6d8.mockapi.io/signup?username=${encodeURIComponent(userData.username)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        }
      );

      if (!response.ok) {
        loginAttempts++;
        localStorage.setItem('loginAttempts', loginAttempts.toString());
        localStorage.setItem('lastAttemptTime', Date.now().toString());
        throw new Error("Failed to fetch users");
      }

      const users = await response.json();

      if (users.length === 0) {
        loginAttempts++;
        localStorage.setItem('loginAttempts', loginAttempts.toString());
        localStorage.setItem('lastAttemptTime', Date.now().toString());
        throw new Error("Username not found");
      }

      const user = users[0];
      if (user.password !== userData.password) {
        loginAttempts++;
        localStorage.setItem('loginAttempts', loginAttempts.toString());
        localStorage.setItem('lastAttemptTime', Date.now().toString());
        throw new Error("Incorrect password");
      }

      // Reset on successful login
      loginAttempts = 0;
      localStorage.setItem('loginAttempts', '0');
      localStorage.removeItem('lastAttemptTime');

      return {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: { 
    user: null, 
    loading: false, 
    error: null,
    isAuthenticated: false
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      state.loading = false;
      state.isAuthenticated = false;
      loginAttempts = 0;
      localStorage.setItem('loginAttempts', '0');
      localStorage.removeItem('lastAttemptTime');
    },
    resetLoginAttempts: (state) => {
      loginAttempts = 0;
      localStorage.setItem('loginAttempts', '0');
      localStorage.removeItem('lastAttemptTime');
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, resetLoginAttempts } = authSlice.actions;
export default authSlice.reducer;