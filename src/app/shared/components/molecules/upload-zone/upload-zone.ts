import { Component } from '@angular/core';
import { Icon } from '../../atoms/icon/icons';
import { ClothingService } from '../../../../core/services/virtual-closet-service';

@Component({
  selector: 'app-upload-zone',
  imports: [Icon],
  templateUrl: './upload-zone.html',
  styleUrl: './upload-zone.css',
})
export class UploadZone {
  constructor(public ClothingService: ClothingService) {}
}
