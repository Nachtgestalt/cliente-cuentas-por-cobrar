import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent implements OnInit {
  nombre = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.nombre.hasError('required') ? 'No puede estar vacio este campo' :
      this.nombre.hasError('nombre') ? 'Not a valid email' :
        '';
  }

  constructor() { }

  ngOnInit() {
  }

}
