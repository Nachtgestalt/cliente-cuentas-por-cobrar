import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {EscuelasComponent} from './escuelas/escuelas.component';
import {AgregarProductoComponent} from './almacen/agregar-producto/agregar-producto.component';
import {ModificarEscuelaComponent} from './escuelas/modificar-escuela/modificar-escuela.component';
import {ModificarProductoComponent} from './almacen/modificar-producto/modificar-producto.component';
import {AgregarEscuelaComponent} from './escuelas/agregar-escuela/agregar-escuela.component';
import {HomeComponent} from './home/home.component';
import {AlmacenComponent} from './almacen/almacen.component';
import {PagesComponent} from './pages.component';


import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material.module';


import {PAGES_ROUTES} from './pages.routes';
import { RecursosHumanosComponent } from './recursos-humanos/recursos-humanos.component';
import { AgregarEmpleadoComponent } from './recursos-humanos/agregar-empleado/agregar-empleado.component';
import { ModificarEmpleadoComponent } from './recursos-humanos/modificar-empleado/modificar-empleado.component';
import { CuentasPorCobrarComponent } from './cuentas-por-cobrar/cuentas-por-cobrar.component';
import { CuentasVendedorComponent } from './cuentas-por-cobrar/cuentas-vendedor/cuentas-vendedor.component';
import { AsignarFoliosEmpleadoComponent } from './recursos-humanos/asignar-folios-empleado/asignar-folios-empleado.component';
import { UsuariosComponent } from './configuracion/usuarios/usuarios.component';
import {UppercaseDirective} from '../directives/changeUppercase.directive';
import {OnlyNumbersDirective} from '../directives/onlyNumbers.directive';
import {DeleteVendedorDialogComponent} from '../dialogs/delete-vendedor/delete-vendedor.dialog.component';
import {DeleteProductoDialogComponent} from '../dialogs/delete-producto/delete-producto.dialog.component';
import { MaestrosComponent } from './maestros/maestros.component';
import { AgregarMaestroComponent } from './maestros/agregar-maestro/agregar-maestro.component';
import { ModificarMaestroComponent } from './maestros/modificar-maestro/modificar-maestro.component';
import {DeleteEscuelaDialogComponent} from '../dialogs/delete-escuela/delete-escuela.dialog.component';
import {DeleteProfesorDialogComponent} from '../dialogs/delete-profesor/delete-profesor.dialog.component';
import { ConfiguracionComponent } from './configuracion/configuracion.component';
import { TemporadasComponent } from './configuracion/temporadas/temporadas.component';
import {AddTemporadaComponent} from '../dialogs/add-temporada/add-temporada.dialog.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ZonasComponent } from './recursos-humanos/zonas/zonas.component';
import {AddZonaDialogComponent} from '../dialogs/add-zona/add-zona.dialog.component';
import { FoliosComponent } from './configuracion/folios/folios.component';
import {AddFolioDialogComponent} from '../dialogs/add-folio/add-folio.dialog.component';
import {DeleteFolioDialogComponent} from '../dialogs/delete-folio/delete-folio.dialog..component';
import { VentasComponent } from './ventas/ventas.component';
import { EntregasDevolucionesComponent } from './entregas-devoluciones/entregas-devoluciones.component';
import {ConfirmInventoryDialogComponent} from '../dialogs/confirm-inventory/confirm-inventory.dialog.component';
import { NuevaVentaComponent } from './ventas/nueva-venta/nueva-venta.component';
import { ModificarVentaComponent } from './ventas/modificar-venta/modificar-venta.component';
import {EditPedidoDialogComponent} from '../dialogs/edit-pedido/edit-pedido.dialog.component';
import {VentaResurtidoComponent} from '../dialogs/venta-resurtido/venta-resurtido.component';
import {DeleteVentaComponent} from '../dialogs/delete-venta/delete-venta.component';
import { InventarioComponent } from './inventario/inventario.component';
import {ShowResurtidosDialogComponent} from '../dialogs/show-resurtidos/show-resurtidos.dialog.component';
import {InventoryDialogComponent} from '../dialogs/inventory/inventory.dialog.component';
import { BloqueFoliosComponent } from './recursos-humanos/bloque-folios/bloque-folios.component';
import { CuentasEscuelaComponent } from './cuentas-por-cobrar/cuentas-escuela/cuentas-escuela.component';
import { CuentasMaestroComponent } from './cuentas-por-cobrar/cuentas-maestro/cuentas-maestro.component';
import {ConfirmPaymentComponent} from '../dialogs/confirm-payment/confirm-payment.component';
import { ComisionesComponent } from './comisiones/comisiones.component';
import { ComisionesVendedorComponent } from './comisiones/comisiones-vendedor/comisiones-vendedor.component';
import { ComisionesDirectorComponent } from './comisiones/comisiones-director/comisiones-director.component';
import { AbonoRapidoComponent } from './cuentas-por-cobrar/abono-rapido/abono-rapido.component';
import {HistoryStockComponent} from '../dialogs/history-stock/history-stock.component';
import { ComisionesLiderComponent } from './comisiones/comisiones-lider/comisiones-lider.component';
import {HistoryLiderComponent} from '../dialogs/history-comisiones/history-lider/history-lider.component';
import {HistoryDirectorComponent} from '../dialogs/history-comisiones/history-director/history-director.component';
import {HistoryVendedorComponent} from '../dialogs/history-comisiones/history-vendedor/history-vendedor.component';
import { ReporteVentaComponent } from './ventas/reporte-venta/reporte-venta.component';
import { ReporteCuentasPorCobrarComponent } from './cuentas-por-cobrar/reporte-cuentas-por-cobrar/reporte-cuentas-por-cobrar.component';
import { ReporteGananciasComponent } from './cuentas-por-cobrar/reporte-ganancias/reporte-ganancias.component';
import {DebounceClickDirective} from '../directives/debounce-click.directive';



