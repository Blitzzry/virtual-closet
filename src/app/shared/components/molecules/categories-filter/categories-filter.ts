import { Component, Input, OnChanges, SimpleChanges, computed } from '@angular/core';
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
export class CategoriesFilter implements OnChanges{
  constructor(public clothingService: ClothingService, private auth: AuthService) {
  }
  @Input() iconCategoryName: 'tops' | 'bottoms' | 'shoes' | 'accessories' | 'dresses' | 'outerwear' = 'tops';
  @Input() categoryCounter: Record<ClothingCategory, number> = {} as Record<ClothingCategory, number>;
  categories: [ClothingCategory, number][] = []
  id: string = '030d4fa5-c079-40c0-9406-721616f96890'
  debugger(){
    console.log(this.clothingService.savedGarment())
    console.log(this.auth.currentUser)
  }

  numFavGarmnt = computed (()=> {
    return this.clothingService.savedGarment().filter(el => el.isFavorite).length
  })
  
  ngOnChanges(changes: SimpleChanges): void {
    this.categories = Object.entries(this.categoryCounter) as [ClothingCategory, number][]
  }
}
