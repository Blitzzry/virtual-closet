export type ClothingCategory = 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'shoes' | 'accessories';

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