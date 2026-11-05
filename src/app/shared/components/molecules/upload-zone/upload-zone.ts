import { Component } from '@angular/core';
import { Icon } from '../../atoms/icon/icons';
import { ClothingService } from '../../../../core/services/clothing-service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-upload-zone',
  imports: [Icon, TranslatePipe],
  templateUrl: './upload-zone.html',
  styleUrl: './upload-zone.css',
})
export class UploadZone {
  constructor(public ClothingService: ClothingService) {}
}
