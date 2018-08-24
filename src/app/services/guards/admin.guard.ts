import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor( public _userService: UserService ){}

  canActivate() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user.role === 'ADMIN_ROLE' || user.role === 'ALMACEN_ROLE') {
      return true;
    } else {
      console.log('Bloqueado por el admin guard');
      return false;
    }
  }
}
