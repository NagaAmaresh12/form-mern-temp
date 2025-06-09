import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProjects,
  fetchProject,
  createProject,
  editProject,
  deleteProject,
} from "../thunks/projectThunk.js";

const initialState = {
  projects: [],
  projectCreated: false,
  currentProject: null,
  status: "idle",
  loading: false,
  error: null,
};

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjectCreated: (state, action) => {
      state.projectCreated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all projects
      .addCase(fetchAllProjects.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllProjects.fulfilled, (state, action) => {
        state.projects = action.payload.data;
        state.loading = false;
        state.status = "success";
        state.error = null;
      })
      .addCase(fetchAllProjects.rejected, (state, action) => {
        state.projects = [];
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch single project
      .addCase(fetchProject.pending, (state) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProject.fulfilled, (state, action) => {
        state.currentProject = action.payload.data;
        state.loading = false;
        state.status = "success";
        state.error = null;
      })
      .addCase(fetchProject.rejected, (state, action) => {
        state.currentProject = null;
        state.loading = false;
        state.status = "failed";
        state.error = action.payload;
      })

      // Create project
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload.data); // Add to existing list
        state.status = "success";
        state.loading = false;
        state.error = null;
      })

      // Edit project
      .addCase(editProject.fulfilled, (state, action) => {
        const updatedProject = action.payload.data;
        state.projects = state.projects.map((proj) =>
          proj._id === updatedProject._id ? updatedProject : proj
        );
        state.status = "success";
        state.loading = false;
        state.error = null;
      })

      // Delete project
      .addCase(deleteProject.fulfilled, (state, action) => {
        const deletedId = action.meta.arg;
        state.projects = state.projects.filter((p) => p._id !== deletedId);
        state.status = "success";
        state.loading = false;
        state.error = null;
      });
  },
});
export const { setProjectCreated } = projectsSlice.actions;
export default projectsSlice.reducer;
