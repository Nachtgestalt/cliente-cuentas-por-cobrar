import {Routes} from '@angular/router';
import {RecursosHumanosComponent} from './recursos-humanos.component';
import {AgregarEmpleadoComponent} from './agregar-empleado/agregar-empleado.component';
import {ModificarEmpleadoComponent} from './modificar-empleado/modificar-empleado.component';
import {AsignarFoliosEmpleadoComponent} from './asignar-folios-empleado/asignar-folios-empleado.component';
import {ZonasComponent} from './zonas/zonas.component';
import {BloqueFoliosComponent} from './bloque-folios/bloque-folios.component';

export const RECURSOS_HUMANOS_ROUTES: Routes = [
  {
    path: '',
    component: RecursosHumanosComponent,
    children: [
      {path: '', redirectTo: 'empleado/nuevo', pathMatch: 'full'},
      {path: 'empleado', component: AgregarEmpleadoComponent, data: {titulo: 'Recursos humanos'}},
      {path: 'empleado/:clave', component: AgregarEmpleadoComponent, data: {titulo: 'Recursos humanos'}},
      {path: 'empleados', component: ModificarEmpleadoComponent, data: {titulo: 'Recursos humanos', subtitle: 'Modificar empleado'}},
      {path: 'folios', component: AsignarFoliosEmpleadoComponent, data: {titulo: 'Recursos humanos', subtitle: 'Asignar folios'}},
      {path: 'zonas', component: ZonasComponent, data: {titulo: 'Recursos humanos', subtitle: 'Zonas'}},
      {path: 'listar-folios', component: BloqueFoliosComponent, data: {titulo: 'Recursos humanos', subtitle: 'Bloque de folios'}}
    ],
  }
];
