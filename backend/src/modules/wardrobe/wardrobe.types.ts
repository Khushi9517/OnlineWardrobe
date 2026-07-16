export interface CreateWardrobeItemInput {
  name: string;
  category: string;
  color: string;
  brand?: string;

  imageUrl?: string;
  imagePublicId?: string;
}