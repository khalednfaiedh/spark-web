import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateEcritureComponent } from './update-ecriture.component';

describe('UpdateEcritureComponent', () => {
  let component: UpdateEcritureComponent;
  let fixture: ComponentFixture<UpdateEcritureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateEcritureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateEcritureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
