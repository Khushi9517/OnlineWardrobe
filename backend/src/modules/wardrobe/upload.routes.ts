import { Router } from "express";

import { protect } from "../../middleware/protect";
import { upload } from "../../middleware/upload";

import { uploadImage } from "./upload.controller";

const router = Router();

router.post(
  "/",
  protect,
  upload.single("image"),
  uploadImage
);

export default router;