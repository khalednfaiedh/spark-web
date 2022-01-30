import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GammeOperatoireComponent } from './gamme-operatoire.component';

describe('GammeOperatoireComponent', () => {
  let component: GammeOperatoireComponent;
  let fixture: ComponentFixture<GammeOperatoireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GammeOperatoireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GammeOperatoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
