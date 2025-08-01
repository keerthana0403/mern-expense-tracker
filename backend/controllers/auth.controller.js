import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

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

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      // generate JWT Token
      generateTokenAndSetCookie(newUser._id, res);
      await newUser.save();

      return res.status(201).json({
        _id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
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

    const {
      email,
      given_name: firstName,
      family_name: lastName,
      picture: profilePicture,
    } = data;

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
        createdAt: user.createdAt,
      });
    }

    user = await User.create({
      firstName,
      lastName,
      email,
      profilePicture,
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
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
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
