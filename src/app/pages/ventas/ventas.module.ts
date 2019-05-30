import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {VentasComponent} from './ventas.component';
import {NuevaVentaComponent} from './nueva-venta/nueva-venta.component';
import {ModificarVentaComponent} from './modificar-venta/modificar-venta.component';
import {ReporteVentaComponent} from './reporte-venta/reporte-venta.component';
import {RouterModule} from '@angular/router';
import {VENTAS_ROUTES} from './ventas.routes';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(VENTAS_ROUTES)
  ],
  declarations: [
    VentasComponent,
    NuevaVentaComponent,
    ModificarVentaComponent,
    ReporteVentaComponent,
  ]
})
export class VentasModule {
}
