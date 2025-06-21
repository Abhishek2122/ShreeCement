import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadDetailsandDeletionComponent } from './file-upload-detailsand-deletion.component';

describe('FileUploadDetailsandDeletionComponent', () => {
  let component: FileUploadDetailsandDeletionComponent;
  let fixture: ComponentFixture<FileUploadDetailsandDeletionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileUploadDetailsandDeletionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileUploadDetailsandDeletionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
