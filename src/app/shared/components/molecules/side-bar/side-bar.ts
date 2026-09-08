import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { ClothingService } from '../../../../core/services/clothing-service';
import { Icon } from '../../atoms/icon/icons';
import { FormsModule } from '@angular/forms';
import { ClothingItem } from '../../../../core/models/interface';
import { SuggestedTags } from '../../atoms/suggested-tags/suggested-tags';
import { ColorDot } from '../../atoms/color-dot/color-dot';
import { Badge } from '../../atoms/badge/badge';
import { FavoriteButton } from '../../atoms/favorite-button/favorite-button';

@Component({
  selector: 'app-side-bar',
  imports: [Icon,
    FormsModule,
    SuggestedTags,
    ColorDot,
    Badge,
    FavoriteButton,
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar implements OnChanges {
  constructor(public clothingService: ClothingService) { }
  editing: boolean = false
  @Input() idSelectedClot: string | null = null
  clot: ClothingItem = {} as ClothingItem
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  debbugger() {
    console.log(this.clot)
  }

  toggleEdit() {
    this.editing = !this.editing
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.style.width = input.value.length + 3 + 'ch';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.idSelectedClot !== null) {
      this.clot = this.clothingService.savedGarment().find(garment => garment.id == this.idSelectedClot)!
    }
  }
}
