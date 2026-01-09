import express from "express";
import * as AuthController from "../controllers/authController.js";

const router = express.Router();
router.post("/otp", AuthController.sendOtpController);
router.post("/verify-otp", AuthController.verifyOtpController);

export default router;
