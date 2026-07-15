import { IWardrobeItem, WardrobeItem } from "./wardrobe.model";
import { CreateWardrobeItemInput } from "./wardrobe.types";
import { AppError } from "../../utils/appError";

export const createWardrobeItem = async (
  userId: string,
  itemData: CreateWardrobeItemInput
): Promise<IWardrobeItem> => {
  const item = await WardrobeItem.create({
    user: userId,

    ...itemData,
  });

  return item;
};

export const getWardrobeItems = async (
  userId: string
) => {
  return await WardrobeItem.find({
    user: userId,
  }).sort({
    createdAt: -1,
  });
};

export const getWardrobeItemById = async (
  userId: string,
  itemId: string
) => {
  const item = await WardrobeItem.findById(itemId);

  if (!item) {
    throw new AppError("Wardrobe item not found", 404);
  }

  if (String(item.user) !== userId) {
    throw new AppError("Not authorized", 403);
  }

  return item;
};

export const updateWardrobeItem = async (
  userId: string,
  itemId: string,
  updateData: Partial<CreateWardrobeItemInput>
) => {
  const item = await WardrobeItem.findById(itemId);

  if (!item) {
    throw new AppError("Wardrobe item not found", 404);
  }

  if (String(item.user) !== userId) {
    throw new AppError("Not authorized", 403);
  }

  Object.assign(item, updateData);

  await item.save();

  return item;
};

export const deleteWardrobeItem = async (
  userId: string,
  itemId: string
) => {
  const item = await WardrobeItem.findById(itemId);

  if (!item) {
    throw new AppError("Wardrobe item not found", 404);
  }

  if (String(item.user) !== userId) {
    throw new AppError("Not authorized", 403);
  }

  await item.deleteOne();
};