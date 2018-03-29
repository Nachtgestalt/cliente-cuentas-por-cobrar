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
    LoginGuardGuard
  ],
  declarations: []
})
export class ServiceModule { }
