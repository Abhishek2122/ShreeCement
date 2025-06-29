import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotDetailsPanelComponent } from './depot-details-panel.component';

describe('DepotDetailsPanelComponent', () => {
  let component: DepotDetailsPanelComponent;
  let fixture: ComponentFixture<DepotDetailsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepotDetailsPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepotDetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
