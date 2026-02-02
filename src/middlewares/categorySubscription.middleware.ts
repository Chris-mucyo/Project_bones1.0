import type { Request, Response, NextFunction } from "express";
import CategorySubscription from "../modules/subscription/categorySubscription.model.js";

export const requireCategorySubscription = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = (req as any).user;
  const { categoryId } = req.body;

  if (user.role !== "seller") {
    return res.status(403).json({ message: "Seller only" });
  }

  const subscription = await CategorySubscription.findOne({
    seller: user.id,
    category: categoryId,
    status: "active",
    expiresAt: { $gt: new Date() },
  });

  if (!subscription) {
    return res.status(402).json({
      message: "You are not subscribed to this category",
    });
  }

  next();
};
