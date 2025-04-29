import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "./signUpSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    auth: authReducer,
  },
});
