import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChargesCnssComponent } from './charges-cnss.component';

describe('ChargesCnssComponent', () => {
  let component: ChargesCnssComponent;
  let fixture: ComponentFixture<ChargesCnssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChargesCnssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChargesCnssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
