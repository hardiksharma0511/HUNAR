import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { body } from "express-validator";
import { register, login, getMe } from "../controllers/authController";
import { protect } from "../middleware/auth";
import { validate } from "../middleware/validate";

const router = Router();

router.post(
  "/register",
  [
    body("name").trim().notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("A valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  validate,
  asyncHandler(register)
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").notEmpty()],
  validate,
  asyncHandler(login)
);

router.get("/me", protect, asyncHandler(getMe));

export default router;
