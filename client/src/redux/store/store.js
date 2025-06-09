// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";

import authReducer from "@/redux/slices/authSlice.js";
import projectsReducer from "@/redux/slices/projectSlice.js";
import confettiSlice from "@/redux/slices/confettiSlice.js";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
    confetti: confettiSlice,
  },
});
