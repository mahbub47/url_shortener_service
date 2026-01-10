import { RequestHandler } from "express";
import ShortUrl from "../models/shorturlModel.js";
import User from "../models/userModel.js";
import { AuthenticatedRequest } from "../types/authenticatedRequest.js";

export const shortenUrlController: RequestHandler = async (req, res) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    const email = user?.email;
    
    const { longUrl } = req.body;
    if (!longUrl) {
      return res.status(400).json({ message: "Long URL is required" });
    }

    if(user == null || email == null) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const dbuser = await User.findOne({ email });

    if (!dbuser) {
      return res.status(404).json({ message: "User not found" });
    }

    if(dbuser.totalShortenedUrls >= 100) {
      return res.status(200).json({ message: "URL shortening limit reached. Upgrade your plan to shorten more URLs.", success: false });
    }
    
    ShortUrl.create({
      originalUrl: longUrl,
      createdBy: dbuser._id,
    });

    await User.updateOne({ email }, { $inc: { totalShortenedUrls: 1 } });
    res.status(201).json({ message: "Short URL created successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getUserUrlsController: RequestHandler = async (req, res) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    const email = user?.email;

    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const dbuser = await User.findOne({ email });

    if (!dbuser) {
      return res.status(404).json({ message: "User not found" });
    }

    const shortUrls = await ShortUrl.find({ createdBy: dbuser._id });

    res.status(200).json({ success: true, shortUrls });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const redirectUrlController: RequestHandler = async (req, res) => {
  try {
    const shortCode = req.params.shortCode;
    if (!shortCode) {
      return res.status(400).json({ message: "Short code is required" });
    }
    const record = await ShortUrl.findOne({ shortCode });

    if (!record) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    record.accessCount += 1;
    await record.save();
    res.redirect(record.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteUrlController: RequestHandler = async (req, res) => {
  try {
    const user = (req as AuthenticatedRequest).user;
    const email = user?.email;
    const shortCode = req.params.shortCode;

    if (!email) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const dbuser = await User.findOne({ email });

    if (!dbuser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!shortCode) {
      return res.status(400).json({ message: "Short code is required" });
    }

    const record = await ShortUrl.findOneAndDelete({ shortCode, createdBy: dbuser._id });

    if (!record) {
      return res.status(404).json({ message: "Short URL not found or you don't have permission to delete it" });
    }

    await User.updateOne({ email }, { $inc: { totalShortenedUrls: -1 } });
    res.status(200).json({ message: "Short URL deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error });
  }
};