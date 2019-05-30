import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HistoryLiderComponent} from './history-comisiones/history-lider/history-lider.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material.module';
import {DeleteVendedorDialogComponent} from './delete-vendedor/delete-vendedor.dialog.component';
import {AddFolioDialogComponent} from './add-folio/add-folio.dialog.component';
import {AddTemporadaComponent} from './add-temporada/add-temporada.dialog.component';
import {AddZonaDialogComponent} from './add-zona/add-zona.dialog.component';
import {ConfirmInventoryDialogComponent} from './confirm-inventory/confirm-inventory.dialog.component';
import {ConfirmPaymentComponent} from './confirm-payment/confirm-payment.component';
import {DeleteEscuelaDialogComponent} from './delete-escuela/delete-escuela.dialog.component';
import {DeleteProductoDialogComponent} from './delete-producto/delete-producto.dialog.component';
import {DeleteProfesorDialogComponent} from './delete-profesor/delete-profesor.dialog.component';
import {DeleteFolioDialogComponent} from './delete-folio/delete-folio.dialog..component';
import {EditPedidoDialogComponent} from './edit-pedido/edit-pedido.dialog.component';
import {VentaResurtidoComponent} from './venta-resurtido/venta-resurtido.component';
import {DeleteVentaComponent} from './delete-venta/delete-venta.component';
import {ShowResurtidosDialogComponent} from './show-resurtidos/show-resurtidos.dialog.component';
import {InventoryDialogComponent} from './inventory/inventory.dialog.component';
import {HistoryStockComponent} from './history-stock/history-stock.component';
import {HistoryDirectorComponent} from './history-comisiones/history-director/history-director.component';
import {HistoryVendedorComponent} from './history-comisiones/history-vendedor/history-vendedor.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  declarations: [
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
})
export class DialogsModule {
}
