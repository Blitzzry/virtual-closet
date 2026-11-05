import { Component, EventEmitter, Input, Output } from "@angular/core";
import { AuthService } from "../../../../core/services/auht.service";
import { ClothingService } from "../../../../core/services/clothing-service";
import { Icon } from "../../atoms/icon/icons";
import { TranslatePipe } from "@ngx-translate/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-top-bar",
  imports: [Icon, TranslatePipe],
  templateUrl: "./top-bar.html",
  styleUrl: "./top-bar.css",
})
export class TopBar {
  constructor(
    public authService: AuthService,
    public clothingService: ClothingService,
    public translate: TranslateService,
  ) {}
  @Input() userName?: string = "";
  changeLanguage(lang: "es" | "en") {
    this.translate.use(lang);
    localStorage.setItem("language", lang);
  }
  @Output() openOutfitMaker = new EventEmitter<void>();
  outfitMaker() {
    this.openOutfitMaker.emit();
  }
}
