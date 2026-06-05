import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-color-dot',
  imports: [],
  templateUrl: './color-dot.html',
  styleUrl: './color-dot.css',
})
export class ColorDot {
  constructor() {}
  @Input() colors: string[] = ['gray'];
}
