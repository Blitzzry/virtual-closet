import { Component } from '@angular/core';
import { ClothingCard } from '../../../shared/components/molecules/clothing-card/clothing-card';
import { CategoriesFilter } from '../../../shared/components/molecules/categories-filter/categories-filter';
import { mockClothing } from '../../../core/mock/mock-data';
import { ColorDot } from '../../../shared/components/atoms/color-dot/color-dot';
import { AddGarmentBtn } from '../../../shared/components/atoms/add-garment-btn/add-garment-btn';
import { StepperIndicator } from '../../../shared/components/atoms/stepper-indicator/stepper-indicator';

@Component({
  selector: 'app-page',
  imports: [ClothingCard, CategoriesFilter, ColorDot, AddGarmentBtn, StepperIndicator],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  items = mockClothing
  
}
