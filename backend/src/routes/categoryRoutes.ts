import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getCategories, getCategoryBySlug } from "../controllers/categoryController";

const router = Router();

router.get("/", asyncHandler(getCategories));
router.get("/:slug", asyncHandler(getCategoryBySlug));

export default router;
