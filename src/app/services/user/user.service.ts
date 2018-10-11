import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/operators';
import {User} from '../../interfaces/user.interfaces';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {URL_SERVICIOS} from '../../config/config';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/internal/operators';

@Injectable()
export class UserService {
  usuarioURL = URL_SERVICIOS + '/users';
  token: string;
  user: any;

  constructor(public http: HttpClient,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.loadStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  setTokenInStorage(token: string) {
    localStorage.setItem('token', token);
  }

  setInStorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  setSeasonInStorage(season: any) {
    localStorage.setItem('season', JSON.stringify(season));
  }

  loadStorage () {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.user = null;
    }
  }

  autenticar(user: User) {
    const url = URL_SERVICIOS + '/login';
    const body = JSON.stringify(user);

    return this.http.post(url, body, {observe: 'response'})
      .map((resp: HttpResponse<any>) => {
        this.token = resp.headers.get('authorization');
        return this.token;
      });
  }

  logout() {
    this.token = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('season')
    this.router.navigate(['/login']);
  }

  obtenerUsuario(user: User) {
    const url = URL_SERVICIOS + '/users/logincheck';
    const body = JSON.stringify(user);
    return this.http.post(url, body, {headers: {'Content-Type': 'application/json'}})
      .pipe(
        map( (res: any) => {
          switch (res.role) {
            case 'ADMIN_ROLE': {
              res.menuDashboard = [
                {
                  titulo: 'Ventas',
                  icono: 'fas fa-shopping-cart fa-4x',
                  url: '/ventas/nueva'
                },
                {
                  titulo: 'Confirmar pedidos',
                  icono: 'fas fa-clipboard-check fa-4x',
                  url: '/entregas'
                },
                {
                  titulo: 'Inventario',
                  icono: 'fas fa-box-open fa-4x',
                  url: '/inventario'
                },
                {
                  titulo: 'Recursos humanos',
                  icono: 'fas fa-user fa-4x',
                  url: '/nomina'
                },
                {
                  titulo: 'Productos',
                  icono: 'fas fa-barcode fa-4x',
                  url: '/almacen'
                },
                {
                  titulo: 'Clientes',
                  icono: 'fas fa-graduation-cap fa-4x',
                  url: '/clientes'
                },
                {
                  titulo: 'Cuentas por cobrar',
                  icono: 'fas fa-dollar-sign fa-4x',
                  url: '/cuentas'
                },
                {
                  titulo: 'Comisiones',
                  icono: 'fas fa-hand-holding-usd fa-4x',
                  url: '/comisiones'
                },
                {
                  titulo: 'Configuración',
                  icono: 'fa fa-cog fa-4x',
                  url: '/configuracion'
                }
              ];
              res.menuSidebar = [
                {
                  titulo: 'Inicio',
                  url: '/home'
                },
                {
                  titulo: 'Ventas',
                  icono: 'fas fa-shopping-cart mr-3',
                  url: '/ventas/nueva'
                },
                {
                  titulo: 'Confirmar pedidos',
                  icono: 'fas fa-clipboard-check mr-3',
                  url: '/entregas'
                },
                {
                  titulo: 'Inventario',
                  icono: 'fas fa-box-open mr-3',
                  url: '/inventario'
                },
                {
                  titulo: 'Recursos humanos',
                  icono: 'fas fa-user mr-3',
                  url: '/nomina'
                },
                {
                  titulo: 'Productos',
                  icono: 'fas fa-barcode mr-3',
                  url: '/almacen'
                },
                {
                  titulo: 'Clientes',
                  icono: 'fas fa-graduation-cap mr-3',
                  url: '/clientes'
                },
                {
                  titulo: 'Cuentas por cobrar',
                  icono: 'fas fa-dollar-sign mr-3',
                  url: '/cuentas'
                },
                {
                  titulo: 'Comisiones',
                  icono: 'fas fa-hand-holding-usd mr-3',
                  url: '/comisiones'
                },
                {
                  titulo: 'Configuración',
                  icono: 'fa fa-cog mr-3',
                  url: '/configuracion'
                },
              ];
              break;
            }
            case 'ALMACEN_ROLE': {
              res.menuDashboard = [
                {
                  titulo: 'Confirmar pedidos',
                  icono: 'fas fa-clipboard-check fa-4x',
                  url: '/entregas'
                }
                ];
              res.menuSidebar = [
                {
                  titulo: 'Confirmar pedidos',
                  icono: 'fas fa-clipboard-check mr-3',
                  url: '/entregas'
                }
                ];
              break;
            }
            case 'VENDOR_ROLE': {
              res.menuDashboard = [
                {
                  titulo: 'Ventas',
                  icono: 'fas fa-shopping-cart fa-4x',
                  url: '/ventas/nueva'
                },
                {
                  titulo: 'Productos',
                  icono: 'fas fa-barcode fa-4x',
                  url: '/almacen'
                },
                {
                  titulo: 'Clientes',
                  icono: 'fas fa-graduation-cap fa-4x',
                  url: '/clientes'
                }
              ];
              res.menuSidebar = [
                {
                  titulo: 'Inicio',
                  url: '/home'
                },
                {
                  titulo: 'Ventas',
                  icono: 'fas fa-shopping-cart mr-3',
                  url: '/ventas/nueva'
                },
                {
                  titulo: 'Productos',
                  icono: 'fas fa-barcode mr-3',
                  url: '/almacen'
                },
                {
                  titulo: 'Clientes',
                  icono: 'fas fa-graduation-cap mr-3',
                  url: '/clientes'
                }
              ];
              break;
            }
            case 'HACIENDA_ROLE': {
              res.menuDashboard = [
                {
                  titulo: 'Productos',
                  icono: 'fas fa-barcode fa-4x',
                  url: '/almacen'
                },
                {
                  titulo: 'Inventario',
                  icono: 'fas fa-box-open fa-4x',
                  url: '/stock'
                },
              ];
              res.menuSidebar = [
                {
                  titulo: 'Productos',
                  icono: 'fas fa-barcode mr-3',
                  url: '/almacen'
                },
                {
                  titulo: 'Inventario',
                  icono: 'fas fa-box-open mr-3',
                  url: '/stock'
                },
              ];
            }
          }
          console.log(res);
          return res;
        })
      );
  }

  agregarUsuario(user: User) {
    const url = URL_SERVICIOS + '/users/sign-up';
    const body = JSON.stringify(user);

    console.log(body);

    return this.http.post(url, body, {headers: {'Content-Type': 'application/json'}});
  }
}
