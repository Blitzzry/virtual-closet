import { Component, OnInit} from '@angular/core';
import { UploadZone } from '../../molecules/upload-zone/upload-zone';
import { StepperIndicator } from '../../atoms/stepper-indicator/stepper-indicator';
import { ClothingItem } from '../../../../core/models/interface';
import { ColorDot } from '../../atoms/color-dot/color-dot';
import { Badge } from '../../atoms/badge/badge';
import { SuggestedTags } from '../../atoms/suggested-tags/suggested-tags';
import { FormsModule } from '@angular/forms';
import { Icon } from '../../atoms/icon/icons';
import { ClothingService } from '../../../../core/services/virtual-closet-service';

@Component({
  selector: 'app-upload-garment',
  imports: [UploadZone, StepperIndicator, Badge, ColorDot, SuggestedTags, Icon, FormsModule],
  templateUrl: './upload-garment.html',
  styleUrl: './upload-garment.css',
})
export class UploadGarment {
  constructor(public clothingService: ClothingService) {}
  aiPhoto: string = '';
  editing: boolean = false;
  editedAiAnswer: ClothingItem = {} as ClothingItem

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.style.width = input.value.length + 3 + 'ch';
  }

  toggleEdit() {

    this.editing = !this.editing
    console.log(this.editedAiAnswer.notes)
  }

  getImage(image: string) {
    this.aiPhoto = `data:image/png;base64,${image}`;
  }
}
