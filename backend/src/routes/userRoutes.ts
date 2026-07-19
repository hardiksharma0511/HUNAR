import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  updateProfile,
  getArtisans,
  getArtisanById,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../controllers/userController";
import { protect } from "../middleware/auth";

const router = Router();

router.get("/artisans", asyncHandler(getArtisans));
router.get("/artisans/:id", asyncHandler(getArtisanById));
router.put("/profile", protect, asyncHandler(updateProfile));

router.get("/wishlist", protect, asyncHandler(getWishlist));
router.post("/wishlist/:productId", protect, asyncHandler(addToWishlist));
router.delete("/wishlist/:productId", protect, asyncHandler(removeFromWishlist));

export default router;