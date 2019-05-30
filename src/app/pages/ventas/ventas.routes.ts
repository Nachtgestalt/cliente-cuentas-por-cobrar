import {Routes} from '@angular/router';
import {NuevaVentaComponent} from './nueva-venta/nueva-venta.component';
import {ModificarVentaComponent} from './modificar-venta/modificar-venta.component';
import {ReporteVentaComponent} from './reporte-venta/reporte-venta.component';
import {AdminGuard} from '../../services/guards/admin.guard';
import {VentasComponent} from './ventas.component';

export const VENTAS_ROUTES: Routes = [
  {
    path: '', component: VentasComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'nueva'},
      {path: 'nueva', component: NuevaVentaComponent, data: {titulo: 'Nueva venta'}},
      {path: 'lista', component: ModificarVentaComponent, data: {titulo: 'Lista de ventas'}},
      {path: 'reporte', component: ReporteVentaComponent, canActivate: [AdminGuard], data: {titulo: 'Reporte de ventas'}},
    ]
  },
];
