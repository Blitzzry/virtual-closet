import { Component, effect, signal } from "@angular/core";
import { ClothingCard } from "../../../shared/components/molecules/clothing-card/clothing-card";
import { mockClothing } from "../../../core/mock/mock-data";
import { UploadGarment } from "../../../shared/components/organisms/upload-garment/upload-garment";
import { Icon } from "../../../shared/components/atoms/icon/icons";
import { ClothingService } from "../../../core/services/clothing-service";
import { ClothingCategory, ClothingItem } from "../../../core/models/interface";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auht.service";
import { TopBar } from "../../../shared/components/molecules/top-bar/top-bar";
import { SideBar } from "../../../shared/components/molecules/side-bar/side-bar";
import { CategoriesFilter } from "../../../shared/components/molecules/categories-filter/categories-filter";
import { OutfitMaker } from "../../../shared/components/molecules/outfit-maker/outfit-maker";

@Component({
  selector: "app-page",
  imports: [
    ClothingCard,
    UploadGarment,
    Icon,
    TopBar,
    SideBar,
    CategoriesFilter,
    OutfitMaker,
  ],
  templateUrl: "./page.html",
  styleUrl: "./page.css",
})
export class Page {
  constructor(
    public clothingService: ClothingService,
    public router: Router,
    public authService: AuthService,
  ) {
    effect(() => {
      this.garment = this.clothingService.savedGarment();
    });
  }
  garment: ClothingItem[] = [];
  categories: [ClothingCategory, number][] = [];
  item: ClothingItem[] = mockClothing;
  isGarmentModalOpen: boolean = false;
  modalActive = signal<"uploader" | "OutfitMaker" | "preview" | null>(null);
  idSelectedClot = signal<string>("");

  deleteGarment(id: string, imageUrl: string) {
    const url = new URL(imageUrl);
    this.clothingService.deleteGarment(
      id,
      imageUrl,
    );
  }

  selectClot(id: string) {
    this.idSelectedClot.set(id);
    this.modalActive.set("preview");
  }

  activeModal(modal: "uploader" | "OutfitMaker" | "preview" | null) {
    this.modalActive.set(modal);
  }

  closeModal() {
    this.modalActive.set(null);
    this.clothingService.closeAiResponse()
  }

  debbugger() {
    console.log(this.modalActive());
  }

  signUp() {
    this.router.navigate(["/signUp"]);
  }
  logIn() {
    this.router.navigate(["/logIn"]);
  }
}
