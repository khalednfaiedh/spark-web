import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActifComponent } from './actif.component';

describe('ActifComponent', () => {
  let component: ActifComponent;
  let fixture: ComponentFixture<ActifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
