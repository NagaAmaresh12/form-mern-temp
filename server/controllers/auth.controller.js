import { User } from "../models/users.model.js";

export const signUpUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  console.log("SignUp request body:", req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const user = new User({ firstName, lastName, email });
    user.password = await user.hashPassword(password);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    if (email === "nagaamareshkanne@gmail.com") {
      user.role = "admin";
    }

    await user.save();

    res
      .status(201)
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        message: "User SignUp successfull",
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          avatarSeed: user.avatar,
        },
      });
  } catch (error) {
    console.error("SignUp error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    if (email === "nagaamareshkanne@gmail.com") {
      user.role = "admin";
    }
    await user.save();

    res
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 15 * 60 * 1000, // 15min
      })
      .json({
        message: "SigIn successful",
        success: true,
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          avatarSeed: user.avatar,
        },
      });
  } catch (error) {
    console.error("SignIn error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    user.refreshToken = null;
    await user.save();
    res
      .clearCookie("refreshToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .clearCookie("accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const refreshToken = async (req, res) => {
  try {
    const user = req.user;
    console.log("user in cookie", user);

    if (!user) {
      return res.status(403).json({ success: false, message: "Invalid token" });
    }

    const newAccessToken = await user.generateAccessToken();
    const newRefreshToken = await user.generateRefreshToken();
    user.refreshToken = newRefreshToken;

    await user.save();

    res
      .cookie("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 1 * 60 * 60 * 1000, // 7 days
      })
      .json({
        success: true,
        message: "Token refreshed successfully",
      });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const protectedRoute = async (req, res) => {
  try {
    res.status(200).json({ message: "Protected data accessed successfully!" });
  } catch (error) {
    console.error("Protected route error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const Profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select(
      "-password -refreshToken -emailVerified -emailVerificationToken"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("user profile", user);

    res.status(200).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        avatarSeed: user.avatar,
      },
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
export const avatarSeed = async (req, res) => {
  try {
    const { avatar } = req.body;
    const { avatarSeed } = avatar;
    console.log(avatarSeed);

    console.log("avatarseed", avatarSeed);

    const userId = req.user.id;

    if (!avatarSeed) {
      return res.status(400).json({
        message: "Invalid avatar seed",
        success: false,
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    user.avatar = avatarSeed; // assuming schema has avatarSeed field
    await user.save();

    return res.status(200).json({
      message: "Avatar updated successfully",
      avatarSeed: user.avatar,
      success: true,
    });
  } catch (error) {
    console.error("Error updating avatar:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
