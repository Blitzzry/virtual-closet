import { Component, computed, EventEmitter, OnDestroy, OnInit, Output, Renderer2 } from "@angular/core";
import { Icon } from "../../atoms/icon/icons";
import { ClothingService } from "../../../../core/services/clothing-service";
import { StylesList } from "../../../../core/models/interface";
import { StepperIndicator } from "../../atoms/stepper-indicator/stepper-indicator";
import { ClothingCard } from "../../molecules/clothing-card/clothing-card";

@Component({
  selector: "app-outfit-maker",
  imports: [Icon, StepperIndicator, ClothingCard],
  templateUrl: "./outfit-maker.html",
  styleUrl: "./outfit-maker.css",
})
export class OutfitMaker implements OnInit, OnDestroy {
  constructor(public clothingService: ClothingService, private renderer: Renderer2) {}
  @Output() close = new EventEmitter<void>()
  tagsSelected: string[] = [];
  styleSelected: StylesList = "" as StylesList;
  weatherSelected: string = "";
  tagsList = computed(() => {
    return this.clothingService.savedGarment().reduce((acc, ele) => {
      ele.tags.map((el) => {
        acc.includes(el) ? "" : acc.push(el);
      });
      return acc;
    }, [] as string[]);
  });

  closeModal(){
    this.close.emit()
  }

  aiOutfit = computed(() => {
    return this.clothingService.outfitMakerResponse();
  });

  debugger() {
    console.log(this.clothingService.suggestedCloths());
  }

  addTag(tag: string) {
    if (this.tagsSelected.length == 3 || this.tagsSelected.includes(tag)) {
      this.tagsSelected = this.tagsSelected.filter((el) => el !== tag);
      return this.tagsSelected;
    }
    if (this.tagsSelected.find((el) => el == tag)) {
      this.tagsSelected = this.tagsSelected.filter((el) => el !== tag);
      return this.tagsSelected;
    } else {
      return this.tagsSelected.push(tag);
    }
  }
  ngOnInit(): void {
    // Bloquea el scroll del body al abrir la modal
    this.renderer.addClass(document.body, 'no-scroll');
  }

  ngOnDestroy(): void {
    // Devuelve el scroll al body cuando la modal se destruye (cierra)
    this.renderer.removeClass(document.body, 'no-scroll');
  }
}
