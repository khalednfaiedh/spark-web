import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoisComponent } from './mois.component';

describe('MoisComponent', () => {
  let component: MoisComponent;
  let fixture: ComponentFixture<MoisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
