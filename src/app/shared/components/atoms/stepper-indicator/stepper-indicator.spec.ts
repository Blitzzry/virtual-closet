import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperIndicator } from './stepper-indicator';

describe('StepperIndicator', () => {
  let component: StepperIndicator;
  let fixture: ComponentFixture<StepperIndicator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepperIndicator],
    }).compileComponents();

    fixture = TestBed.createComponent(StepperIndicator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
