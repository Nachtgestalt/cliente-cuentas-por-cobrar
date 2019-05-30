import {Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';

export const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'administracion', loadChildren: './hacienda/hacienda.module#HaciendaModule'},
  {path: 'produccion', loadChildren: './pages/pages.module#PagesModule'},
  // {path: '**', component: NopagefoundComponent}
];
