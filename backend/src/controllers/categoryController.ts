import { Request, Response } from "express";
import Category from "../models/Category";

// @route GET /api/categories
export const getCategories = async (req: Request, res: Response) => {
  const categories = await Category.find().sort({ name: 1 });
  res.json({ success: true, categories });
};

// @route GET /api/categories/:slug
export const getCategoryBySlug = async (req: Request, res: Response) => {
  const category = await Category.findOne({ slug: req.params.slug });
  if (!category) return res.status(404).json({ success: false, message: "Category not found" });
  res.json({ success: true, category });
};
