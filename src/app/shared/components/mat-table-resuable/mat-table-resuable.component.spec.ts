import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableResuableComponent } from './mat-table-resuable.component';

describe('MatTableResuableComponent', () => {
  let component: MatTableResuableComponent;
  let fixture: ComponentFixture<MatTableResuableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MatTableResuableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTableResuableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
