import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-suggested-tags',
  imports: [],
  templateUrl: './suggested-tags.html',
  styleUrl: './suggested-tags.css',
})
export class SuggestedTags {
 @Input() tags : string[] = []
}
