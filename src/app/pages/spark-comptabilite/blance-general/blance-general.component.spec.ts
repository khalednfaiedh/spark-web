import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlanceGeneralComponent } from './blance-general.component';

describe('BlanceGeneralComponent', () => {
  let component: BlanceGeneralComponent;
  let fixture: ComponentFixture<BlanceGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlanceGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlanceGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
