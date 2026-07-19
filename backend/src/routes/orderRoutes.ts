import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import {
  createOrder,
  getMyOrders,
  getSellerOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController";
import { protect, requireRole } from "../middleware/auth";

const router = Router();

router.use(protect);
router.post("/", asyncHandler(createOrder));
router.get("/mine", asyncHandler(getMyOrders));
router.get("/seller", requireRole("seller"), asyncHandler(getSellerOrders));
router.get("/:id", asyncHandler(getOrderById));
router.put("/:id/status", requireRole("seller"), asyncHandler(updateOrderStatus));
router.put("/:id/cancel", asyncHandler(cancelOrder));

export default router;