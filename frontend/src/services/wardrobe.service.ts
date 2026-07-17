import api from "../lib/axios";

import { WardrobeItem } from "../types/wardrobe.types";

export const getWardrobeItems = async (
  token: string
): Promise<WardrobeItem[]> => {
  const response = await api.get(
    "/api/wardrobe",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.items;
};

export const createWardrobeItem = async (
  token: string,
  data: {
    name: string;
    category: string;
    color: string;
    brand: string;
    imageUrl?: string;
    imagePublicId?: string;
  }
) => {
  const response = await api.post(
    "/api/wardrobe",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.item;
};

export const uploadImage = async (
  token: string,
  file: File
) => {
  const formData = new FormData();

  formData.append("image", file);

  const response = await api.post(
    "/api/wardrobe/upload",
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};