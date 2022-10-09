import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDoctorComponent } from './view-doctor.component';

describe('ViewDoctorComponent', () => {
  let component: ViewDoctorComponent;
  let fixture: ComponentFixture<ViewDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDoctorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
