import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEtatfinancierComponent } from './show-etatfinancier.component';

describe('ShowEtatfinancierComponent', () => {
  let component: ShowEtatfinancierComponent;
  let fixture: ComponentFixture<ShowEtatfinancierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEtatfinancierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEtatfinancierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
