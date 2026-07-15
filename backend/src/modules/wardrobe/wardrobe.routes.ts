import { Router } from "express";

import { protect } from "../../middleware/protect";

import {
  createItem,
  getItems,
  getItemById,
  updateItem,
  deleteItem,
} from "./wardrobe.controller";

const router = Router();

router.post("/", protect, createItem);

router.get("/", protect, getItems);

router.get("/:id", protect, getItemById);

router.put("/:id", protect, updateItem);

router.delete("/:id", protect, deleteItem);

export default router;