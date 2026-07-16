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