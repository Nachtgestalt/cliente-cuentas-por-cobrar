import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from '../user/user.service';

@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(public _userService: UserService,
              public router: Router) {}

  canActivate() {

    if (this._userService.estaLogueado()) {
      console.log('Paso el guard');
      return true;
    } else {
      console.log('Bloqueado por el guard');
      this.router.navigate(['/login'])
      return false;
    }
  }
}
