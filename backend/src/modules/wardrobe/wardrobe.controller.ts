import { Request, Response } from "express";

import { createWardrobeItem } from "./wardrobe.service";
import { getWardrobeItems } from "./wardrobe.service";

export const createItem = async (
  req: Request,
  res: Response
) => {
  const item = await createWardrobeItem(
    String(req.user?._id),
    req.body
  );

  res.status(201).json({
    success: true,
    item,
  });
};

export const getItems = async (
  req: Request,
  res: Response
) => {
  const items = await getWardrobeItems(
    String(req.user?._id)
  );

  res.status(200).json({
    success: true,
    count: items.length,
    items,
  });
};