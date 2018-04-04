import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Escuela} from '../../../interfaces/escuela.interface';
import {Director} from "../../../interfaces/director.interface";
import {ActivatedRoute, Router} from "@angular/router";
import {EscuelaService} from "../../../services/escuela/escuela.service";


@Component({
  selector: 'app-agregar-escuela',
  templateUrl: './agregar-escuela.component.html',
  styleUrls: ['./agregar-escuela.component.css']
})
export class AgregarEscuelaComponent implements OnInit {

  active = true;
  vendedorAgregado = false;
  forma: FormGroup;
  escuelaActualizar = true;

  clave: string;

  escuela: Escuela = {
    clave: '',
    nombre: '',
    turno: '',
    direccion: '',
    colonia: '',
    codigoPostal: '',
    estado: '',
    municipio: '',
    telefono: '',
    email: '',
    director: {
      nombre: '',
      apellidos: '',
      telefono: '',
      email: ''
    }
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
    {value: 'San Luis Potosí', viewValue: 'San Luis Potosí'},
    {value: 'Sinaloa', viewValue: 'Sinaloa'},
    {value: 'Sonora', viewValue: 'Sonora'},
    {value: 'Tabasco', viewValue: 'Tabasco'},
    {value: 'Tamaulipas', viewValue: 'Tamaulipas'},
    {value: 'Tlaxcala', viewValue: 'Tlaxcala'},
    {value: 'Veracruz', viewValue: 'Veracruz'},
    {value: 'Yucatán', viewValue: 'Yucatán'},
    {value: 'Zacatecas', viewValue: 'Zacatecas'},
  ];

  constructor(private  _escuelaService: EscuelaService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params
      .subscribe(parametros => {
        this.clave = parametros['clave'];
        if (this.clave !== 'nuevo') {
          this.crearFormaActualizar();
          this.escuelaActualizar = false;
          this._escuelaService.obtenerEscuela(this.clave)
            .subscribe(escuela => {
              console.log(escuela);
              this.forma.setValue(this.escuela);
            });
        } else {
          this.escuelaActualizar = true;
          this.crearForma();
        }
      });
  }

  ngOnInit() {
  }

  crearForma() {
    this.forma = new FormGroup({
      'clave': new FormControl('', [Validators.required]),
      'nombre': new FormControl('', [Validators.required]),
      'turno': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'colonia': new FormControl('', Validators.required),
      'codigoPostal': new FormControl('', Validators.required),
      'estado': new FormControl('', Validators.required),
      'municipio': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'director': new FormGroup({
        'nombre': new FormControl('', Validators.required),
        'apellidos': new FormControl('', Validators.required),
        'telefono': new FormControl('', Validators.required),
        'email': new FormControl('', Validators.required)
      })
    });
  }

  // Funcion creada para omitir los validadores asincronos.
  crearFormaActualizar() {
    this.forma = new FormGroup({
      'clave': new FormControl('', [Validators.required]),
      'nombre': new FormControl('', [Validators.required]),
      'turno': new FormControl('', Validators.required),
      'direccion': new FormControl('', Validators.required),
      'colonia': new FormControl('', Validators.required),
      'codigoPostal': new FormControl('', Validators.required),
      'estado': new FormControl('', Validators.required),
      'municipio': new FormControl('', Validators.required),
      'telefono': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'director': new FormGroup({
        'nombre': new FormControl('', Validators.required),
        'apellidos': new FormControl('', Validators.required),
        'telefono': new FormControl('', Validators.required),
        'email': new FormControl('', Validators.required)
      })
    });
  }

  agregar() {
    console.log(this.forma.value);
    if (this.clave === 'nuevo') {
      this._escuelaService.agregarEscuela(this.forma.value)
        .subscribe(res => {
          this.escuelaActualizar = true;
          this.forma.reset();
          this.active = false;
          swal('Escuela agregada', 'Escuela agregado con exito', 'success');
          setTimeout(() => this.active = true, 1000);
        });
    } else {
      this._escuelaService.actualizarEscuela(this.forma.value, this.clave)
        .subscribe(res => {
          this.forma.reset();
          this.active = false;
          swal('Escuela actualizada', 'Escuela actualizada con exito', 'success');
          setTimeout(() => {
            this.router.navigate(['/almacen/productos']);
          }, 1000);
        });
    }
  }

  getErrorMessages() {
    return ' Campo requerido ';
  }
}
