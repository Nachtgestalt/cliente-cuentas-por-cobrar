import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ALMACEN_ROUTES} from './almacen.routes';
import {AgregarProductoComponent} from './agregar-producto/agregar-producto.component';
import {ModificarProductoComponent} from './modificar-producto/modificar-producto.component';
import {AlmacenComponent} from './almacen.component';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterModule.forChild(ALMACEN_ROUTES)
  ],
  declarations: [
    AlmacenComponent,
    AgregarProductoComponent,
    ModificarProductoComponent,
  ]
})
export class AlmacenModule {
}
