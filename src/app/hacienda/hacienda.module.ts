import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PrincipalComponent} from './principal/principal.component';
import {SharedModule} from '../shared/shared.module';
import {MaterialModule} from '../material.module';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DashboardHComponent} from './dashboard-h/dashboard-h.component';
import {InventarioComponent} from './inventario/inventario.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptorService} from '../services/interceptors/token-interceptor.service';
import {CatchInterceptorService} from '../services/interceptors/catch-interceptor.service';
import {AgregarStockComponent} from './inventario/agregar-stock/agregar-stock.component';
import {DirectivesModule} from '../directives/directives.module';
import {HACIENDA_ROUTES} from './hacienda.routes';
import {AlmacenComponent} from './almacen/almacen.component';

const routes: Routes = [
  {
    path: '',
    component: PrincipalComponent,
    children: [
      {path: '', redirectTo: 'inicio', pathMatch: 'full'},
      {path: 'inicio', component: DashboardHComponent},
      {path: 'inventario', component: InventarioComponent, data: {titulo: 'Inventario'}},
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
    DirectivesModule,
    ReactiveFormsModule,
    RouterModule.forChild(HACIENDA_ROUTES),
  ],
  entryComponents: [
    AgregarStockComponent
  ],
  declarations: [
    PrincipalComponent,
    DashboardHComponent,
    InventarioComponent,
    AgregarStockComponent,
    AlmacenComponent,
  ],
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
