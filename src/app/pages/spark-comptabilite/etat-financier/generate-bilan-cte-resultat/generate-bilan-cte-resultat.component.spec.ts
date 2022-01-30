import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateBilanCteResultatComponent } from './generate-bilan-cte-resultat.component';

describe('GenerateBilanCteResultatComponent', () => {
  let component: GenerateBilanCteResultatComponent;
  let fixture: ComponentFixture<GenerateBilanCteResultatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateBilanCteResultatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateBilanCteResultatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
