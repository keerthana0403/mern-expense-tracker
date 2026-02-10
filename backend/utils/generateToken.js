import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = async (userId, res, isGuest = false) => {
  const token = jwt.sign({ userId, isGuest }, process.env.JWT_TOKEN, {
    expiresIn: isGuest ? "1d" : "15d",
  });

  res.cookie("jwt", token, {
    maxAge: isGuest ? 24 * 60 * 60 * 1000 : 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
};

export default generateTokenAndSetCookie;
