import { Router } from "express";
import { signup } from "../controller/auth.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = Router();

// Signup route
router.post("/signup", verifyToken, signup);

export default router;
