import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrppComponent } from './irpp.component';

describe('IrppComponent', () => {
  let component: IrppComponent;
  let fixture: ComponentFixture<IrppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
