import { Router } from "express";
import { authGuard } from "../../middlewares/auth.middleware.js";
import {
  startConversation,
  fetchMessages
} from "./chat.controller.js";

const router = Router();

router.post("/conversation", authGuard, startConversation);
router.get("/messages/:conversationId", authGuard, fetchMessages);

export default router;
