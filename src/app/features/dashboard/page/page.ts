import { Component } from '@angular/core';
import { ClothingCard } from '../../../shared/components/molecules/clothing-card/clothing-card';
import { CategoriesFilter } from '../../../shared/components/molecules/categories-filter/categories-filter';
import { mockClothing } from '../../../core/mock/mock-data';
import { ColorDot } from '../../../shared/components/atoms/color-dot/color-dot';

@Component({
  selector: 'app-page',
  imports: [ClothingCard, CategoriesFilter, ColorDot],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  items = mockClothing
  
}
