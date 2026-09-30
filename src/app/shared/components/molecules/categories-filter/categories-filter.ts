import { Component, EventEmitter, Input, Output, Signal, signal } from '@angular/core';
import { mockClothing } from '../../../../core/mock/mock-data';
import { Icon } from '../../atoms/icon/icons';
import { ClothingService } from '../../../../core/services/clothing-service';
import { ClothingCategory } from '../../../../core/models/interface';
import { AuthService } from '../../../../core/services/auht.service';

@Component({
  selector: 'app-categories-filter',
  imports: [Icon],
  templateUrl: './categories-filter.html',
  styleUrl: './categories-filter.css',
})
export class CategoriesFilter {
  constructor(public clothingService: ClothingService, private auth: AuthService) {
    this.categories = Object.entries(clothingService.categoryCount()) as [ClothingCategory, number][]
  }
  @Input() iconCategoryName: 'tops' | 'bottoms' | 'shoes' | 'accessories' | 'dresses' | 'outerwear' = 'tops';
  @Input() categoryCounter: number = 0;
  categories: [ClothingCategory, number][] = []
  debugger(){
    const url = new URL(this.clothingService.savedGarment()[0].imageUrl)
    console.log([url.pathname.split(`${this.auth.currentUser()?.id}/`)[1]])
  }
}
