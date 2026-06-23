import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedTags } from './suggested-tags';

describe('SuggestedTags', () => {
  let component: SuggestedTags;
  let fixture: ComponentFixture<SuggestedTags>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestedTags],
    }).compileComponents();

    fixture = TestBed.createComponent(SuggestedTags);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
