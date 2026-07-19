import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { sendContactMessage } from "../controllers/contactController";

const router = Router();

router.post("/", asyncHandler(sendContactMessage));

export default router;