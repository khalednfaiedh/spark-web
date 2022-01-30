import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoisirClasseComponent } from './choisir-classe.component';

describe('ChoisirClasseComponent', () => {
  let component: ChoisirClasseComponent;
  let fixture: ComponentFixture<ChoisirClasseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoisirClasseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoisirClasseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
