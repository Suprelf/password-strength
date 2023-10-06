import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthFieldComponent } from './strength-field.component';

describe('StrengthFieldComponent', () => {
  let component: StrengthFieldComponent;
  let fixture: ComponentFixture<StrengthFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrengthFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StrengthFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
