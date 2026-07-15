import { Router } from "express";

import { authRoutes } from "../modules/auth";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Online Wardrobe API",
  });
});

router.use("/api/auth", authRoutes);

export default router;