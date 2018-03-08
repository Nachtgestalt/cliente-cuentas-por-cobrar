import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CuentasVendedorComponent } from './cuentas-vendedor.component';

describe('CuentasVendedorComponent', () => {
  let component: CuentasVendedorComponent;
  let fixture: ComponentFixture<CuentasVendedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CuentasVendedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CuentasVendedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
