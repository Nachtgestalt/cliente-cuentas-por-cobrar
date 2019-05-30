import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../interfaces/user.interfaces';
import {UserService} from '../services/service.index';
import {Title} from '@angular/platform-browser';
import {TemporadaService} from '../services/temporada/temporada.service';
import {forkJoin} from 'rxjs';
import {map, mergeMap} from 'rxjs/operators';
import swal from 'sweetalert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public errorMessage = '';

  formulario: FormGroup;

  user: User = {
    username: '',
    password: '',
    role: ''
  };

  getErrorMessage() {
    return ' Campo requerido ';
  }

  constructor(private _userService: UserService,
              public _temporadaService: TemporadaService,
              private router: Router,
              public _title: Title) {
    this._title.setTitle('Leirem - Login');
  }

  ngOnInit() {
    this.formulario = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this._userService.autenticar(this.formulario.value)
      .pipe(
        map(token => {
          console.log(token);
          this._userService.setTokenInStorage(token);
          return token;
        }),
        mergeMap(tokenRes =>
          forkJoin(
            this._userService.obtenerUsuario(this.formulario.value)
              .pipe(
                map((res: any) => {
                  console.log(res);
                  return res;
                })
              ),
            this._temporadaService.getCurrentSeason()
              .pipe(
                map((res: any) => {
                  return res;
                })
              )
          )
        ))
      .subscribe((res: any) => {
          console.log(res);
          this._userService.setInStorage(res[0]);
          this._userService.setSeasonInStorage(res[1]);
          if (res[0].role === 'HACIENDA_ROLE') {
            this.router.navigate(['/administracion']);
          } else {
            this.router.navigate(['/produccion']);
          }
        },
        error => {
          swal('Error al iniciar sesión', 'Usuario y/o contraseña invalidos', 'error');
        }
      );
  }
}
