import { Router } from "express";
import protectedRoute from "../middleware/protectedRoute.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = Router();

router.get("/", protectedRoute, getUsersForSidebar);

export default router;
