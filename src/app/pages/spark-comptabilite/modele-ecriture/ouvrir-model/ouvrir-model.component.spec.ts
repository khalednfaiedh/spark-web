import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OuvrirModelComponent } from './ouvrir-model.component';

describe('OuvrirModelComponent', () => {
  let component: OuvrirModelComponent;
  let fixture: ComponentFixture<OuvrirModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OuvrirModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OuvrirModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
