import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardReportComponent } from './inward-report.component';

describe('InwardReportComponent', () => {
  let component: InwardReportComponent;
  let fixture: ComponentFixture<InwardReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InwardReportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
