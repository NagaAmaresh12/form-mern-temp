import express from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  fetchAllProjects,
  fetchSingleProject,
  createProject,
  editProject,
  deleteProject,
} from "../controllers/projects.controller.js";
const router = express.Router();
router.get("/", verifyAccessToken, fetchAllProjects);
router.get("/:id", verifyAccessToken, fetchSingleProject);
router.post("/create", verifyAccessToken, createProject);
router.put("/edit/:id", verifyAccessToken, editProject);
router.delete("/delete/:id", verifyAccessToken, deleteProject);
export default router;
