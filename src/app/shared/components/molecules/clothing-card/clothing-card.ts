import { Component, EventEmitter, Input, Output } from '@angular/core';
import { mockClothing } from '../../../../core/mock/mock-data';
import { FavoriteButton } from '../../atoms/favorite-button/favorite-button';
import { ColorDot } from '../../atoms/color-dot/color-dot';
import { Badge } from '../../atoms/badge/badge';
import { SuggestedTags } from '../../atoms/suggested-tags/suggested-tags';

@Component({
  selector: 'app-clothing-card',
  imports: [Badge, ColorDot, FavoriteButton, SuggestedTags],
  templateUrl: './clothing-card.html',
  styleUrl: './clothing-card.css',
})
export class ClothingCard {
  @Input() colors: string[] = []
  @Input() name: string = ''
  @Input() category: string = ''
  @Input() imageUrl: string = ''
  @Input() style: string = ''
  @Input() tags: string[] = []
  @Output() selectClot = new EventEmitter<void>()
  selClot() {
    this.selectClot.emit();
  }
}
