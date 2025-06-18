import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadUIComponent } from './upload-ui.component';

describe('UploadUIComponent', () => {
  let component: UploadUIComponent;
  let fixture: ComponentFixture<UploadUIComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadUIComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadUIComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
