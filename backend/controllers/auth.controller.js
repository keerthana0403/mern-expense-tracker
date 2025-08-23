import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import Expense from "../models/expense.model.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ error: "missing required fields" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ error: "password length must be atleast 6" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: "user already exist" });
    }

    // HASH Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const proPic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profilePic: proPic,
    });

    if (newUser) {
      await newUser.save();
      // generate JWT Token
      generateTokenAndSetCookie(newUser._id, res);

      return res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { token: accessToken } = req.body;

    if (!accessToken) {
      return res.status(400).json({ error: "Access token missing" });
    }

    const googleRes = await fetch(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const data = await googleRes.json();

    const { email, given_name: firstName, family_name: lastName } = data;

    if (!email) {
      return res.status(400).json({ error: "Invalid Google token" });
    }

    let user = await User.findOne({ email });

    if (user) {
      if (user.provider === "local") {
        return res.status(400).json({
          error:
            "Email already registered using password. Please use email login.",
        });
      }

      generateTokenAndSetCookie(user._id, res);
      return res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        profilePic: user.profilePic,
        createdAt: user.createdAt,
      });
    }

    const proPic = `https://avatar.iran.liara.run/username?username=${firstName}+${lastName}`;

    user = await User.create({
      firstName,
      lastName,
      email,
      profilePic: proPic,
      provider: "google",
    });

    generateTokenAndSetCookie(user._id, res);
    return res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Error in googleLogin controller", error.message);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "missing required fields" });
    }

    const user = await User.findOne({ email });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );

    if (!user || !isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      profilePic: user.profilePic,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const guestLogin = async (req, res) => {
  try {
    const proPic = "https://avatar.iran.liara.run/username?username=Guest+User";

    const newUser = new User({
      firstName: "Guest",
      lastName: "User",
      email: `guest_${Date.now()}@example.com`,
      password: `guest_${Date.now()}`,
      profilePic: proPic,
      isGuest: true,
    });

    if (newUser) {
      await newUser.save();
      // generate JWT Token
      generateTokenAndSetCookie(newUser._id, res, true);

      return res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        createdAt: newUser.createdAt,
        isGuest: newUser.isGuest,
      });
    } else {
      res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup controller", error.message);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    return res.status(500).json({ error: "Internal Server error" });
  }
};

export const guestLogout = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return res.status(400).json({ message: "No userId found in request" });
    }

    const user = await User.findById(userId);

    if (user && user.isGuest) {
      await Expense.deleteMany({ userId });
      await User.deleteOne({ _id: userId });

      res.clearCookie("jwt");
      return res.json({ message: "Guest account deleted" });
    }

    return res.status(400).json({ message: "User not found or not a guest" });
  } catch (error) {
    console.error("Error in guestLogout:", error);
    return res.status(500).json({ message: "Guest logout failed" });
  }
};
