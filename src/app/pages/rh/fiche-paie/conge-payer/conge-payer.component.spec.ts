import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CongePayerComponent } from './conge-payer.component';

describe('CongePayerComponent', () => {
  let component: CongePayerComponent;
  let fixture: ComponentFixture<CongePayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongePayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongePayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
