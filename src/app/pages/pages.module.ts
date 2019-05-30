import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';
import {PagesComponent} from './pages.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material.module';
import {PAGES_ROUTES} from './pages.routes';
import {UsuariosComponent} from './configuracion/usuarios/usuarios.component';
import {DeleteVendedorDialogComponent} from '../dialogs/delete-vendedor/delete-vendedor.dialog.component';
import {DeleteProductoDialogComponent} from '../dialogs/delete-producto/delete-producto.dialog.component';
import {DeleteEscuelaDialogComponent} from '../dialogs/delete-escuela/delete-escuela.dialog.component';
import {DeleteProfesorDialogComponent} from '../dialogs/delete-profesor/delete-profesor.dialog.component';
import {ConfiguracionComponent} from './configuracion/configuracion.component';
import {TemporadasComponent} from './configuracion/temporadas/temporadas.component';
import {AddTemporadaComponent} from '../dialogs/add-temporada/add-temporada.dialog.component';
import {AddZonaDialogComponent} from '../dialogs/add-zona/add-zona.dialog.component';
import {FoliosComponent} from './configuracion/folios/folios.component';
import {AddFolioDialogComponent} from '../dialogs/add-folio/add-folio.dialog.component';
import {DeleteFolioDialogComponent} from '../dialogs/delete-folio/delete-folio.dialog..component';
import {EntregasDevolucionesComponent} from './entregas-devoluciones/entregas-devoluciones.component';
import {ConfirmInventoryDialogComponent} from '../dialogs/confirm-inventory/confirm-inventory.dialog.component';
import {EditPedidoDialogComponent} from '../dialogs/edit-pedido/edit-pedido.dialog.component';
import {VentaResurtidoComponent} from '../dialogs/venta-resurtido/venta-resurtido.component';
import {DeleteVentaComponent} from '../dialogs/delete-venta/delete-venta.component';
import {InventarioComponent} from './inventario/inventario.component';
import {ShowResurtidosDialogComponent} from '../dialogs/show-resurtidos/show-resurtidos.dialog.component';
import {InventoryDialogComponent} from '../dialogs/inventory/inventory.dialog.component';
import {ConfirmPaymentComponent} from '../dialogs/confirm-payment/confirm-payment.component';
import {HistoryStockComponent} from '../dialogs/history-stock/history-stock.component';
import {HistoryLiderComponent} from '../dialogs/history-comisiones/history-lider/history-lider.component';
import {HistoryDirectorComponent} from '../dialogs/history-comisiones/history-director/history-director.component';
import {HistoryVendedorComponent} from '../dialogs/history-comisiones/history-vendedor/history-vendedor.component';
import {DirectivesModule} from '../directives/directives.module';
import {DialogsModule} from '../dialogs/dialogs.module';
import {CommonModule} from '@angular/common';


@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    UsuariosComponent,
    ConfiguracionComponent,
    TemporadasComponent,
    FoliosComponent,
    EntregasDevolucionesComponent,
    InventarioComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    DialogsModule,
    PAGES_ROUTES
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
    DeleteVentaComponent,
    ShowResurtidosDialogComponent,
    InventoryDialogComponent,
    ConfirmPaymentComponent,
    HistoryStockComponent,
    HistoryLiderComponent,
    HistoryDirectorComponent,
    HistoryVendedorComponent
    ]
}) export class PagesModule {}
