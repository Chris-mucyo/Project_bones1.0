import type { Request, Response } from "express";
import Shop from "./shop.model.js";

export const createShop = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;

    const shop = await Shop.create({
      ...req.body,
      owner: user.id,
    });

    res.status(201).json(shop);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllShops = async (_: Request, res: Response) => {
  const shops = await Shop.find({ isActive: true }).populate(
    "owner",
    "name phone"
  );
  res.json(shops);
};

export const getMyShop = async (req: Request, res: Response) => {
  const user = (req as any).user;

  const shop = await Shop.findOne({ owner: user.id });
  if (!shop) return res.status(404).json({ message: "Shop not found" });

  res.json(shop);
};
