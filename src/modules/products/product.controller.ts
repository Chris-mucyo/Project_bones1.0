import type { Request, Response } from 'express';
import Product from './product.model.js'
import Shop from '../shops/shop.model.js'


export const createProduct = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const { shopId, name, description, price, negotiable, images } = req.body;

    // Check ownership
    const shop = await Shop.findOne({ _id: shopId, owner: user.id });
    if (!shop) return res.status(403).json({ message: "Not your shop" });

    const product = await Product.create({
      shop: shopId,
      name,
      description,
      price,
      negotiable,
      images,
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getAllProducts = async (_: Request, res: Response) => {
  const products = await Product.find({ isActive: true }).populate("shop");
  res.json(products);
};

export const getProductById = async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id).populate("shop");
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const product = await Product.findById(req.params.id).populate("shop");

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Check shop ownership
    if ((product.shop as any).owner.toString() !== user.id)
      return res.status(403).json({ message: "Not authorized" });

    Object.assign(product, req.body);
    await product.save();

    res.json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const product = await Product.findById(req.params.id).populate("shop");

    if (!product) return res.status(404).json({ message: "Product not found" });

    if ((product.shop as any).owner.toString() !== user.id)
      return res.status(403).json({ message: "Not authorized" });

    product.isActive = false;
    await product.save();

    res.json({ message: "Product deleted" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};