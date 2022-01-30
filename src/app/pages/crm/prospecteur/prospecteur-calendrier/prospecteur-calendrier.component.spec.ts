import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProspecteurCalendrierComponent } from './prospecteur-calendrier.component';

describe('ProspecteurCalendrierComponent', () => {
  let component: ProspecteurCalendrierComponent;
  let fixture: ComponentFixture<ProspecteurCalendrierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProspecteurCalendrierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProspecteurCalendrierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
