import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardAddPageComponent } from './inward-add-page.component';

describe('InwardAddPageComponent', () => {
  let component: InwardAddPageComponent;
  let fixture: ComponentFixture<InwardAddPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InwardAddPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
