import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarFoliosEmpleadoComponent } from './asignar-folios-empleado.component';

describe('AsignarFoliosEmpleadoComponent', () => {
  let component: AsignarFoliosEmpleadoComponent;
  let fixture: ComponentFixture<AsignarFoliosEmpleadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsignarFoliosEmpleadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarFoliosEmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
