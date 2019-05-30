import {Routes} from '@angular/router';
import {ClientesComponent} from './clientes.component';
import {EscuelasComponent} from './escuelas/escuelas.component';
import {AgregarEscuelaComponent} from './escuelas/agregar-escuela/agregar-escuela.component';
import {ModificarEscuelaComponent} from './escuelas/modificar-escuela/modificar-escuela.component';
import {MaestrosComponent} from './maestros/maestros.component';
import {AgregarMaestroComponent} from './maestros/agregar-maestro/agregar-maestro.component';
import {ModificarMaestroComponent} from './maestros/modificar-maestro/modificar-maestro.component';

export const CLIENTES_ROUTES: Routes = [
  {
    path: '',
    component: ClientesComponent,
    children: [
      {
        path: 'escuelas',
        component: EscuelasComponent,
        children: [
          {path: '', redirectTo: 'escuela/nuevo', pathMatch: 'full'},
          {path: 'escuela/:clave', component: AgregarEscuelaComponent, data: {titulo: 'Escuela'}},
          {path: 'lista', component: ModificarEscuelaComponent, data: {titulo: 'Escuela - Modificar escuela'}}
        ],
        data: {titulo: 'Escuelas'}
      },
      {
        path: 'maestros',
        component: MaestrosComponent,
        children: [
          {path: 'maestro/:clave', component: AgregarMaestroComponent, data: {titulo: 'Maestros'}},
          {path: 'lista', component: ModificarMaestroComponent, data: {titulo: 'Maestro - Modificar maestro'}},
          {path: '', redirectTo: 'maestro/nuevo', pathMatch: 'full'}
        ],
        data: {titulo: 'Maestros'}
      },
      {path: '**', redirectTo: 'escuelas', pathMatch: 'full'}
    ],
    data: {titulo: 'Clientes'}
  },
];
