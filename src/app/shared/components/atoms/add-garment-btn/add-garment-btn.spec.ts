import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGarmentBtn } from './add-garment-btn';

describe('AddGarmentBtn', () => {
  let component: AddGarmentBtn;
  let fixture: ComponentFixture<AddGarmentBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddGarmentBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(AddGarmentBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