@NgModule({
  declarations: [
    PagesComponent,
    HomeComponent,
    AlmacenComponent,
    AgregarProductoComponent,
    ModificarProductoComponent,
    EscuelasComponent,
    AgregarEscuelaComponent,
    ModificarEscuelaComponent,
    RecursosHumanosComponent,
    AgregarEmpleadoComponent,
    ModificarEmpleadoComponent,
    CuentasPorCobrarComponent,
    CuentasVendedorComponent,
    AsignarFoliosEmpleadoComponent,
    UsuariosComponent,
    // Directivas
    UppercaseDirective,
    OnlyNumbersDirective,
    DebounceClickDirective,
    MaestrosComponent,
    AgregarMaestroComponent,
    ModificarMaestroComponent,
    ConfiguracionComponent,
    TemporadasComponent,
    ClientesComponent,
    ZonasComponent,
    FoliosComponent,
    VentasComponent,
    EntregasDevolucionesComponent,
    NuevaVentaComponent,
    ModificarVentaComponent,
    InventarioComponent,
    BloqueFoliosComponent,
    CuentasEscuelaComponent,
    CuentasMaestroComponent,
    ComisionesComponent,
    ComisionesVendedorComponent,
    ComisionesDirectorComponent,
    AbonoRapidoComponent,
    ComisionesLiderComponent,
    HistoryLiderComponent,
    HistoryDirectorComponent,
    HistoryVendedorComponent,
    ReporteVentaComponent,
    ReporteCuentasPorCobrarComponent,
    ReporteGananciasComponent,
    // Dialogs
  ],
  exports: [
    HomeComponent,
    AlmacenComponent,
    AgregarProductoComponent,
    ModificarProductoComponent,
    EscuelasComponent,
    AgregarEscuelaComponent,
    ModificarEscuelaComponent,
    RecursosHumanosComponent,
    AgregarEmpleadoComponent,
    ModificarEmpleadoComponent,
    CuentasPorCobrarComponent,
    CuentasVendedorComponent,
    AsignarFoliosEmpleadoComponent,
    UsuariosComponent,
    AgregarMaestroComponent,
    ModificarMaestroComponent,
    UppercaseDirective,
    OnlyNumbersDirective,
    DebounceClickDirective
  ],
  imports: [
    SharedModule,
    MaterialModule,
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
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
