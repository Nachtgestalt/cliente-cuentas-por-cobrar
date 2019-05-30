import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';

export const APP_ROUTES: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent},
  {path: 'administracion', loadChildren: './hacienda/hacienda.module#HaciendaModule'},
  {path: 'produccion', loadChildren: './pages/pages.module#PagesModule'},
  // {path: 'administracion', loadChildren: () => import('./hacienda/hacienda.module').then(m => m.HaciendaModule)},
  // {path: 'produccion', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  // {path: '**', component: NopagefoundComponent}
];
