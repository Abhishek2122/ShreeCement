import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardAddPageComponent } from './outward-add-page.component';

describe('OutwardAddPageComponent', () => {
  let component: OutwardAddPageComponent;
  let fixture: ComponentFixture<OutwardAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutwardAddPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
