import {RouterModule, Routes} from '@angular/router';

import {EscuelasComponent} from './escuelas/escuelas.component';
import {PagesComponent} from './pages.component';
import {HomeComponent} from './home/home.component';
import {AlmacenComponent} from './almacen/almacen.component';
import {AgregarProductoComponent} from './almacen/agregar-producto/agregar-producto.component';
import {ModificarProductoComponent} from './almacen/modificar-producto/modificar-producto.component';
import {LoginGuardGuard} from '../services/guards/login-guard.guard';
import {RecursosHumanosComponent} from './recursos-humanos/recursos-humanos.component';
import {AgregarEmpleadoComponent} from './recursos-humanos/agregar-empleado/agregar-empleado.component';
import {ModificarEmpleadoComponent} from './recursos-humanos/modificar-empleado/modificar-empleado.component';
import {CuentasPorCobrarComponent} from './cuentas-por-cobrar/cuentas-por-cobrar.component';
import {CuentasVendedorComponent} from './cuentas-por-cobrar/cuentas-vendedor/cuentas-vendedor.component';
import {CuentasGeneralComponent} from './cuentas-por-cobrar/cuentas-general/cuentas-general.component';
import {AsignarFoliosEmpleadoComponent} from './recursos-humanos/asignar-folios-empleado/asignar-folios-empleado.component';
import {UsuariosComponent} from './configuracion/usuarios/usuarios.component';
import {AgregarEscuelaComponent} from './escuelas/agregar-escuela/agregar-escuela.component';
import {ModificarEscuelaComponent} from './escuelas/modificar-escuela/modificar-escuela.component';
import {MaestrosComponent} from "./maestros/maestros.component";
import {AgregarMaestroComponent} from "./maestros/agregar-maestro/agregar-maestro.component";
import {ModificarMaestroComponent} from "./maestros/modificar-maestro/modificar-maestro.component";


const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
      {path: 'home', component: HomeComponent, data: {titulo: 'Inicio'}},
      {path: 'configuracion', component: UsuariosComponent, data: {titulo: 'Configuracion'}},
      {
        path: 'almacen',
        component: AlmacenComponent,
        children:  [
          {path: 'producto', component: AgregarProductoComponent, data: {titulo: 'Almacen'}},
          {path: 'producto/:clave', component: AgregarProductoComponent, data: {titulo: 'Almacen'}},
          {path: 'productos', component: ModificarProductoComponent, data: {titulo: 'Almacen - Modificar producto'}},
          {path: '**', redirectTo: 'producto/nuevo', pathMatch: 'full'}
        ],
        data: {titulo: 'Almacen'}
      },
      {
        path: 'escuelas',
        component: EscuelasComponent,
        children: [
          {path: 'escuela', component: AgregarEscuelaComponent, data: {titulo: 'Escuelas - Nueva escuela'}},
          {path: 'escuela/:clave', component: AgregarEscuelaComponent, data: {titulo: 'Escuelas - Nueva escuela'}},
          {path: 'escuelas', component: ModificarEscuelaComponent, data: {titulo: 'Escuelas - Modificar escuela'}},
          {path: '', redirectTo: 'escuela/nuevo', pathMatch: 'full'}
        ],
        data: {titulo: 'Clientes'}
      },
      {
        path: 'maestros',
        component: MaestrosComponent,
        children: [
          {path: 'maestro', component: AgregarMaestroComponent, data: {titulo: 'Escuelas - Nueva escuela'}},
          {path: 'maestro/:clave', component: AgregarMaestroComponent, data: {titulo: 'Escuelas - Nueva escuela'}},
          {path: 'maestros', component: ModificarMaestroComponent, data: {titulo: 'Escuelas - Modificar escuela'}},
          {path: '', redirectTo: 'maestro/nuevo', pathMatch: 'full'}
        ],
        data: {titulo: 'Clientes'}
      },
      {
        path: 'cuentas',
        component: CuentasPorCobrarComponent,
        children: [
          {path: 'vendedor', component: CuentasVendedorComponent, data: {titulo: 'Cuentas por cobrar - Vendedor'}},
          {path: 'general', component: CuentasGeneralComponent, data: {titulo: 'Cuentas por cobrar - General'}},
          {path: '', redirectTo: 'vendedor', pathMatch: 'full'}
        ],
        data: {titulo: 'Cuentas por cobrar'}
      },
      {
        path: 'nomina',
        component: RecursosHumanosComponent,
        children: [
          {path: 'empleado', component: AgregarEmpleadoComponent, data: {titulo: 'Recursos humanos'}},
          {path: 'empleado/:clave', component: AgregarEmpleadoComponent, data: {titulo: 'Recursos humanos'}},
          {path: 'empleados', component: ModificarEmpleadoComponent, data: {titulo: 'Recursos humanos', subtitle: 'Modificar empleado'}},
          {path: 'folios', component: AsignarFoliosEmpleadoComponent, data: {titulo: 'Recursos humanos', subtitle: 'Asignar folios'}},
          {path: '**', redirectTo: 'empleado/nuevo', pathMatch: 'full'}
        ],
        data: {titulo: 'Recursos humanos'}
      },
      {path: '', redirectTo: '/home', pathMatch: 'full'}
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
