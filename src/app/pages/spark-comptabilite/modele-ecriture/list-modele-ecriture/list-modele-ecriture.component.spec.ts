import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModeleEcritureComponent } from './list-modele-ecriture.component';

describe('ListModeleEcritureComponent', () => {
  let component: ListModeleEcritureComponent;
  let fixture: ComponentFixture<ListModeleEcritureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListModeleEcritureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListModeleEcritureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
