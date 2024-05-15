import { Router } from "express";
import { getMessage, sendMessage } from "../controllers/message.controller.js";
import protectedRoute from "../middleware/protectedRoute.js";

const router = Router();

router.get("/:id", protectedRoute, getMessage);
router.post("/send/:id", protectedRoute, sendMessage);

export default router;
