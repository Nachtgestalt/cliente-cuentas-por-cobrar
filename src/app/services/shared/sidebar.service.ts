import {Injectable} from '@angular/core';
import {UserService} from '../user/user.service';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class SidebarService {

  menu: any;
  user: any;
  private componentSource = new BehaviorSubject(null);
  currentComponent = this.componentSource.asObservable();

  constructor() {
  }

  loadSidebarMenu() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.menu = this.user.menuSidebar;
  }

  changeComponent(component) {
    this.componentSource.next(component);
  }

}
