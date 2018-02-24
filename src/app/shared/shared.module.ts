import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";


import {NavbarComponent} from "./navbar/navbar.component";
import {NopagefoundComponent} from "./nopagefound/nopagefound.component";
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import {MaterialModule} from "../material.module";


@NgModule({
  declarations: [
    NavbarComponent,
    NopagefoundComponent,
    BreadcrumbsComponent
  ],
  exports: [
    NavbarComponent,
    NopagefoundComponent,
    BreadcrumbsComponent
  ],
  imports: [
    MaterialModule,
    RouterModule,
    BrowserModule
  ]
}) export class SharedModule{}
