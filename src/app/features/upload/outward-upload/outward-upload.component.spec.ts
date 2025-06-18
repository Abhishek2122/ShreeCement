import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutwardUploadComponent } from './outward-upload.component';

describe('OutwardUploadComponent', () => {
  let component: OutwardUploadComponent;
  let fixture: ComponentFixture<OutwardUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OutwardUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OutwardUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
