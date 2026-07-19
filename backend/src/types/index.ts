import { Request } from "express";
import { Types } from "mongoose";

// Extends Express's Request with the authenticated user set by the auth middleware
export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "buyer" | "seller";
  };
}

export interface JwtPayload {
  id: string;
  role: "buyer" | "seller";
}

export type ObjectIdLike = Types.ObjectId | string;