import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CuentasPorCobrarComponent} from './cuentas-por-cobrar.component';
import {CuentasVendedorComponent} from './cuentas-vendedor/cuentas-vendedor.component';
import {AbonoRapidoComponent} from './abono-rapido/abono-rapido.component';
import {CuentasEscuelaComponent} from './cuentas-escuela/cuentas-escuela.component';
import {CuentasMaestroComponent} from './cuentas-maestro/cuentas-maestro.component';
import {ReporteCuentasPorCobrarComponent} from './reporte-cuentas-por-cobrar/reporte-cuentas-por-cobrar.component';
import {ReporteGananciasComponent} from './reporte-ganancias/reporte-ganancias.component';
import {RouterModule} from '@angular/router';
import {CUENTAS_POR_COBRAR_ROUTES} from './cuentas-por-cobrar.routes';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterModule.forChild(CUENTAS_POR_COBRAR_ROUTES)
  ],
  declarations: [
    AbonoRapidoComponent,
    CuentasEscuelaComponent,
    CuentasMaestroComponent,
    CuentasVendedorComponent,
    CuentasPorCobrarComponent,
    ReporteCuentasPorCobrarComponent,
    ReporteGananciasComponent,
    CuentasPorCobrarComponent,
  ]
})
export class CuentasPorCobrarModule {
}
