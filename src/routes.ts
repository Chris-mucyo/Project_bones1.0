import { Router } from "express";
import authRoutes from '../src/modules/Auth/auth.routes.js'
import shopRoutes from '../src/modules/shops/shop.routes.js'
import productRoutes from "./modules/products/product.routes.js";
import chatRoutes from '../src/modules/chat/chat.routes.js'
import { requireRole } from "./middlewares/role.middleware.js";
import { requireCategorySubscription } from "./middlewares/categorySubscription.middleware.js";
import { enforceProductLimit } from "./middlewares/productLimit.middleware.js";

const router = Router();

router.use('/auth', authRoutes);
router.use('/shops', shopRoutes);
router.use('/products', enforceProductLimit, requireRole("seller"), requireCategorySubscription, productRoutes);
router.use('/chats', chatRoutes);
authRoutes.get('/health', (req, res) => {
    res.json({ status: 'OK' })
})

export default router;