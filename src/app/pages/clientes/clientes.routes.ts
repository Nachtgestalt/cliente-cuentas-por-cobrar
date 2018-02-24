import { RouterModule, Routes } from "@angular/router";
import { AgregarClienteComponent } from "./agregar-cliente/agregar-cliente.component";
import { ModificarClienteComponent } from "./modificar-cliente/modificar-cliente.component";

export const CLIENTES_ROUTES: Routes = [
  {path: 'cliente', component: AgregarClienteComponent},
  {path: 'clientes', component: ModificarClienteComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'cliente'}
];
