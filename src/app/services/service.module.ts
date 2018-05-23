import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ProductosService,
  SidebarService,
  LoginGuardGuard,
  UserService
} from './service.index';
import {HttpClientModule} from '@angular/common/http';
import {VendedorService} from './vendedor/vendedor.service';
import {EscuelaService} from './escuela/escuela.service';
import {MaestroService} from './maestro/maestro.service';
import {TemporadaService} from './temporada/temporada.service';
import {ZonaService} from './zona/zona.service';
import {FolioService} from './folio/folio.service';
import {BloqueFoliosService} from './bloque-folios/bloque-folios.service';
import {VentaService} from './venta/venta.service';
import {InventarioService} from './inventario/inventario.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    ProductosService,
    SidebarService,
    UserService,
    VendedorService,
    EscuelaService,
    MaestroService,
    TemporadaService,
    ZonaService,
    LoginGuardGuard,
    FolioService,
    BloqueFoliosService,
    VentaService,
    InventarioService
  ],
  declarations: []
})
export class ServiceModule { }
