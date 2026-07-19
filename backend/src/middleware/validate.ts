import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

// Runs after express-validator's chain(s) and turns any accumulated errors
// into a single 400 response instead of letting the request continue.
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};
