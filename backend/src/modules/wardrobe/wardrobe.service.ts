import { IWardrobeItem, WardrobeItem } from "./wardrobe.model";
import { CreateWardrobeItemInput } from "./wardrobe.types";

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