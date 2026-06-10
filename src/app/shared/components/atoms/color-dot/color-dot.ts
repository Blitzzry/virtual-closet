import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-color-dot',
  imports: [],
  templateUrl: './color-dot.html',
  styleUrl: './color-dot.css',
})
export class ColorDot {
  constructor() {}
  @Input() colors: string[] | string = ['gray'];
  @Input() colorSize: string = '16px';
  isArray(value: any): boolean {
  return Array.isArray(value);
}
}
