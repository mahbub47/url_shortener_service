import express from "express";
import * as AuthController from "../controllers/authController.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();
router.post("/otp", AuthController.sendOtpController);
router.post("/verify-otp", AuthController.verifyOtpController);
router.get("/check-auth",verifyToken, AuthController.checkAuthController);
router.post("/google", AuthController.googleAuthController);
router.post("/logout", AuthController.logoutController);

export default router;
