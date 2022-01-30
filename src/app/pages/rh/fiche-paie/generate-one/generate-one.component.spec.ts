import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOneComponent } from './generate-one.component';

describe('GenerateOneComponent', () => {
  let component: GenerateOneComponent;
  let fixture: ComponentFixture<GenerateOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
