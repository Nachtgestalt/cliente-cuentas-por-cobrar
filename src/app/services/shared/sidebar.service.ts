import { Injectable } from '@angular/core';
import {UserService} from '../user/user.service';

@Injectable()
export class SidebarService {

  menu: any;
  user: any;

  constructor( private _userService: UserService) {}

  loadSidebarMenu() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.menu = this.user.menuSidebar;
  }
}
