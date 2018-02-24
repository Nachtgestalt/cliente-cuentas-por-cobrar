import {RouterModule, Routes} from "@angular/router";

import {ClientesComponent} from "./clientes/clientes.component";
import {PagesComponent} from "./pages.component";
import {HomeComponent} from "./home/home.component";
import {AlmacenComponent} from "./almacen/almacen.component";
import {AgregarComponent} from "./almacen/agregar/agregar.component";
import {ModificarComponent} from "./almacen/modificar/modificar.component";
import {AgregarClienteComponent} from "./clientes/agregar-cliente/agregar-cliente.component";
import {ModificarClienteComponent} from "./clientes/modificar-cliente/modificar-cliente.component";


const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {
        path: 'almacen',
        component: AlmacenComponent,
        children:  [
          {path: 'producto', component: AgregarComponent},
          {path: 'productos', component: ModificarComponent},
          {path: '', redirectTo: 'producto', pathMatch: 'full'}
        ]
      },
      {
        path: 'clientela',
        component: ClientesComponent,
        children: [
          {path: 'cliente', component: AgregarClienteComponent},
          {path: 'clientes', component: ModificarClienteComponent},
          {path: '', redirectTo: 'cliente', pathMatch: 'full'}
        ]
      },
      {path: '', redirectTo: '/home', pathMatch: 'full'}
    ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
