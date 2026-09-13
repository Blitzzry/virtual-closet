import { Component, EventEmitter, Input, Output, Signal, signal } from '@angular/core';
import { mockClothing } from '../../../../core/mock/mock-data';
import { Icon } from '../../atoms/icon/icons';
import { ClothingService } from '../../../../core/services/clothing-service';
import { ClothingCategory } from '../../../../core/models/interface';

@Component({
  selector: 'app-categories-filter',
  imports: [Icon],
  templateUrl: './categories-filter.html',
  styleUrl: './categories-filter.css',
})
export class CategoriesFilter {
  constructor(public clothingService: ClothingService) {
    this.categories = Object.entries(clothingService.categoryCount()) as [ClothingCategory, number][]
  }
  @Input() iconCategoryName: 'tops' | 'bottoms' | 'shoes' | 'accessories' | 'dresses' | 'outerwear' = 'tops';
  @Input() categoryCounter: number = 0;
  categories: [ClothingCategory, number][] = []
  debugger(){
    console.log(this.clothingService.selectedCategories())
  }
}
