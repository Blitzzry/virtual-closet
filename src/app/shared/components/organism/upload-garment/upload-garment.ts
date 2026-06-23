import { Component } from '@angular/core';
import { UploadZone } from '../../molecules/upload-zone/upload-zone';
import { StepperIndicator } from '../../atoms/stepper-indicator/stepper-indicator';
import { ClothingItem } from '../../../../core/services/interface';

@Component({
  selector: 'app-upload-garment',
  imports: [UploadZone, StepperIndicator],
  templateUrl: './upload-garment.html',
  styleUrl: './upload-garment.css',
})
export class UploadGarment {
  constructor() { }
  state: 'idle' | 'result' | 'added' = 'idle';
  aiAnswer?: ClothingItem
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
