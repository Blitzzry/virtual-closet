import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesFilter } from './categories-filter';

describe('CategoriesFilter', () => {
  let component: CategoriesFilter;
  let fixture: ComponentFixture<CategoriesFilter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesFilter],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoriesFilter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
