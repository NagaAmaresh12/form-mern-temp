import axios from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Read all projects
export const fetchAllProjects = createAsyncThunk(
  "projects/fetchAllProjects",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/projects");
      console.log("fetchAllProjects data", data);

      return data; // adjust based on actual response structure
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Read single project
export const fetchProject = createAsyncThunk(
  "projects/fetchProject",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(`/projects/${id}`);
      console.log("fetchproject data", data);
      return data; // adjust based on actual response structure
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create a new project
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (formData, thunkAPI) => {
    console.log("formdata", formData);

    try {
      const { data } = await axios.post("/projects/create", formData);
      console.log("createProjectThunks {data}", data);

      return data; // data has message success and data
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Edit a single project
export const editProject = createAsyncThunk(
  "projects/editProject",
  async ({ id, formData }, thunkAPI) => {
    try {
      console.log("projecthunk.js formdata", formData);

      const { data } = await axios.put(`/projects/edit/${id}`, formData);
      console.log("updated results data", data);

      return data;
    } catch (err) {
      // const message =
      //   err.response?.data?.message || err.response?.data?.error || err.message;
      return thunkAPI.rejectWithValue(err);
    }
  }
);

// Delete a single project
export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/projects/delete/${id}`);
      console.log("deleteProject data", data);

      return data; // or return `data` if needed
    } catch (err) {
      const message =
        err.response?.data?.message || err.response?.data?.error || err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
