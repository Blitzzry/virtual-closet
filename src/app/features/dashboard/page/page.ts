import { Component, effect, signal } from '@angular/core';
import { ClothingCard } from '../../../shared/components/molecules/clothing-card/clothing-card';
import { mockClothing } from '../../../core/mock/mock-data';
import { UploadGarment } from '../../../shared/components/organisms/upload-garment/upload-garment';
import { Icon } from '../../../shared/components/atoms/icon/icons';
import { ClothingService } from '../../../core/services/clothing-service';
import { ClothingItem } from '../../../core/models/interface';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auht.service';
import { TopBar } from '../../../shared/components/molecules/top-bar/top-bar';

@Component({
  selector: 'app-page',
  imports: [ClothingCard,
    UploadGarment,
    Icon,
    TopBar,
  ],
  templateUrl: './page.html',
  styleUrl: './page.css',
})
export class Page {
  constructor(public clothingService: ClothingService, public router: Router, public authService: AuthService) {
    effect(() => {
      this.garment = this.clothingService.savedGarment();
    });
  }
  garment: ClothingItem[] = []
  item: ClothingItem[] = mockClothing
  isGarmentModalOpen: boolean = false
  modalActive = signal<'uploader' | 'AI' | null>(null)

  debbugger() {
    console.log(this.modalActive())
  }

  signUp() {
    this.router.navigate(["/signUp"])
  }
  logIn() {
    this.router.navigate(["/logIn"])
  }
}
