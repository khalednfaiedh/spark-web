import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateAllComponent } from './generate-all.component';

describe('GenerateAllComponent', () => {
  let component: GenerateAllComponent;
  let fixture: ComponentFixture<GenerateAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
