import { Router } from "express";

import {
  authRoutes,
  userRoutes,
} from "../modules/auth";

import {
  wardrobeRoutes,
  uploadRoutes,
} from "../modules/wardrobe";

const router = Router();

router.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Online Wardrobe API",
  });
});

router.use("/api/auth", authRoutes);

router.use("/api/users", userRoutes);

router.use("/api/wardrobe", wardrobeRoutes);
router.use(
  "/api/wardrobe/upload",
  uploadRoutes
);

router.use(
  "/api/wardrobe",
  wardrobeRoutes
);

export default router;