import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgregarEmpleadoComponent} from './agregar-empleado/agregar-empleado.component';
import {ModificarEmpleadoComponent} from './modificar-empleado/modificar-empleado.component';
import {AsignarFoliosEmpleadoComponent} from './asignar-folios-empleado/asignar-folios-empleado.component';
import {RecursosHumanosComponent} from './recursos-humanos.component';
import {BloqueFoliosComponent} from './bloque-folios/bloque-folios.component';
import {ZonasComponent} from './zonas/zonas.component';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {RECURSOS_HUMANOS_ROUTES} from './recursos-humanos.routes';
import {DirectivesModule} from '../../directives/directives.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    DirectivesModule,
    RouterModule.forChild(RECURSOS_HUMANOS_ROUTES)
  ],
  declarations: [
    RecursosHumanosComponent,
    AgregarEmpleadoComponent,
    ModificarEmpleadoComponent,
    AsignarFoliosEmpleadoComponent,
    BloqueFoliosComponent,
    ZonasComponent,
  ]
})
export class RecursosHumanosModule { }
