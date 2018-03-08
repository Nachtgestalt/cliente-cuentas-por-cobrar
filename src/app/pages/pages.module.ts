import {NgModule} from '@angular/core';
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {ClientesComponent} from "./clientes/clientes.component";
import {AgregarComponent} from "./almacen/agregar/agregar.component";
import {ModificarClienteComponent} from "./clientes/modificar-cliente/modificar-cliente.component";
import {ModificarComponent} from "./almacen/modificar/modificar.component";
import {AgregarClienteComponent} from "./clientes/agregar-cliente/agregar-cliente.component";
import {HomeComponent} from "./home/home.component";
import {AlmacenComponent} from "./almacen/almacen.component";
import {PagesComponent} from "./pages.component";


import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../material.module";


import {PAGES_ROUTES} from './pages.routes';
import { RecursosHumanosComponent } from './recursos-humanos/recursos-humanos.component';
import { AgregarEmpleadoComponent } from './recursos-humanos/agregar-empleado/agregar-empleado.component';
import { ModificarEmpleadoComponent } from './recursos-humanos/modificar-empleado/modificar-empleado.component';
import { CuentasPorCobrarComponent } from './cuentas-por-cobrar/cuentas-por-cobrar.component';
import { CuentasVendedorComponent } from './cuentas-por-cobrar/cuentas-vendedor/cuentas-vendedor.component';
import { CuentasGeneralComponent } from './cuentas-por-cobrar/cuentas-general/cuentas-general.component';
import { AsignarFoliosEmpleadoComponent } from './recursos-humanos/asignar-folios-empleado/asignar-folios-empleado.component';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AlmacenComponent,
    AgregarComponent,
    ModificarComponent,
    ClientesComponent,
    AgregarClienteComponent,
    ModificarClienteComponent,
    RecursosHumanosComponent,
    AgregarEmpleadoComponent,
    ModificarEmpleadoComponent,
    CuentasPorCobrarComponent,
    CuentasVendedorComponent,
    CuentasGeneralComponent,
    AsignarFoliosEmpleadoComponent
  ],
  exports: [
    HomeComponent,
    AlmacenComponent,
    AgregarComponent,
    ModificarComponent,
    ClientesComponent,
    AgregarClienteComponent,
    ModificarClienteComponent
  ],
  imports: [
    SharedModule,
    MaterialModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    PAGES_ROUTES
  ]
}) export class PagesModule{}
