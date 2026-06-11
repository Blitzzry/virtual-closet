import { Component } from '@angular/core';
import { mockClothing } from '../../../../core/mock/mock-data';
import { FavoriteButton } from '../../atoms/favorite-button/favorite-button';
import { ColorDot } from '../../atoms/color-dot/color-dot';
import { Badge } from '../../atoms/badge/badge';

@Component({
  selector: 'app-clothing-card',
  imports: [ Badge, ColorDot, FavoriteButton],
  templateUrl: './clothing-card.html',
  styleUrl: './clothing-card.css',
})
export class ClothingCard {
  items: any[] = [];
  ngOnInit() {
    this.items = mockClothing;
  }
}
