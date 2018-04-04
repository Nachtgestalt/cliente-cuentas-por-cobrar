import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MaestroService} from '../../../services/maestro/maestro.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-agregar-maestro',
  templateUrl: './agregar-maestro.component.html',
  styleUrls: ['./agregar-maestro.component.css']
})
export class AgregarMaestroComponent implements OnInit {
  // Banderas de control
  active = true;
  productoActualizar = true;
  productoAgregado = false;

  forma: FormGroup;

  clave: string;

  productsAfterChangeEvent = [];

  constructor( private _maestroService: MaestroService,
               private router: Router,
               private route: ActivatedRoute) {
    this.route.params
      .subscribe(parametros => {
        this.clave = parametros['clave'];
        if (this.clave !== 'nuevo') {
          this.crearFormaActualizar();
          this.productoActualizar = false;
          this._maestroService.obtenerMaestro(this.clave)
            .subscribe(producto => {
              console.log(producto);
              this.forma.setValue(producto);
            });
        } else {
          this.productoActualizar = true;
          this.crearForma();
        }
      });
  }

  ngOnInit() {
  }

  crearForma() {
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'apellidos': new FormControl('', [Validators.required]),
      'telefono': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'escuela': new FormControl('', Validators.required)
    });
  }

  crearFormaActualizar() {
    this.forma = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'apellidos': new FormControl('', [Validators.required]),
      'telefono': new FormControl('', Validators.required),
      'email': new FormControl('', Validators.required),
      'escuela': new FormControl('', Validators.required)
    });
  }

  getErrorMessages() {
    return ' Campo requerido ';
  }

  agregar() {
    if (this.clave === 'nuevo') {
      this._maestroService.agregarMaestro(this.forma.value)
        .subscribe(res => {
          this.productoActualizar = true;
          this.forma.reset();
          this.active = false;
          swal('Maestro agregado', 'Maestro agregado con exito', 'success');
          setTimeout(() => this.active = true, 1000);
        });
    } else {
      this._maestroService.actualizarMaestro(this.forma.value, this.clave)
        .subscribe(res => {
          this.forma.reset();
          this.active = false;
          swal('Maestro actualizado', 'Maestro actualizado con exito', 'success');
          setTimeout(() => {
            this.router.navigate(['/maestro/maestros']);
          }, 1000);
        });
    }

  }
}
