import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MouvementCompteTiersComponent } from './mouvement-compte-tiers.component';

describe('MouvementCompteTiersComponent', () => {
  let component: MouvementCompteTiersComponent;
  let fixture: ComponentFixture<MouvementCompteTiersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MouvementCompteTiersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MouvementCompteTiersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
