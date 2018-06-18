import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ProductosService,
  SidebarService,
  LoginGuardGuard,
  UserService
} from './service.index';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {VendedorService} from './vendedor/vendedor.service';
import {EscuelaService} from './escuela/escuela.service';
import {MaestroService} from './maestro/maestro.service';
import {TemporadaService} from './temporada/temporada.service';
import {ZonaService} from './zona/zona.service';
import {FolioService} from './folio/folio.service';
import {BloqueFoliosService} from './bloque-folios/bloque-folios.service';
import {VentaService} from './venta/venta.service';
import {InventarioService} from './inventario/inventario.service';
import {StockService} from './stock/stock.service';
import {HistorialVentaService} from './historial-venta/historial-venta.service';
import {DashboardService} from './dashboard/dashboard.service';
import {CatchInterceptorService} from './interceptors/catch-interceptor.service';
import {TokenInterceptorService} from './interceptors/token-interceptor.service';
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
    InventarioService,
    StockService,
    HistorialVentaService,
    DashboardService,
    TokenInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchInterceptorService,
      multi: true
    },
  ],
  declarations: []
})
export class ServiceModule { }
