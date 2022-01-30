import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowEntrepriseComponent } from './show-entreprise.component';

describe('ShowEntrepriseComponent', () => {
  let component: ShowEntrepriseComponent;
  let fixture: ComponentFixture<ShowEntrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
