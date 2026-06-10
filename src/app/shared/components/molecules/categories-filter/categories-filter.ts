import { Component, Input } from '@angular/core';
import { mockClothing } from '../../../../core/mock/mock-data';
import { Icon } from '../../atoms/icon/icons';

@Component({
  selector: 'app-categories-filter',
  imports: [Icon],
  templateUrl: './categories-filter.html',
  styleUrl: './categories-filter.css',
})
export class CategoriesFilter {
  @Input() iconCategoryName: 'tops' | 'bottoms' | 'shoes' | 'accessories' | 'dresses' | 'outerwear' = 'tops';
  @Input() categoryCounter: number = 0;
  items = mockClothing;
}
