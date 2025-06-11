import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReportPageComponent } from './stock-report-page.component';

describe('StockReportPageComponent', () => {
  let component: StockReportPageComponent;
  let fixture: ComponentFixture<StockReportPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StockReportPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StockReportPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
