import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaResurtidoComponent } from './venta-resurtido.component';

describe('VentaResurtidoComponent', () => {
  let component: VentaResurtidoComponent;
  let fixture: ComponentFixture<VentaResurtidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VentaResurtidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VentaResurtidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
