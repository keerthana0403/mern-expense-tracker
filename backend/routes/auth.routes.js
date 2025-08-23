import express from "express";
import {
  signup,
  login,
  logout,
  googleLogin,
  guestLogin,
  guestLogout,
} from "../controllers/auth.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.post("/google-login", googleLogin);

router.post("/guest-login", guestLogin);

router.post("/guest-logout", protectRoute, guestLogout);

export default router;
