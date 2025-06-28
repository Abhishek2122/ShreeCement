import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatOneToOneComponent } from './chat-one-to-one.component';

describe('ChatOneToOneComponent', () => {
  let component: ChatOneToOneComponent;
  let fixture: ComponentFixture<ChatOneToOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChatOneToOneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatOneToOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
