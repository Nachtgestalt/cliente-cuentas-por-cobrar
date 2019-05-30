import {Routes} from '@angular/router';
import {PrincipalComponent} from './principal/principal.component';
import {MENU_HACIENDA_ROUTES} from './menu.routes';

export const HACIENDA_ROUTES: Routes = [
  {
    path: '', component: PrincipalComponent,
    children: MENU_HACIENDA_ROUTES
  }
];
