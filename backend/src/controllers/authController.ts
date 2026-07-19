import { Response } from "express";
import User from "../models/User";
import { generateToken } from "../utils/generateToken";
import { AuthRequest } from "../types";

// @route POST /api/auth/register
export const register = async (req: AuthRequest, res: Response) => {
  const { name, email, password, role, sellerProfile } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ success: false, message: "An account with this email already exists" });
  }

  const user = await User.create({
    name,
    email,
    password,
    role: role === "seller" ? "seller" : "buyer",
    sellerProfile: role === "seller" ? sellerProfile : undefined,
  });

  const token = generateToken({ id: user.id, role: user.role });

  res.status(201).json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      sellerProfile: user.sellerProfile,
    },
  });
};

// @route POST /api/auth/login
export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ success: false, message: "Invalid email or password" });
  }

  const token = generateToken({ id: user.id, role: user.role });

  res.json({
    success: true,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      sellerProfile: user.sellerProfile,
    },
  });
};

// @route GET /api/auth/me
export const getMe = async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user!.id);
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }
  res.json({ success: true, user });
};
