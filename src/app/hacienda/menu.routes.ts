import {Routes} from '@angular/router';
import {DashboardHComponent} from './dashboard-h/dashboard-h.component';
import {InventarioComponent} from './inventario/inventario.component';
import {AlmacenComponent} from './almacen/almacen.component';

export const MENU_HACIENDA_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  {path: 'dashboard', component: DashboardHComponent, data: {titulo: 'Inicio'}},
  {path: 'inventario', component: InventarioComponent, data: {titulo: 'Inventario'}},
  {path: 'almacen', component: AlmacenComponent, data: {titulo: 'Almacen'}}
];
