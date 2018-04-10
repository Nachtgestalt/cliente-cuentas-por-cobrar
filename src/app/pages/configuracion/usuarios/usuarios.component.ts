import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { VendedorService } from '../../../services/vendedor/vendedor.service';
import {UserService} from '../../../services/user/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  forma: FormGroup;

  roles = [
    {value: 'ADMIN_ROLE', viewValue: 'Administrador'},
    {value: 'VENDOR_ROLE', viewValue: 'Vendedor'},
    {value: 'HACIENDA_ROLE', viewValue: 'Hacienda'}
  ];

  constructor(private  _userService: UserService, private _vendedorService: VendedorService) {
    this.forma = new FormGroup({
      'username': new FormControl('', Validators.required, this.validarUsername.bind(this)),
      'password': new FormControl('', Validators.required),
      'role': new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  agregar() {
    this._userService.agregarUsuario(this.forma.value)
      .subscribe(res => {
        console.log(res);
      });
  }

  validarUsername(control: AbstractControl) {
    return this._vendedorService.existeUsername(control.value)
      .map(res => {
        console.log(res);
        return res ? {existeUsername: true} : null;
      });
  }

  getErrorMessages() {
    return ' Campo requerido ';
  }

}
