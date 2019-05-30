import {Routes} from '@angular/router';
import {AlmacenComponent} from './almacen.component';
import {AgregarProductoComponent} from './agregar-producto/agregar-producto.component';
import {ModificarProductoComponent} from './modificar-producto/modificar-producto.component';

export const ALMACEN_ROUTES: Routes = [
  {
    path: '', component: AlmacenComponent,
    children: [
      {path: '', redirectTo: 'producto/nuevo', pathMatch: 'full'},
      {path: 'producto', component: AgregarProductoComponent, data: {titulo: 'Almacen'}},
      {path: 'producto/:clave', component: AgregarProductoComponent, data: {titulo: 'Almacen'}},
      {path: 'productos', component: ModificarProductoComponent, data: {titulo: 'Almacen - Modificar producto'}}
    ],
    data: {titulo: 'Almacen'}
  },
];
