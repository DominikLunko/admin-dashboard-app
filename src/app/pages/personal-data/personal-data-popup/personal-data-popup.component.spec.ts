import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalDataPopupComponent } from './personal-data-popup.component';

describe('PersonalDataPopupComponent', () => {
  let component: PersonalDataPopupComponent;
  let fixture: ComponentFixture<PersonalDataPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalDataPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalDataPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
