import {NgModule} from '@angular/core';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
// Rutas
import {APP_ROUTES} from './app.routes';
// Modulos
// Componentes
import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
// Servicios
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {ServiceModule} from './services/service.module';
import {RouterModule} from '@angular/router';
import {DialogsModule} from './dialogs/dialogs.module';
import {DirectivesModule} from './directives/directives.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // DeleteVendedorDialogComponent,
    // DeleteProductoDialogComponent,
    // DeleteEscuelaDialogComponent,
    // DeleteProfesorDialogComponent,
    // DeleteFolioDialogComponent,
    // AddTemporadaComponent,
    // AddZonaDialogComponent,
    // AddFolioDialogComponent,
    // ConfirmInventoryDialogComponent,
    // EditPedidoDialogComponent,
    // VentaResurtidoComponent,
    // DeleteVentaComponent,
    // ShowResurtidosDialogComponent,
    // InventoryDialogComponent,
    // ConfirmPaymentComponent,
    // HistoryStockComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    DialogsModule,
    ServiceModule,
    DirectivesModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  // entryComponents: [
  //   DeleteVendedorDialogComponent,
  //   DeleteProductoDialogComponent,
  //   DeleteEscuelaDialogComponent,
  //   DeleteProfesorDialogComponent,
  //   DeleteFolioDialogComponent,
  //   AddTemporadaComponent,
  //   AddZonaDialogComponent,
  //   AddFolioDialogComponent,
  //   ConfirmInventoryDialogComponent,
  //   EditPedidoDialogComponent,
  //   VentaResurtidoComponent,
  //   DeleteVentaComponent,
  //   ShowResurtidosDialogComponent,
  //   InventoryDialogComponent,
  //   ConfirmPaymentComponent,
  //   HistoryStockComponent,
  //   HistoryLiderComponent,
  //   HistoryDirectorComponent,
  //   HistoryVendedorComponent
  // ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
