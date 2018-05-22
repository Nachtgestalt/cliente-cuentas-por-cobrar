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
import { Graficas1Component } from './pages/graficas1/graficas1.component';


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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProgressComponent,
    Graficas1Component,
    DeleteVendedorDialogComponent,
    DeleteProductoDialogComponent,
    DeleteEscuelaDialogComponent,
    DeleteProfesorDialogComponent,
    DeleteFolioDialogComponent,
    AddTemporadaComponent,
    AddZonaDialogComponent,
    AddFolioDialogComponent
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
    AddFolioDialogComponent
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
