import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";


import {NavbarComponent} from "./navbar/navbar.component";
import {NopagefoundComponent} from "./nopagefound/nopagefound.component";
import {BreadcrumbsComponent} from "./breadcrumbs/breadcrumbs.component";
import { MaterialModule } from "../material.module";
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NopagefoundComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ],
  exports: [
    NavbarComponent,
    NopagefoundComponent,
    BreadcrumbsComponent,
    SidebarComponent
  ],
  imports: [
    MaterialModule,
    RouterModule,
    BrowserModule,
    CommonModule
  ]
}) export class SharedModule{}
