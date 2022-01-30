import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcritureByLotComponent } from './ecriture-by-lot.component';

describe('EcritureByLotComponent', () => {
  let component: EcritureByLotComponent;
  let fixture: ComponentFixture<EcritureByLotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcritureByLotComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcritureByLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
