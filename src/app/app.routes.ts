import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./components/home/home.component";
import {AlmacenComponent} from "./components/almacen/almacen.component";

import {ALMACEN_ROUTES} from "./components/almacen/almacen.routes";

const APP_ROUTES: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'almacen',
    component: AlmacenComponent,
    children : ALMACEN_ROUTES
  },
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
