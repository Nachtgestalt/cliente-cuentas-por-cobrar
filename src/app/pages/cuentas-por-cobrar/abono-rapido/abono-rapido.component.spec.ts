import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbonoRapidoComponent } from './abono-rapido.component';

describe('AbonoRapidoComponent', () => {
  let component: AbonoRapidoComponent;
  let fixture: ComponentFixture<AbonoRapidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbonoRapidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbonoRapidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
