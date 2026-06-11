import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadGarment } from './upload-garment';

describe('UploadGarment', () => {
  let component: UploadGarment;
  let fixture: ComponentFixture<UploadGarment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadGarment],
    }).compileComponents();

    fixture = TestBed.createComponent(UploadGarment);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
