import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ProductosService,
  SidebarService,
  SharedService
} from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    ProductosService,
    SidebarService,
    SharedService
  ],
  declarations: []
})
export class ServiceModule { }
