import { Component } from '@angular/core';
import { UploadZone } from '../../molecules/upload-zone/upload-zone';
import { StepperIndicator } from '../../atoms/stepper-indicator/stepper-indicator';
import { ClothingItem } from '../../../../core/services/interface';
import { ColorDot } from '../../atoms/color-dot/color-dot';
import { Badge } from '../../atoms/badge/badge';
import { SuggestedTags } from '../../atoms/suggested-tags/suggested-tags';

@Component({
  selector: 'app-upload-garment',
  imports: [UploadZone, StepperIndicator, Badge, ColorDot, SuggestedTags],
  templateUrl: './upload-garment.html',
  styleUrl: './upload-garment.css',
})
export class UploadGarment {
  constructor() { }
  state: 'idle' | 'result' | 'added' = 'idle';
  aiAnswer: ClothingItem = {} as ClothingItem
  aiPhoto: string = '';
  
  getImage(image: string) {
    this.aiPhoto = `data:image/png;base64,${image}`;
  }

  changeStatus(newStatus: 'idle' | 'result' | 'added') {
    this.state = newStatus;
  }
  getText(text: ClothingItem) {
    this.aiAnswer = text;
    if (this.aiAnswer) {
      this.state = 'result';
    }
  }
}
