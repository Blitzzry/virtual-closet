import { Component, Input } from "@angular/core";
import { ClothingCategory } from "../../../../core/models/interface";
import { TranslatePipe } from "@ngx-translate/core";

@Component({
  selector: "app-badge",
  imports: [TranslatePipe],
  templateUrl: "./badge.html",
  styleUrl: "./badge.css",
})
export class Badge {
  @Input()
  text: ClothingCategory = "" as ClothingCategory;
  categoryLabels: Record<ClothingCategory, string> = {
    tops: "CATEGORIES.TOPS",
    bottoms: "CATEGORIES.BOTTOMS",
    dresses: "CATEGORIES.DRESSES",
    outerwear: "CATEGORIES.OUTERWEAR",
    shoes: "CATEGORIES.SHOES",
    accessories: "CATEGORIES.ACCESSORIES",
  };
}
