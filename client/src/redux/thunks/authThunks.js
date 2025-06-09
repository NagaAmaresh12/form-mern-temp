// src/features/auth/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios.js";

// ——— Sign In ———
export const signInUser = createAsyncThunk(
  "auth/signInUser",
  async (credentials, thunkAPI) => {
    try {
      const { data } = await axios.post("/auth/signIn", credentials, {
        withCredentials: true,
      });
      return data; // e.g. { user, token… }
    } catch (err) {
      // err.response?.data?.message is preferred if your API returns { message: "…" }
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ——— Sign Up ———
export const signUpUser = createAsyncThunk(
  "auth/signUpUser",
  async (newUser, thunkAPI) => {
    console.log("newUser in thunk", newUser);

    try {
      const { data } = await axios.post("/auth/signUp", newUser, {
        withCredentials: true,
      });
      return data; // e.g. { user, token… }
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ——— Check Authentication ———
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/auth/profile", {
        withCredentials: true,
      });
      return data; // e.g. { user }
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// ——— Logout ———
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "/auth/logout",
        {},
        { withCredentials: true }
      );
      return data; // e.g. { message: "Logged out" }
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      console.log("error in logout", message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const updateAvatarSeed = createAsyncThunk(
  "auth/updateAvatarSeed", // ✅ corrected spelling
  async (avatarSeed, thunkAPI) => {
    try {
      const { data } = await axios.patch("/auth/avatarSeed", {
        avatar: avatarSeed,
      });
      console.log("data", data);

      return data; // e.g. { avatarSeed: "new-seed" }
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      console.log("error in avatarseed", message);

      return thunkAPI.rejectWithValue(message);
    }
  }
);
