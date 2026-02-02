import type { Request, Response, NextFunction } from "express";
import Category from "../modules/categories/category.model";
import Product from "../modules/products/product.model";

export const enforceProductLimit = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  const { categoryId } = req.body;

  if (user.role !== "seller") {
    return res.status(403).json({ message: "Seller only" });
  }

  const category = await Category.findById(categoryId);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  const productCount = await Product.countDocuments({
    seller: user.id,
    category: categoryId,
  });

  if (productCount >= category.productLimit) {
    return res.status(403).json({
      message: `Product limit reached for ${category.name}`,
    });
  }

  next();
};