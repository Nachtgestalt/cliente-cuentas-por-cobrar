import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ProductosService,
  SidebarService,
  SharedService,
  LoginGuardGuard,
  UserService
} from './service.index';
import {HttpClientModule} from '@angular/common/http';
import {VendedorService} from "./vendedor/vendedor.service";
import {EscuelaService} from "./escuela/escuela.service";
import {MaestroService} from "./maestro/maestro.service";

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ProductosService,
    SidebarService,
    SharedService,
    UserService,
    VendedorService,
    EscuelaService,
    MaestroService,
    LoginGuardGuard
  ],
  declarations: []
})
export class ServiceModule { }
