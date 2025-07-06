import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminControllerPanelComponent } from './admin-controller-panel.component';

describe('AdminControllerPanelComponent', () => {
  let component: AdminControllerPanelComponent;
  let fixture: ComponentFixture<AdminControllerPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminControllerPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminControllerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
