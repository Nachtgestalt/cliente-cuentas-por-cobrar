import {Routes} from '@angular/router';
import {ComisionesComponent} from './comisiones.component';
import {ComisionesVendedorComponent} from './comisiones-vendedor/comisiones-vendedor.component';
import {ComisionesDirectorComponent} from './comisiones-director/comisiones-director.component';
import {ComisionesLiderComponent} from './comisiones-lider/comisiones-lider.component';

export const COMISIONES_ROUTES: Routes = [
  {
    path: '', component: ComisionesComponent,
    children: [
      {path: '', redirectTo: 'vendedor', pathMatch: 'full'},
      {path: 'vendedor', component: ComisionesVendedorComponent, data: {titulo: 'Comisiones - Vendedor'}},
      {path: 'director', component: ComisionesDirectorComponent, data: {titulo: 'Comisiones - Director'}},
      {path: 'lider', component: ComisionesLiderComponent, data: {titulo: 'Comisiones - Lider'}}
    ],
  }
];
