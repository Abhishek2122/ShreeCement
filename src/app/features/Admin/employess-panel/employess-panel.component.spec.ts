import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployessPanelComponent } from './employess-panel.component';

describe('EmployessPanelComponent', () => {
  let component: EmployessPanelComponent;
  let fixture: ComponentFixture<EmployessPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmployessPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmployessPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
