import type { RequestHandler } from "express";
import { generateOTP } from "../utils/generateOtp.js";
import Otp from "../models/otpModel.js";
import dotenv from "dotenv";
dotenv.config();
import { transporter } from "../utils/transport.js";


export const sendOtpController: RequestHandler = async (req, res) => {
  try {

    if (!req.body) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    
    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.deleteMany({ email });

    await Otp.create({ email, otp, expiresAt });

    await transporter.sendMail({
      from: `"Url Shortener Service" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `${otp} is your otp for Url Shortener Service Login`,
      html: `
      <div style="max-width: 600px; margin: auto; padding: 24px 48px; font-family: 'Poppins', sans-serif; background-color: #ffffff; border-radius: 12px; box-shadow: 0 0 10px rgba(0,0,0,0.05); text-align: center;">
        <h1 style="color: #000000; font-size: 32px; margin-bottom: 8px; font-weight: 300; margin-bottom: 30px;">URL Shortener Service</h1>
        <h2 style="color: #222222; font-size: 18px; margin-bottom: 16px;">Verify your URL Shortener Service sign-up</h2>
        <p style="font-size: 14px; color: #555555; margin-bottom: 32px;">
          We received a request to log in to your URL Shortener Service account. Use the OTP below to verify your identity and complete the login.
        </p>
        <div style="background-color: #5A7ACD; color: #000000; font-size: 24px; font-weight: bold; padding: 16px; border-radius: 8px;       margin-bottom: 24px; width: 100%; text-align: center; box-sizing: border-box;">
          ${otp}
        </div>
        <p style="font-size: 12px; color: #777777; margin-bottom: 32px;">
          This code will expire in 10 minutes. Please do not share this code with anyone for security reasons.
        </p>
        <p style="font-size: 12px; color: #777777;">
          If you did not request this code, please ignore this email or contact our support team.
        </p>
        <hr style="margin: 32px 0; border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999999;">
          © 2025 URL Shorten Service. All rights reserved.
        </p>
      </div>
    `,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const verifyOtpController: RequestHandler = async (req, res) => {
  try {
    if(!req.body) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }
    const record = await Otp.findOne({ email, otp });
    if (!record) {
      return res.status(400).json({ message: "Invalid OTP", success: false });
    }
    if (record.expiresAt < new Date()) {
      await Otp.deleteMany({ email });
      return res.status(400).json({ message: "OTP has expired", success: false });
    }
    res.status(200).json({ message: "OTP verified successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
}
