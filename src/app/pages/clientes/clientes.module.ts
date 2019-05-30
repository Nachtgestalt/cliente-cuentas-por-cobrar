import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaestrosComponent} from './maestros/maestros.component';
import {AgregarMaestroComponent} from './maestros/agregar-maestro/agregar-maestro.component';
import {ModificarMaestroComponent} from './maestros/modificar-maestro/modificar-maestro.component';
import {EscuelasComponent} from './escuelas/escuelas.component';
import {AgregarEscuelaComponent} from './escuelas/agregar-escuela/agregar-escuela.component';
import {ModificarEscuelaComponent} from './escuelas/modificar-escuela/modificar-escuela.component';
import {MaterialModule} from '../../material.module';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {CLIENTES_ROUTES} from './clientes.routes';
import {ClientesComponent} from './clientes.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule.forChild(CLIENTES_ROUTES)
  ],
  declarations: [
    ClientesComponent,
    EscuelasComponent,
    AgregarEscuelaComponent,
    ModificarEscuelaComponent,
    MaestrosComponent,
    AgregarMaestroComponent,
    ModificarMaestroComponent,
  ]
})
export class ClientesModule { }
