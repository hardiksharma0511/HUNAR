import { Response } from "express";
import Order from "../models/Order";
import Cart from "../models/Cart";
import Product from "../models/Product";
import { AuthRequest } from "../types";

// @route POST /api/orders  (buyer checkout)
export const createOrder = async (req: AuthRequest, res: Response) => {
  const { shippingAddress, paymentMethod } = req.body;

  const cart = await Cart.findOne({ user: req.user!.id }).populate("items.product");
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ success: false, message: "Your cart is empty" });
  }

  const orderItems = cart.items.map((item: any) => ({
    product: item.product._id,
    name: item.product.name,
    image: item.product.images[0],
    price: item.product.discountPrice || item.product.price,
    quantity: item.quantity,
    seller: item.product.seller,
  }));

  const itemsTotal = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shippingFee = itemsTotal > 999 ? 0 : 79;
  const totalAmount = itemsTotal + shippingFee;

  const order = await Order.create({
    buyer: req.user!.id,
    items: orderItems,
    shippingAddress,
    paymentMethod: paymentMethod || "Cash on Delivery",
    itemsTotal,
    shippingFee,
    totalAmount,
  });

  // Reduce stock for each purchased product
  await Promise.all(
    orderItems.map((item) =>
      Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })
    )
  );

  cart.items = [];
  await cart.save();

  res.status(201).json({ success: true, order });
};

// @route GET /api/orders/mine  (buyer's own order history)
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({ buyer: req.user!.id }).sort({ createdAt: -1 });
  res.json({ success: true, orders });
};

// @route GET /api/orders/seller  (orders containing this seller's products)
export const getSellerOrders = async (req: AuthRequest, res: Response) => {
  const orders = await Order.find({ "items.seller": req.user!.id })
    .populate("buyer", "name email")
    .sort({ createdAt: -1 });
  res.json({ success: true, orders });
};

// @route GET /api/orders/:id
export const getOrderById = async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });

  const isBuyer = order.buyer.toString() === req.user!.id;
  const isSeller = order.items.some((i) => i.seller.toString() === req.user!.id);
  if (!isBuyer && !isSeller) {
    return res.status(403).json({ success: false, message: "Not authorized to view this order" });
  }

  res.json({ success: true, order });
};

// @route PUT /api/orders/:id/status  (seller updates status of their items' order)
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  const { status, trackingId, courierName } = req.body;
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });

  const isSeller = order.items.some((i) => i.seller.toString() === req.user!.id);
  if (!isSeller) {
    return res.status(403).json({ success: false, message: "Not authorized to update this order" });
  }

  if (status) order.status = status;
  if (trackingId !== undefined) order.trackingId = trackingId;
  if (courierName !== undefined) order.courierName = courierName;

  await order.save();
  res.json({ success: true, order });
};

// @route PUT /api/orders/:id/cancel  (buyer cancels their own order, only before it ships)
export const cancelOrder = async (req: AuthRequest, res: Response) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ success: false, message: "Order not found" });

  if (order.buyer.toString() !== req.user!.id) {
    return res.status(403).json({ success: false, message: "You can only cancel your own orders" });
  }

  if (!["placed", "processing"].includes(order.status)) {
    return res
      .status(400)
      .json({ success: false, message: `This order is already ${order.status} and can no longer be cancelled` });
  }

  order.status = "cancelled";
  await order.save();

  // Restore stock for the cancelled items
  await Promise.all(
    order.items.map((item) => Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } }))
  );

  res.json({ success: true, order });
};