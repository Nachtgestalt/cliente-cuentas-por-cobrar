import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComisionesComponent} from './comisiones.component';
import {ComisionesVendedorComponent} from './comisiones-vendedor/comisiones-vendedor.component';
import {ComisionesDirectorComponent} from './comisiones-director/comisiones-director.component';
import {ComisionesLiderComponent} from './comisiones-lider/comisiones-lider.component';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {COMISIONES_ROUTES} from './comisiones.routes';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterModule.forChild(COMISIONES_ROUTES)
  ],
  declarations: [
    ComisionesComponent,
    ComisionesVendedorComponent,
    ComisionesDirectorComponent,
    ComisionesLiderComponent,
  ]
})
export class ComisionesModule { }
