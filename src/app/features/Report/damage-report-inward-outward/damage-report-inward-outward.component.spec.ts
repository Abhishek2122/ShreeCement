import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DamageReportInwardOutwardComponent } from './damage-report-inward-outward.component';

describe('DamageReportInwardOutwardComponent', () => {
  let component: DamageReportInwardOutwardComponent;
  let fixture: ComponentFixture<DamageReportInwardOutwardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DamageReportInwardOutwardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DamageReportInwardOutwardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
