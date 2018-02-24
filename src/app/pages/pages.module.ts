import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

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


import {PAGES_ROUTES} from "./pages.routes";



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AlmacenComponent,
    AgregarComponent,
    ModificarComponent,
    ClientesComponent,
    AgregarClienteComponent,
    ModificarClienteComponent
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
    HttpModule,
    PAGES_ROUTES
  ]
}) export class PagesModule{}
