import express from "express";
import {
  signInUser,
  logoutUser,
  protectedRoute,
  refreshToken,
  signUpUser,
  Profile,
  avatarSeed,
} from "../controllers/auth.controller.js";
import {
  verifyAccessToken,
  verifyRefreshToken,
} from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/protected-data", verifyAccessToken, protectedRoute);
router.post("/signUp", signUpUser);
router.post("/signIn", signInUser);
router.get("/profile", verifyAccessToken, Profile);
router.post("/logout", verifyAccessToken, logoutUser);
router.get("/refresh-token", verifyRefreshToken, refreshToken);
router.patch("/avatarSeed", verifyAccessToken, avatarSeed);

export default router;
