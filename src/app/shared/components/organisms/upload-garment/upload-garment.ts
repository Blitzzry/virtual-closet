import { Component, EventEmitter, Output, signal } from '@angular/core';
import { UploadZone } from '../../molecules/upload-zone/upload-zone';
import { StepperIndicator } from '../../atoms/stepper-indicator/stepper-indicator';
import { ClothingItem, ClothingCategory } from '../../../../core/models/interface';
import { ColorDot } from '../../atoms/color-dot/color-dot';
import { Badge } from '../../atoms/badge/badge';
import { SuggestedTags } from '../../atoms/suggested-tags/suggested-tags';
import { FormsModule } from '@angular/forms';
import { Icon } from '../../atoms/icon/icons';
import { ClothingService } from '../../../../core/services/clothing-service';

@Component({
  selector: 'app-upload-garment',
  imports: [UploadZone, StepperIndicator, Badge, ColorDot, SuggestedTags, Icon, FormsModule],
  templateUrl: './upload-garment.html',
  styleUrl: './upload-garment.css',
})
export class UploadGarment {
  constructor(public clothingService: ClothingService) { }
  aiPhoto: string = '';
  editing: boolean = false;
  categoryTypes: ClothingCategory[] = ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories']
  @Output() close = new EventEmitter<void>();
  stateUploader = signal<'idle' | 'result' | 'added'>('idle');

  closeModal() {
    this.close.emit();
  }

  async onFileSelected(photo: any) {
    await this.clothingService.onFileSelected(photo)
    try {
      const response = await this.clothingService.aiAnswer()
      if (response) {
        this.stateUploader.set('result')
      }
    } catch (error) {
      console.log('erroor')
    }
  }
  saveGarment(event: ClothingItem) {
    this.clothingService.saveGarment(event)
    console.log(event)
    this.stateUploader.set('added')
  }


  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.style.width = input.value.length + 3 + 'ch';
  }

  toggleEdit() {
    this.editing = !this.editing
  }
  
  anotherOne() {
    this.stateUploader.set('idle')
  }
}
