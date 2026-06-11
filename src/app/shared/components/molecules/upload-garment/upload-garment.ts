import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-garment',
  imports: [],
  templateUrl: './upload-garment.html',
  styleUrl: './upload-garment.css',
})
export class UploadGarment {
  state: 'idle' | 'loading' | 'result' | 'added' = 'idle';
}
