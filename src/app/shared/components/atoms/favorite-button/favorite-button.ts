import { Component, Input } from '@angular/core';
import { Icon } from '../icon/icons';

@Component({
  selector: 'app-favorite-button',
  imports: [Icon],
  templateUrl: './favorite-button.html',
  styleUrl: './favorite-button.css',
})
export class FavoriteButton {
  constructor() {}
  @Input() isFavorite: boolean = false;
  @Input() size: string = 'xxs';
}
