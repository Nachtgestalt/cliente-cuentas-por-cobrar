import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasGeneralComponent } from './cuentas-general.component';

describe('CuentasGeneralComponent', () => {
  let component: CuentasGeneralComponent;
  let fixture: ComponentFixture<CuentasGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
