import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClothingCard } from './clothing-card';

describe('ClothingCard', () => {
  let component: ClothingCard;
  let fixture: ComponentFixture<ClothingCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClothingCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ClothingCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
