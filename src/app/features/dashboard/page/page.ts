import { Component } from '@angular/core';
import { ClothingCard } from '../../../shared/components/molecules/clothing-card/clothing-card';

@Component({
  selector: 'app-page',
  imports: [ClothingCard],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {}
