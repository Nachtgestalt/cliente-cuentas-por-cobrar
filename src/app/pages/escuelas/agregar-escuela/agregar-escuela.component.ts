import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {Escuela} from '../../../interfaces/escuela.interface';
import {Director} from '../../../interfaces/director.interface';
import {ActivatedRoute, Router} from '@angular/router';
import {EscuelaService} from '../../../services/escuela/escuela.service';
import {ZonaService} from '../../../services/zona/zona.service';
import {Vendedor} from '../../../interfaces/vendedor.interface';
import {Zona} from '../../../interfaces/zona.interface';


@Component({
  selector: 'app-agregar-escuela',
  templateUrl: './agregar-escuela.component.html',
  styleUrls: ['./agregar-escuela.component.css']
})
export class AgregarEscuelaComponent implements OnInit {

  active = true;
  escuelaActualizar = true;

  forma: FormGroup;

  clave: string;

  maestros = [];

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
      iddirector: null,
      nombre: '',
      apellidos: '',
      telefono: '',
      email: ''
    },
    profesores: null,
    zona: {
      idzona: '',
      vendedor: null
    }
  };

  zonaSelect: Zona[];


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
              private route: ActivatedRoute,
              private _zonaService: ZonaService) {
    this.route.params
      .subscribe(parametros => {
        this.clave = parametros['clave'];
        if (this.clave !== 'nuevo') {
          this.crearFormaActualizar();
          this.escuelaActualizar = false;
          this._escuelaService.obtenerEscuela(this.clave)
            .subscribe((escuela: Escuela) => {
              console.log(escuela);
              this.forma.setValue(escuela);
              console.log(this.forma.value);
            });
        } else {
          this.escuelaActualizar = true;
          this.crearForma();
        }
      });
  }

  ngOnInit() {
    this._zonaService.getZonas()
      .subscribe( (res: Zona[]) => {
        this.zonaSelect = res;
      });
  }

  crearForma() {
    this.forma = new FormGroup({
      'zona': new FormControl('', [Validators.required]),
      'clave': new FormControl('', [Validators.required], this.validarClave.bind(this)),
      'nombre': new FormControl('', [Validators.required]),
      'turno': new FormControl(''),
      'direccion': new FormControl(''),
      'colonia': new FormControl(''),
      'codigoPostal': new FormControl(''),
      'estado': new FormControl(''),
      'municipio': new FormControl(''),
      'telefono': new FormControl(''),
      'email': new FormControl(''),
      'director': new FormGroup({
        'iddirector': new FormControl(''),
        'nombre': new FormControl(''),
        'apellidos': new FormControl(''),
        'telefono': new FormControl(''),
        'email': new FormControl('')
      }),
      'profesores': new FormControl(null)
    });
  }

  // Funcion creada para omitir los validadores asincronos.
  crearFormaActualizar() {
    this.forma = new FormGroup({
      'zona': new FormControl('', [Validators.required]),
      'clave': new FormControl('', [Validators.required]),
      'nombre': new FormControl('', [Validators.required]),
      'turno': new FormControl(''),
      'direccion': new FormControl(''),
      'colonia': new FormControl(''),
      'codigoPostal': new FormControl(''),
      'estado': new FormControl(''),
      'municipio': new FormControl(''),
      'telefono': new FormControl(''),
      'email': new FormControl(''),
      'director': new FormGroup({
        'iddirector': new FormControl(''),
        'nombre': new FormControl(''),
        'apellidos': new FormControl(''),
        'telefono': new FormControl(''),
        'email': new FormControl('')
      }),
      'profesores': new FormControl(null)
    });
  }

  agregar() {
    this.escuela = this.forma.value;
    // console.log(this.escuela);
    if (this.clave === 'nuevo') {
      this._escuelaService.agregarEscuela(this.escuela)
        .subscribe(res => {
          this.escuelaActualizar = true;
          this.forma.reset();
          this.active = false;
          swal('Escuela agregada', 'Escuela agregado con exito', 'success');
          setTimeout(() => {
            this.active = true;
          }, 1000);
        });
    } else {
      this._escuelaService.actualizarEscuela(this.forma.value)
        .subscribe(res => {
          this.forma.reset();
          this.active = false;
          swal('Escuela actualizada', 'Escuela actualizada con exito', 'success');
          setTimeout(() => {
            this.active = true;
            this.router.navigate(['/clientes/escuelas/lista']);
          }, 1000);
        });
    }
  }

  getErrorMessages() {
    return ' Campo requerido ';
  }


  validarClave(control: AbstractControl) {
    return this._escuelaService.existeClave(control.value)
      .map(
        res => {
          return res ? {existeClave: true} : null;
        });

  }
}
