import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // ✅ Required for reading cookies (access/refresh tokens)
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/users.route.js";
import projectsRoutes from "./routes/projects.route.js";

dotenv.config();

const app = express();
connectDB();

const PORT = process.env.PORT || 3000;

// ✅ CORS Configuration (Make sure the origin is correct for frontend)
const corsOptions = {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // ✅ Important for auth

// 🛣️ Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectsRoutes);

// ❗ Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Internal Server Error:", err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

// 🚀 Start Server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
