import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';


import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MaterialModule} from "./material.module";
import {LayoutModule} from "@angular/cdk/layout";

//Rutas
import {APP_ROUTING} from "./app.routes";

//Componentes
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/shared/sidenav/sidenav.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AlmacenComponent } from './components/almacen/almacen.component';
import { AgregarComponent } from './components/almacen/agregar/agregar.component';

// Servicios
import { ProductosService } from './services/productos.service';
import { ModificarComponent } from './components/almacen/modificar/modificar.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    NavbarComponent,
    HomeComponent,
    AlmacenComponent,
    AgregarComponent,
    ModificarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    LayoutModule,
    APP_ROUTING
  ],
  providers: [
    ProductosService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
