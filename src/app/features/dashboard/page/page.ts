import { Component, effect } from '@angular/core';
import { ClothingCard } from '../../../shared/components/molecules/clothing-card/clothing-card';
import { CategoriesFilter } from '../../../shared/components/molecules/categories-filter/categories-filter';
import { mockClothing } from '../../../core/mock/mock-data';
import { ColorDot } from '../../../shared/components/atoms/color-dot/color-dot';
import { StepperIndicator } from '../../../shared/components/atoms/stepper-indicator/stepper-indicator';
import { UploadGarment } from '../../../shared/components/organism/upload-garment/upload-garment';
import { Icon } from '../../../shared/components/atoms/icon/icons';
import { ClothingService } from '../../../core/services/virtual-closet-service';
import { ClothingItem } from '../../../core/models/interface';


@Component({
  selector: 'app-page',
  imports: [ClothingCard, CategoriesFilter, ColorDot, StepperIndicator, UploadGarment, Icon],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  constructor(public clothingService: ClothingService) { 
    effect(() => {
    this.garment = this.clothingService.savedGarment();
   });
  }
  garment: ClothingItem[] = []
  item: ClothingItem[] = mockClothing
  isGarmentModalOpen: boolean = false

openModal() {
  this.isGarmentModalOpen = true;
  this.clothingService.stateUploader.set('idle')
}
closeModal() {
  this.isGarmentModalOpen = false;
}
}
