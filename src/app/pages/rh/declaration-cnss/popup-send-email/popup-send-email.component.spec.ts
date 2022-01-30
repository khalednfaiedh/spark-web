import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSendEmailComponent } from './popup-send-email.component';

describe('PopupSendEmailComponent', () => {
  let component: PopupSendEmailComponent;
  let fixture: ComponentFixture<PopupSendEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupSendEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSendEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
