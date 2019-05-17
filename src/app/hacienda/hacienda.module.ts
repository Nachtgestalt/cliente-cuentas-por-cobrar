import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrincipalComponent} from './principal/principal.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material.module';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardHComponent} from './dashboard-h/dashboard-h.component';
import {InventarioComponent} from './inventario/inventario.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from '../services/interceptors/token-interceptor.service';
import {CatchInterceptorService} from '../services/interceptors/catch-interceptor.service';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {path: '', redirectTo: 'inicio',  pathMatch: 'full'},
      {path: 'inicio', component: DashboardHComponent},
      {path: 'inventario', component: InventarioComponent, data: {titulo: 'Inventario'}},
      // {path: 'lineup', loadChildren: '../lineup/lineup.module#LineupPageModule'},
      // {path: 'score', loadChildren: '../score/score.module#ScorePageModule'},
      // {path: 'bet', loadChildren: '../bet/bet.module#BetPageModule'},
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [PrincipalComponent, DashboardHComponent, InventarioComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CatchInterceptorService,
      multi: true
    },
  ]
})
export class HaciendaModule {
}
