import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-stepper-indicator',
  imports: [],
  templateUrl: './stepper-indicator.html',
  styleUrl: './stepper-indicator.css',
})
export class StepperIndicator {
  @Input() phase: string = 'first';
}
