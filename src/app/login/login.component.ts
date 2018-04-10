import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {User} from '../interfaces/user.interfaces';
import {UserService} from '../services/service.index';
import {Title} from '@angular/platform-browser';

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
    return this.formulario.value.username.hasError('required') ? 'Introduce tu usuario' :
        '';
  }

  constructor(private _userService: UserService,
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
          .subscribe((data: any) => {
            this._userService.setInStorage(resp, data);
            this.router.navigate(['/home']);
          });
      },
      error => {
        swal('Error al iniciar sesión', 'Usuario y/o contraseña invalidos', 'error');
        console.log(error);
      });
  }
}
