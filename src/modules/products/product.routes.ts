import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "./product.controller.js";

import { authGuard } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = Router();

// Public
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Seller-only
router.post("/", authGuard, requireRole("seller"), createProduct);
router.put("/:id", authGuard, requireRole("seller"), updateProduct);
router.delete("/:id", authGuard, requireRole("seller"), deleteProduct);

export default router;
