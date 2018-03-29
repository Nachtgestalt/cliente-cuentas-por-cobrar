import {RouterModule, Routes} from "@angular/router";

import {ClientesComponent} from "./clientes/clientes.component";
import {PagesComponent} from "./pages.component";
import {HomeComponent} from "./home/home.component";
import {AlmacenComponent} from "./almacen/almacen.component";
import {AgregarComponent} from "./almacen/agregar/agregar.component";
import {ModificarComponent} from "./almacen/modificar/modificar.component";
import {AgregarClienteComponent} from "./clientes/agregar-cliente/agregar-cliente.component";
import {ModificarClienteComponent} from "./clientes/modificar-cliente/modificar-cliente.component";
import {LoginGuardGuard} from "../services/guards/login-guard.guard";
import {RecursosHumanosComponent} from "./recursos-humanos/recursos-humanos.component";
import {AgregarEmpleadoComponent} from "./recursos-humanos/agregar-empleado/agregar-empleado.component";
import {ModificarEmpleadoComponent} from "./recursos-humanos/modificar-empleado/modificar-empleado.component";
import {CuentasPorCobrarComponent} from "./cuentas-por-cobrar/cuentas-por-cobrar.component";
import {CuentasVendedorComponent} from "./cuentas-por-cobrar/cuentas-vendedor/cuentas-vendedor.component";
import {CuentasGeneralComponent} from "./cuentas-por-cobrar/cuentas-general/cuentas-general.component";
import {AsignarFoliosEmpleadoComponent} from "./recursos-humanos/asignar-folios-empleado/asignar-folios-empleado.component";
import {UsuariosComponent} from "./configuracion/usuarios/usuarios.component";


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
          {path: 'producto', component: AgregarComponent, data: {titulo: 'Almacen - Nuevo producto'}},
          {path: 'productos', component: ModificarComponent, data: {titulo: 'Almacen - Modificar producto'}},
          {path: '', redirectTo: 'producto', pathMatch: 'full'}
        ],
        data: {titulo: 'Almacen'}
      },
      {
        path: 'clientela',
        component: ClientesComponent,
        children: [
          {path: 'cliente', component: AgregarClienteComponent, data: {titulo: 'Clientes - Nuevo cliente'}},
          {path: 'clientes', component: ModificarClienteComponent, data: {titulo: 'Clientes - Modificar clientes'}},
          {path: '', redirectTo: 'cliente', pathMatch: 'full'}
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
          {path: 'empleado', component: AgregarEmpleadoComponent, data: {titulo: 'Recursos humanos - Nuevo empleado'}},
          {path: 'empleados', component: ModificarEmpleadoComponent, data: {titulo: 'Recursos humanos - Modificar empleado'}},
          {path: 'folios', component: AsignarFoliosEmpleadoComponent, data: {titulo: 'Recursos humanos - Asignar folios'}},
          {path: '', redirectTo: 'empleado', pathMatch: 'full'}
        ],
        data: {titulo: 'Recursos humanos'}
      },
      {path: '', redirectTo: '/home', pathMatch: 'full'}
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
