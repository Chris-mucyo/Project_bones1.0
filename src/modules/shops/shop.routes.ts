import { Router } from "express";
import {
  createShop,
  getAllShops,
  getMyShop,
} from "./shop.controller.js";

import { authGuard } from "../../middlewares/auth.middleware.js";
import { requireRole } from "../../middlewares/role.middleware.js";

const router = Router();

// Public
router.get("/", getAllShops);

// Seller
router.post("/", authGuard, requireRole("seller"), createShop);
router.get("/me", authGuard, requireRole("seller"), getMyShop);

export default router;
