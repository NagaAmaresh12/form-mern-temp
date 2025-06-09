import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "guest",
    },
    refreshToken: {
      type: String,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// 🔐 Password comparison method
userSchema.methods.comparePassword = async function (plainPassword) {
  try {
    const isMatch = await bcrypt.compare(plainPassword, this.password);
    return isMatch;
  } catch (err) {
    throw new Error("Error comparing passwords");
  }
};
userSchema.methods.hashPassword = async function (plainPassword) {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(plainPassword, salt);
};
userSchema.methods.generateAccessToken = function () {
  const accessToken = jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  return accessToken;
};
userSchema.methods.generateRefreshToken = function () {
  const refreshToken =
    this.refreshToken ||
    jwt.sign(
      { id: this._id, email: this.email },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );
  this.refreshToken = refreshToken;
  return refreshToken;
};

userSchema.methods.generateEmailVerificationToken = function () {
  const emailVerificationToken = jwt.sign(
    { id: this._id, email: this.email },
    process.env.EMAIL_VERIFICATION_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
  userSchema.methods.compareEmailVerificationToken = function (token) {
    return jwt.verify(token, this.emailVerificationToken);
  };
  return emailVerificationToken;
};
const User = mongoose.model("User", userSchema);
export { User };
