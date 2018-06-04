import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators, AbstractControl} from '@angular/forms';

import {VendedorService} from '../../../services/vendedor/vendedor.service';
import {Vendedor} from '../../../interfaces/vendedor.interface';
import {ActivatedRoute, Router} from '@angular/router';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-agregar-empleado',
  templateUrl: './agregar-empleado.component.html',
  styleUrls: ['./agregar-empleado.component.css']
})
export class AgregarEmpleadoComponent implements OnInit {
  active: boolean = true;
  vendedorAgregado = false;
  forma: FormGroup;
  empleadoActualizar = true;

  clave: string;

  vendedor: Vendedor = {
    clave: '',
    nombre: '',
    apellidos: '',
    rfc: '1234',
    telefono: '',
    email: '',
    direccion: '',
    colonia: '',
    codigo_postal: '',
    estado: '',
    municipio: '',
    zonas: null
  };

  estados = [
    {value: 'Aguascalientes', viewValue: 'Aguascalientes'},
    {value: 'Baja California', viewValue: 'Baja California'},
    {value: 'Baja California Sur', viewValue: 'Baja California Sur'},
    {value: 'Campeche', viewValue: 'Campeche'},
    {value: 'Coahuila', viewValue: 'Coahuila'},
    {value: 'Colima', viewValue: 'Colima'},
    {value: 'Chiapas', viewValue: 'Chiapas'},
    {value: 'Chihuhua', viewValue: 'Chihuhua'},
    {value: 'CDMX', viewValue: 'CDMX'},
    {value: 'Durango', viewValue: 'Durango'},
    {value: 'Guanajuato', viewValue: 'Guanajuato'},
    {value: 'Guerrero', viewValue: 'Guerrero'},
    {value: 'Hidalgo', viewValue: 'Hidalgo'},
    {value: 'Jalisco', viewValue: 'Jalisco'},
    {value: 'México', viewValue: 'México'},
    {value: 'Michoacán', viewValue: 'Michoacán'},
    {value: 'Morelos', viewValue: 'Morelos'},
    {value: 'Nayarit', viewValue: 'Nayarit'},
    {value: 'Nuevo León', viewValue: 'Nuevo León'},
    {value: 'Oaxaca', viewValue: 'Oaxaca'},
    {value: 'Puebla', viewValue: 'Puebla'},
    {value: 'Querétaro', viewValue: 'Querétaro'},
    {value: 'Quintana Roo', viewValue: 'Quintana Roo'},
    {value: 'San Luis Potosí', viewValue: 'Sna Luis Potosí'},
    {value: 'Sinaloa', viewValue: 'Sinaloa'},
    {value: 'Sonora', viewValue: 'Sonora'},
    {value: 'Tabasco', viewValue: 'Tabasco'},
    {value: 'Tamaulipas', viewValue: 'Tamaulipas'},
    {value: 'Tlaxcala', viewValue: 'Tlaxcala'},
    {value: 'Veracruz', viewValue: 'Veracruz'},
    {value: 'Yucatán', viewValue: 'Yucatán'},
    {value: 'Zacatecas', viewValue: 'Zacatecas'},
  ];

  constructor(private  _vendedorService: VendedorService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params
      .subscribe(parametros => {
        this.clave = parametros['clave'];
        if (this.clave !== 'nuevo') {
          this.crearFormActualizar();
          this.empleadoActualizar = false;
          this._vendedorService.obtenerVendedor(this.clave)
            .subscribe(vendedor => {
              console.log(vendedor);
              this.forma.setValue(vendedor);
            });
        } else {
          this.empleadoActualizar = true;
          this.crearForma();
        }
      });
  }

  ngOnInit() {
  }

  crearForma() {
    this.forma = new FormGroup({
      'clave': new FormControl('', [Validators.required, Validators.nullValidator], this.validarClave.bind(this)),
      'nombre': new FormControl('', Validators.required),
      'apellidos': new FormControl('', Validators.required),
      'rfc': new FormControl('', [Validators.required, Validators.nullValidator], this.validarRfc.bind(this)),
      'telefono': new FormControl(''),
      'email': new FormControl('', null, this.validarEmail.bind(this)),
      'direccion': new FormControl('', Validators.required),
      'colonia': new FormControl('', Validators.required),
      'codigo_postal': new FormControl('', [Validators.maxLength(5)]),
      'estado': new FormControl('', Validators.required),
      'municipio': new FormControl('', Validators.required),
    });
  }

  crearFormActualizar() {
    this.forma = new FormGroup({
      'clave': new FormControl('', Validators.required),
      'nombre': new FormControl('', Validators.required),
      'apellidos': new FormControl('', Validators.required),
      'rfc': new FormControl('', null),
      'telefono': new FormControl(''),
      'email': new FormControl('', null),
      'direccion': new FormControl('', Validators.required),
      'colonia': new FormControl('', Validators.required),
      'codigo_postal': new FormControl('', [Validators.maxLength(5)]),
      'estado': new FormControl('', Validators.required),
      'municipio': new FormControl('', Validators.required),
    });
  }

  agregar() {
    if (this.clave === 'nuevo') {
      this._vendedorService.agregarUsuario(this.forma.value)
        .subscribe(res => {
          console.log(res);
          this.vendedorAgregado = true;
          this.forma.reset();
          this.active = false;
          swal('Vendedor agregado', 'Vendedor agregado con exito', 'success');
          setTimeout(() => this.active = true, 1000);
        });
    } else {
      this._vendedorService.actualizarVendedor(this.forma.value, this.clave)
        .subscribe(res => {
          console.log('esta madre se actualizo!');
          this.forma.reset();
          this.active = false;
          swal('Vendedor actualizado', 'Vendedor actualizado con exito', 'success');
          setTimeout(() => {
            this.router.navigate(['/nomina/empleados']);
          }, 1000);
        });
    }
  }

  validarClave(control: AbstractControl) {
    return this._vendedorService.existeClave(control.value)
      .map(res => {
        return res ? {existeClave: true} : null;
      });
  }

  validarRfc(control: AbstractControl) {
    return this._vendedorService.existeRfc(control.value)
      .map(res => {
        return res ? {existeRfc: true} : null;
      });
  }

  validarEmail(control: AbstractControl) {
    return this._vendedorService.existeEmail(control.value)
      .map(res => {
        return res ? {existeEmail: true} : null;
      });
  }

  getErrorMessages() {
    return ' Campo requerido ';
  }

}
