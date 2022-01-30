import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspecteurComponent } from './prospecteur.component';

describe('ProspecteurComponent', () => {
  let component: ProspecteurComponent;
  let fixture: ComponentFixture<ProspecteurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspecteurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspecteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
