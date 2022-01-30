import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupReclamationComponent } from './popup-reclamation.component';

describe('PopupReclamationComponent', () => {
  let component: PopupReclamationComponent;
  let fixture: ComponentFixture<PopupReclamationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupReclamationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupReclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
