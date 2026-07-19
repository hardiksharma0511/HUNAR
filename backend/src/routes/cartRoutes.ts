import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart } from "../controllers/cartController";
import { protect } from "../middleware/auth";

const router = Router();

router.use(protect);
router.get("/", asyncHandler(getCart));
router.post("/", asyncHandler(addToCart));
router.put("/:productId", asyncHandler(updateCartItem));
router.delete("/:productId", asyncHandler(removeFromCart));
router.delete("/", asyncHandler(clearCart));

export default router;
