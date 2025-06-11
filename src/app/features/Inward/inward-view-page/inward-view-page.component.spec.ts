import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardViewPageComponent } from './inward-view-page.component';

describe('InwardViewPageComponent', () => {
  let component: InwardViewPageComponent;
  let fixture: ComponentFixture<InwardViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InwardViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
