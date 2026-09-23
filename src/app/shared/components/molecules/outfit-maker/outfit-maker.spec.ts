import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutfitMaker } from './outfit-maker';

describe('OutfitMaker', () => {
  let component: OutfitMaker;
  let fixture: ComponentFixture<OutfitMaker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutfitMaker],
    }).compileComponents();

    fixture = TestBed.createComponent(OutfitMaker);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
