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
}

export interface AiAnswer {
  "isGarmnet": boolean,
  "item": ClothingItem | null,
  "reason": string | null,
}

export interface OutfitMakerInterface {
  "success": boolean,
  "outfitItemIds": string[] | null,
  "reason": string | null,
  "error": string | null,
}