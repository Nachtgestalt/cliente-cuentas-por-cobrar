import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';

//Rutas
import {APP_ROUTING} from './app.routes';

//Modulos
import {PagesModule} from './pages/pages.module';

//Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';


// Servicios
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from './material.module';
import {ServiceModule} from './services/service.module';
import {DeleteVendedorDialogComponent} from './dialogs/delete-vendedor/delete-vendedor.dialog.component';
import {DeleteProductoDialogComponent} from './dialogs/delete-producto/delete-producto.dialog.component';
import {DeleteEscuelaDialogComponent} from './dialogs/delete-escuela/delete-escuela.dialog.component';
import {DeleteProfesorDialogComponent} from './dialogs/delete-profesor/delete-profesor.dialog.component';
import {AddTemporadaComponent} from './dialogs/add-temporada/add-temporada.dialog.component';
import {AddZonaDialogComponent} from './dialogs/add-zona/add-zona.dialog.component';
import {OnlyNumbersDirective} from './directives/onlyNumbers.directive';
import {AddFolioDialogComponent} from './dialogs/add-folio/add-folio.dialog.component';
import {DeleteFolioDialogComponent} from './dialogs/delete-folio/delete-folio.dialog..component';
import {ConfirmInventoryDialogComponent} from './dialogs/confirm-inventory/confirm-inventory.dialog.component';
import {EditPedidoDialogComponent} from './dialogs/edit-pedido/edit-pedido.dialog.component';
import {VentaResurtidoComponent} from './dialogs/venta-resurtido/venta-resurtido.component';
import {VentaDevolucionComponent} from './dialogs/venta-devolucion/venta-devolucion.component';
import {DeleteVentaComponent} from './dialogs/delete-venta/delete-venta.component';
import {ShowResurtidosDialogComponent} from './dialogs/show-resurtidos/show-resurtidos.dialog.component';
import {InventoryDialogComponent} from './dialogs/inventory/inventory.dialog.component';
import {ConfirmPaymentComponent} from './dialogs/confirm-payment/confirm-payment.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgressComponent,
    DeleteVendedorDialogComponent,
    DeleteProductoDialogComponent,
    DeleteEscuelaDialogComponent,
    DeleteProfesorDialogComponent,
    DeleteFolioDialogComponent,
    AddTemporadaComponent,
    AddZonaDialogComponent,
    AddFolioDialogComponent,
    ConfirmInventoryDialogComponent,
    EditPedidoDialogComponent,
    VentaResurtidoComponent,
    VentaDevolucionComponent,
    DeleteVentaComponent,
    ShowResurtidosDialogComponent,
    InventoryDialogComponent,
    ConfirmPaymentComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    PagesModule,
    LayoutModule,
    ServiceModule,
    APP_ROUTING
  ],
  entryComponents: [
    DeleteVendedorDialogComponent,
    DeleteProductoDialogComponent,
    DeleteEscuelaDialogComponent,
    DeleteProfesorDialogComponent,
    DeleteFolioDialogComponent,
    AddTemporadaComponent,
    AddZonaDialogComponent,
    AddFolioDialogComponent,
    ConfirmInventoryDialogComponent,
    EditPedidoDialogComponent,
    VentaResurtidoComponent,
    VentaDevolucionComponent,
    DeleteVentaComponent,
    ShowResurtidosDialogComponent,
    InventoryDialogComponent,
    ConfirmPaymentComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
