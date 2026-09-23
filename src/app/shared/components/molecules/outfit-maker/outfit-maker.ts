import { Component, computed, EventEmitter, Output } from "@angular/core";
import { Icon } from "../../atoms/icon/icons";
import { ClothingService } from "../../../../core/services/clothing-service";
import { StylesList } from "../../../../core/models/interface";


@Component({
  selector: "app-outfit-maker",
  imports: [Icon],
  templateUrl: "./outfit-maker.html",
  styleUrl: "./outfit-maker.css",
})
export class OutfitMaker {
  constructor(public clothingService: ClothingService) {}
  @Output()
  openOutfitMaker = new EventEmitter<void>();
  tagsSelected: string[] = [];
  styleSelected: StylesList = '' as StylesList;
  weatherSelected: string = '';
  tagsList = computed(() => {
    return this.clothingService.savedGarment().reduce((acc, ele) => {
      ele.tags.map(el => {
        acc.includes(el) ? '' : acc.push(el)
      })
      return acc
    }, [] as string[]);
  });

  addTag(tag: string) {
    if (this.tagsSelected.length == 3 || this.tagsSelected.includes(tag)){
      this.tagsSelected = this.tagsSelected.filter(el => el !== tag)
      return this.tagsSelected
    }
    if (this.tagsSelected.find((el) => el == tag)) {
      console.log(this.tagsSelected);
      this.tagsSelected = this.tagsSelected.filter((el) => el !== tag);
      return this.tagsSelected;
    } else {
      return this.tagsSelected.push(tag);
    }
  }

  generateOutfit () {
    
  }

  outfitMaker() {
    this.openOutfitMaker.emit();
  }
}
