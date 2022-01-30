import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypePayementComponent } from './type-payement.component';

describe('TypePayementComponent', () => {
  let component: TypePayementComponent;
  let fixture: ComponentFixture<TypePayementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypePayementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypePayementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
