import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/authenticatedRequest.js";

export const verifyToken: RequestHandler = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    (req as AuthenticatedRequest).user = decoded as { email: string };
    next();
  } catch (error) {
    
  }
}