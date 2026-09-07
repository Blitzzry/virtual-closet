import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../../../../core/services/auht.service';
import { ClothingService } from '../../../../core/services/clothing-service';
import { Icon } from '../../atoms/icon/icons';

@Component({
  selector: 'app-top-bar',
  imports: [Icon],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
  constructor (public authService: AuthService, public clothingService: ClothingService){}
  @Input() userName?: string = ''
  @Output() openAI = new EventEmitter<void>();

  askAI() {
    this.openAI.emit()
  }
}
