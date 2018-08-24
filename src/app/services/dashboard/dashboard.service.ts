import { Injectable } from '@angular/core';
import {UserService} from '../user/user.service';

@Injectable()
export class DashboardService {
  menu: any = [];
  user: any;

  constructor( private _userService: UserService) {}

  loadMenu() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.menu = this.user.menuDashboard;
  }

}
