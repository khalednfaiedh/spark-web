import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrandLivreComponent } from './grand-livre.component';

describe('GrandLivreComponent', () => {
  let component: GrandLivreComponent;
  let fixture: ComponentFixture<GrandLivreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrandLivreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrandLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
