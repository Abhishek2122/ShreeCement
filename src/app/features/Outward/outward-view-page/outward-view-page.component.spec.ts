import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardViewPageComponent } from './outward-view-page.component';

describe('OutwardViewPageComponent', () => {
  let component: OutwardViewPageComponent;
  let fixture: ComponentFixture<OutwardViewPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutwardViewPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardViewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
