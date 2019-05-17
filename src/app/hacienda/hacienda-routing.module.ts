import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  { path: 'dashboard', loadChildren: '../hacienda/hacienda.module#HaciendaModule'}
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class HaciendaRoutingModule {
}
