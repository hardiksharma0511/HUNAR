import { Response } from "express";
import Cart from "../models/Cart";
import { AuthRequest } from "../types";

// @route GET /api/cart
export const getCart = async (req: AuthRequest, res: Response) => {
  let cart = await Cart.findOne({ user: req.user!.id }).populate(
    "items.product",
    "name price discountPrice images stock seller"
  );

  if (!cart) {
    cart = await Cart.create({ user: req.user!.id, items: [] });
  }

  res.json({ success: true, cart });
};

// @route POST /api/cart
export const addToCart = async (req: AuthRequest, res: Response) => {
  const { productId, quantity = 1 } = req.body;

  let cart = await Cart.findOne({ user: req.user!.id });
  if (!cart) {
    cart = await Cart.create({ user: req.user!.id, items: [] });
  }

  const existingItem = cart.items.find((item) => item.product.toString() === productId);
  if (existingItem) {
    existingItem.quantity += Number(quantity);
  } else {
    cart.items.push({ product: productId, quantity: Number(quantity) });
  }

  await cart.save();
  const populated = await cart.populate("items.product", "name price discountPrice images stock seller");
  res.json({ success: true, cart: populated });
};

// @route PUT /api/cart/:productId
export const updateCartItem = async (req: AuthRequest, res: Response) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user!.id });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  const item = cart.items.find((item) => item.product.toString() === req.params.productId);
  if (!item) return res.status(404).json({ success: false, message: "Item not in cart" });

  item.quantity = Number(quantity);
  await cart.save();
  const populated = await cart.populate("items.product", "name price discountPrice images stock seller");
  res.json({ success: true, cart: populated });
};

// @route DELETE /api/cart/:productId
export const removeFromCart = async (req: AuthRequest, res: Response) => {
  const cart = await Cart.findOne({ user: req.user!.id });
  if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

  cart.items = cart.items.filter((item) => item.product.toString() !== req.params.productId);
  await cart.save();
  const populated = await cart.populate("items.product", "name price discountPrice images stock seller");
  res.json({ success: true, cart: populated });
};

// @route DELETE /api/cart
export const clearCart = async (req: AuthRequest, res: Response) => {
  const cart = await Cart.findOne({ user: req.user!.id });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
  res.json({ success: true, message: "Cart cleared" });
};
