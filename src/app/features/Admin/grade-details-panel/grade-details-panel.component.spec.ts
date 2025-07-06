import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeDetailsPanelComponent } from './grade-details-panel.component';

describe('GradeDetailsPanelComponent', () => {
  let component: GradeDetailsPanelComponent;
  let fixture: ComponentFixture<GradeDetailsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GradeDetailsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradeDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
