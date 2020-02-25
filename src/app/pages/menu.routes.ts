import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AdminGuard} from '../services/guards/admin.guard';
import {EntregasDevolucionesComponent} from './entregas-devoluciones/entregas-devoluciones.component';
import {InventarioComponent} from './inventario/inventario.component';
import {ConfiguracionComponent} from './configuracion/configuracion.component';
import {TemporadasComponent} from './configuracion/temporadas/temporadas.component';
import {UsuariosComponent} from './configuracion/usuarios/usuarios.component';
import {FoliosComponent} from './configuracion/folios/folios.component';

export const MENU_ROUTES: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: HomeComponent, data: {titulo: 'Inicio'}},
  {
    path: 'ventas',
    loadChildren: () => import('./ventas/ventas.module').then(m => m.VentasModule)
  },
  {
    path: 'almacen',
    loadChildren: () => import('./almacen/almacen.module').then(m => m.AlmacenModule)
  },
  {
    path: 'clientes',
    loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule),
    data: {titulo: 'Clientes'}
  },
  {
    path: 'cuentas',
    loadChildren: () => import('./cuentas-por-cobrar/cuentas-por-cobrar.module').then(m => m.CuentasPorCobrarModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'comisiones',
    loadChildren: () => import('./comisiones/comisiones.module').then(m => m.ComisionesModule),
    canActivate: [AdminGuard],
  },
  {
    path: 'entregas',
    canActivate: [AdminGuard],
    component: EntregasDevolucionesComponent,
    data: {titulo: 'Entregas y devoluciones'}
  },
  {
    path: 'inventario',
    canActivate: [AdminGuard],
    component: InventarioComponent,
    data: {titulo: 'Inventario'}
  },
  {
    path: 'nomina',
    canActivate: [AdminGuard],
    loadChildren: () => import('./recursos-humanos/recursos-humanos.module').then(m => m.RecursosHumanosModule),
    data: {titulo: 'Recursos humanos'}
  },
  {
    path: 'configuracion',
    canActivate: [AdminGuard],
    component: ConfiguracionComponent,
    children: [
      {path: 'temporadas', component: TemporadasComponent, data: {titulo: 'Administrar temporada'}},
      {path: 'usuarios', component: UsuariosComponent, data: {titulo: 'Administrar usuarios'}},
      {path: 'folios', component: FoliosComponent, data: {titulo: 'Administrar folios', subtitle: 'Asignar folios'}},
      {path: '**', redirectTo: 'temporadas', pathMatch: 'full'}
    ],
    data: {titulo: 'Configuracion'}
  },
  {
    path: 'stock',
    component: InventarioComponent,
    data: {titulo: 'Inventario'}
  }
];
