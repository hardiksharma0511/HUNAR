import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { uploadImages } from "../controllers/uploadController";
import { protect, requireRole } from "../middleware/auth";
import { upload } from "../middleware/upload";

const router = Router();

router.post("/", protect, requireRole("seller"), upload.array("images", 5), asyncHandler(uploadImages));

export default router;
