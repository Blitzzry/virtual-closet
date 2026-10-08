import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, signal} from '@angular/core';
import { ClothingService } from '../../../../core/services/clothing-service';
import { Icon } from '../../atoms/icon/icons';
import { FormsModule } from '@angular/forms';
import { ClothingItem, ClothingCategory } from '../../../../core/models/interface';
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
    FormsModule
  ],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css',
})
export class SideBar implements OnChanges {
  constructor(public clothingService: ClothingService) { }
  editing: boolean = false
  clothingCategories: ClothingCategory[] = ['tops', 'bottoms', 'dresses', 'outerwear', 'shoes', 'accessories']
  @Input() idSelectedClot: string | null = null
  @Input() clots: ClothingItem[] = {} as ClothingItem[]
  clot: ClothingItem = {} as ClothingItem
  editedName = signal<string>('')
  editedNote = signal<string>('')
  editedBrand = signal<string>('')
  editedMaterial = signal<string>('')
  editedCategory = signal<ClothingCategory>(this.clot.category)
  @Output() close = new EventEmitter<void>();
  
  onNameChange(event: Event){
    this.editedName.set((event.target as HTMLInputElement).value)
  }

  onNoteChange(event: Event){
    this.editedNote.set((event.target as HTMLInputElement).value)
  }

  onMaterialChange(event: Event){
    this.editedMaterial.set((event.target as HTMLInputElement).value)
  }

  onBrandChange(event: Event){
    this.editedBrand.set((event.target as HTMLInputElement).value)
  }

  onCategoryChange(newCategory: ClothingCategory){
    this.editedCategory.set(newCategory)
  }

  saveClt(id: string, notes: string, name: string, material: string, category: ClothingCategory, brand: string) {
    const editeditem = {
      ...this.clot,
      notes: notes,
      name: name,
      material: material,
      category: category,
      brand: brand
    }
    this.clothingService.saveEdit(id, editeditem as ClothingItem)
    this.editing = false
  }

  closeModal() {
    this.close.emit();
  }

  toggleEdit() {
    this.editing = !this.editing
    this.editedBrand.set(this.clot.brand)
    this.editedCategory.set(this.clot.category)
    this.editedName.set(this.clot.name)
    this.editedMaterial.set(this.clot.material)
    this.editedNote.set(this.clot.notes)
  }

  onInput(event: Event) {
    const input = event.target as HTMLInputElement;
    input.style.width = input.value.length + 3 + 'ch';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.idSelectedClot !== null) {
      this.clot = this.clots.find(garment => garment.id == this.idSelectedClot)!
      console.log(typeof this.clots[0].category)
    }
  }
}
