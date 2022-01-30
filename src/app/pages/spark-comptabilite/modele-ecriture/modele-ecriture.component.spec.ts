import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleEcritureComponent } from './modele-ecriture.component';

describe('ModeleEcritureComponent', () => {
  let component: ModeleEcritureComponent;
  let fixture: ComponentFixture<ModeleEcritureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeleEcritureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeleEcritureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
