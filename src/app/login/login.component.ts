import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from '../interfaces/user.interfaces';
import {UserService} from '../services/service.index';
import {Title} from '@angular/platform-browser';
import {TemporadaService} from '../services/temporada/temporada.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
      username: new FormControl('', Validators.required ),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this._userService.autenticar(this.formulario.value)
      .subscribe((resp: any) => {
        this._userService.obtenerUsuario(this.formulario.value)
          .subscribe(
            (data: any) => {
              this._userService.setInStorage(resp, data);
              this.router.navigate(['/home']);
            },
            error1 => {},
            () => {
              this._temporadaService.getCurrentSeason().subscribe(
                res => {
                  console.log(res);
                  this._userService.setSeasonInStorage(res);
                }
              );
            }
          );
      },
      error => {
        swal('Error al iniciar sesión', 'Usuario y/o contraseña invalidos', 'error');
        console.log(error);
      });
  }
}
