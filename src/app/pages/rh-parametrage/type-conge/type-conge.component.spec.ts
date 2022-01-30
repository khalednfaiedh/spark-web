import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeCongeComponent } from './type-conge.component';

describe('TypeCongeComponent', () => {
  let component: TypeCongeComponent;
  let fixture: ComponentFixture<TypeCongeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeCongeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
