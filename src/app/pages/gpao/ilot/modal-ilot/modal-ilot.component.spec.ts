import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIlotComponent } from './modal-ilot.component';

describe('ModalIlotComponent', () => {
  let component: ModalIlotComponent;
  let fixture: ComponentFixture<ModalIlotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIlotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
