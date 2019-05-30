import {RouterModule, Routes} from '@angular/router';
import {PagesComponent} from './pages.component';
import {LoginGuardGuard} from '../services/guards/login-guard.guard';
import {MENU_ROUTES} from './menu.routes';


const pagesRoutes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: MENU_ROUTES
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
