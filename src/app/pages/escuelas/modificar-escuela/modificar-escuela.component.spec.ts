import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEscuelaComponent } from './modificar-escuela.component';

describe('ModificarEscuelaComponent', () => {
  let component: ModificarEscuelaComponent;
  let fixture: ComponentFixture<ModificarEscuelaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarEscuelaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarEscuelaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
