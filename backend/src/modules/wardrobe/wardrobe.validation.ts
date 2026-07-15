import { z } from "zod";

export const createWardrobeItemSchema = z.object({
  name: z.string().min(1),

  category: z.string().min(1),

  color: z.string().min(1),

  brand: z.string().optional(),
});