import { Router } from "express";

import { protect } from "../../middleware/protect";

import {
  createItem,
  getItems,
} from "./wardrobe.controller";

const router = Router();

router.post("/", protect, createItem);

router.get("/", protect, getItems);

export default router;