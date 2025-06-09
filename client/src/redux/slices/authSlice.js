import { createSlice } from "@reduxjs/toolkit";
import {
  signUpUser,
  signInUser,
  checkAuth,
  logoutUser,
  updateAvatarSeed,
} from "../thunks/authThunks.js";

const initialState = {
  user: {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    role: null,
    avatarSeed: "",
  },
  status: "idle",
  isAuthenticated: false,
  loading: true,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle sign in
    builder
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        console.log("signinuser payload", action.payload);
        const { id, firstName, lastName, email, role, avatarSeed } =
          action.payload.user;

        state.user = {
          _id: id,
          firstName,
          lastName,
          email,
          role,
          avatarSeed: avatarSeed,
        };
        state.loading = false;
        state.status = "succeeded";
        // state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = { ...initialState.user };
        state.error = action.payload || action.error.message;
      })
      //handle signUp
      .addCase(signUpUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        console.log("signUpUser payload", action.payload);
        const { id, firstName, lastName, email, role, avatarSeed } =
          action.payload.user;

        state.user = {
          _id: id,
          firstName,
          lastName,
          email,
          role,
          avatarSeed: avatarSeed,
        };
        state.loading = false;
        state.status = "succeeded";
        // state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = { ...initialState.user };
        state.error = action.payload || action.error.message;
      })

      // Handle auth check (e.g. on initial load with HttpOnly cookie)
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        console.log("check auth payload", action.payload.user);
        const { id, firstName, lastName, email, role, avatarSeed } =
          action.payload.user;

        state.user = {
          _id: id,
          firstName,
          lastName,
          email,
          role,
          avatarSeed: avatarSeed,
        };
        state.loading = false;
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.loading = false;
        state.status = "unauthenticated";
        state.isAuthenticated = false;
        state.user = { ...initialState.user };
        state.error = action.payload || action.error.message;
      })

      // Handle logout
      .addCase(logoutUser.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.loading = false;
        state.isAuthenticated = false;
        state.user = { ...initialState.user };
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        // Keep user state intact if logout fails
        state.error = action.payload || action.error.message;
      })
      // Handle avatar seed update
      .addCase(updateAvatarSeed.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAvatarSeed.fulfilled, (state, action) => {
        console.log("avatar from slice", action.payload.avatarSeed);

        state.loading = false;
        state.status = "succeeded";
        state.user.avatarSeed = action.payload.avatarSeed;
        state.error = null;
      })
      .addCase(updateAvatarSeed.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default authSlice.reducer;
