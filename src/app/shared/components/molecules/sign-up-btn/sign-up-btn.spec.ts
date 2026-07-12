import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpBtn } from './sign-up-btn';

describe('SignUpBtn', () => {
  let component: SignUpBtn;
  let fixture: ComponentFixture<SignUpBtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpBtn],
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpBtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
