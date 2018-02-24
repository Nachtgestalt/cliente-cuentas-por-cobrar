import {RouterModule, Routes} from "@angular/router";

import { LoginComponent } from "./login/login.component";
import {NopagefoundComponent} from "./shared/nopagefound/nopagefound.component";

const APP_ROUTES: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '**', component: NopagefoundComponent}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);
