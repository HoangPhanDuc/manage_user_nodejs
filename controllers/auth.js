import {
  auth,
  validate,
  reg,
  saveRefreshToken,
  refreshTokenService,
} from "../service/auth.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const secretKey = process.env.SECRET_KEY;
const refreshKey = process.env.REFRESH_KEY;

export const authController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const [admin] = await auth(email);
    if (!admin) {
      return res.status(401).json({ message: "Invalid your account!" });
    }
    const checkUser = bcrypt.compareSync(password, admin.password);
    if (!checkUser) {
      return res.status(401).json({ message: "Invalid your password!" });
    }
    const accessToken = jwt.sign({ id: admin.id, email: email }, secretKey, {
      expiresIn: "10s",
    });
    const refreshToken = jwt.sign({ id: admin.id, email: email }, refreshKey, {
      expiresIn: "7d",
    });
    await saveRefreshToken(refreshToken, admin.id);
    return res.status(200).json({
      message: "Login successful!",
      admin: { ...admin, accessToken, refreshToken },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error occurred", error });
  }
};

export const regController = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Invalid email or password?" });
    }
    const validateEmail = await validate(email);
    if (validateEmail) {
      return res.status(409).json({ message: "Email has been registered!" });
    }
    const hashPassword = bcrypt.hashSync(password, 10);
    await reg(email, hashPassword);
    return res.status(201).json({ message: "successful!" });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log(error);
  }
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token is required!" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY);
    const admin = await refreshTokenService(decoded.id, decoded.refreshToken);
    if (!admin) {
      return res.status(403).json({ message: "Invalid refresh token!" });
    }
    const newAccessToken = jwt.sign(
      { id: decoded.id, email: decoded.email },
      process.env.SECRET_KEY,
      { expiresIn: "10m" }
    );
    return res.status(200).json({ accessToken: newAccessToken });
  } catch (error) {
    console.log(error);
    return res.status(403).json({ message: "Invalid refresh token!" });
  }
};
