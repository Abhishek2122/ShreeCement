import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InwardUploadComponent } from './inward-upload.component';

describe('InwardUploadComponent', () => {
  let component: InwardUploadComponent;
  let fixture: ComponentFixture<InwardUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InwardUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InwardUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
