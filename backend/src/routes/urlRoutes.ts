import express from "express";
import * as UrlController from "../controllers/urlController.js";
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.post("/shorten",verifyToken, UrlController.shortenUrlController);
router.get("/user-urls",verifyToken, UrlController.getUserUrlsController);
router.get("/:shortCode", UrlController.redirectUrlController);
router.delete("/:shortCode",verifyToken, UrlController.deleteUrlController);

export default router;