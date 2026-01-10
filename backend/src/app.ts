import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import urlRoutes from "./routes/urlRoutes.js";

const app = express();

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.use("/api/url", urlRoutes)

app.get("/", (req, res) => {
  res.send({"message": "URL Shortener Service is running"});
});

export default app;