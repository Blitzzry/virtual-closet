export type ClothingCategory = 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';

export type StylesList = "Casual" | "Old Money" | "Streetwear" | "Formal" | "Coquette" | "Y2K" | "Minimalista" | "Gótico" | "Deportivo" | "Boho" | "Preppy" | "Grunge" | "Elegante" | "Vintage" | "Business Casual";

export interface ClothingItem {
  id: string;
  name: string;
  category: ClothingCategory;
  colors: string[];
  tags: string[];
  brand: string;
  material: string;
  notes: string;
  isFavorite: boolean;
  imageUrl: string;
  isDirty: boolean;
}

export interface AiAnswer {
  "isGarment": boolean,
  "item": ClothingItem | null,
  "reason": string | null,
}

export interface OutfitMakerInterface {
  "success": boolean,
  "outfitItemIds": string[] | null,
  "reason": string | null,
  "error": string | null,
}

export interface GarmentRow {
  id: string;
  name: string;
  category: ClothingCategory;
  colors: string[];
  tags: string[];
  brand: string;
  material: string;
  notes: string;
  is_favorite: boolean;
  imageUrl: string;
  created_at: string;
  is_dirty: boolean;
}