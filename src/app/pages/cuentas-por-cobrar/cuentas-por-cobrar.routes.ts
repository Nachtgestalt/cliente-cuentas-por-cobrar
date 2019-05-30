import {Routes} from '@angular/router';
import {CuentasPorCobrarComponent} from './cuentas-por-cobrar.component';
import {AbonoRapidoComponent} from './abono-rapido/abono-rapido.component';
import {VentaDetailResolveService} from '../../services/venta/venta-detail-resolve.service';
import {CuentasVendedorComponent} from './cuentas-vendedor/cuentas-vendedor.component';
import {CuentasEscuelaComponent} from './cuentas-escuela/cuentas-escuela.component';
import {CuentasMaestroComponent} from './cuentas-maestro/cuentas-maestro.component';
import {ReporteCuentasPorCobrarComponent} from './reporte-cuentas-por-cobrar/reporte-cuentas-por-cobrar.component';
import {ReporteGananciasComponent} from './reporte-ganancias/reporte-ganancias.component';

export const CUENTAS_POR_COBRAR_ROUTES: Routes = [
  {
    path: '', component: CuentasPorCobrarComponent,
    children: [
      {path: '', redirectTo: 'vendedores', pathMatch: 'full'},
      {
        path: 'abono-rapido', component: AbonoRapidoComponent,
        resolve: {
          ventas: VentaDetailResolveService
        },
        data: {titulo: 'Cuentas por cobrar - Abono rapido'}
      },
      {path: 'vendedores', component: CuentasVendedorComponent, data: {titulo: 'Cuentas por cobrar - Vendedores'}},
      {path: 'vendedor', component: CuentasEscuelaComponent, data: {titulo: 'Cuentas por cobrar - Escuela'}},
      {path: 'vendedor/escuela', component: CuentasMaestroComponent, data: {titulo: 'Cuentas por cobrar - Maestro'}},
      {
        path: 'reporte-cuentas',
        component: ReporteCuentasPorCobrarComponent,
        data: {titulo: 'Cuentas por cobrar - Reporte cuentas por cobrar'}
      },
      {path: 'reporte-ganancias', component: ReporteGananciasComponent, data: {titulo: 'Cuentas por cobrar - Reporte ganancias'}},
    ],
  },
];
