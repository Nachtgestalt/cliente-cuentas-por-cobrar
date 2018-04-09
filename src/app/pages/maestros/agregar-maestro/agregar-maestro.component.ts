import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {MaestroService} from '../../../services/maestro/maestro.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EscuelaService} from '../../../services/escuela/escuela.service';
import {Escuela} from '../../../interfaces/escuela.interface';
import {Maestro} from '../../../interfaces/maestro.interface';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';

@Component({
  selector: 'app-agregar-maestro',
  templateUrl: './agregar-maestro.component.html',
  styleUrls: ['./agregar-maestro.component.css']
})
export class AgregarMaestroComponent implements OnInit{
  filteredStates: Observable<any[]>;
  // Banderas de control
  active = true;
  maestroActualizar = true;

  forma: FormGroup;

  clave: string;
  idProfesor: number;

  escuelas: Escuela[] = [];
  maestro: Maestro;

  escuelaSeleccionada: Escuela[] = null;

  filteredOptions: Observable<Escuela[]>;

  constructor( private _maestroService: MaestroService,
               private router: Router,
               private route: ActivatedRoute,
               private _escuelaService: EscuelaService) {

    this._escuelaService.getEscuelas()
      .subscribe( (escuelas: Escuela[]) => {
        this.escuelas = escuelas;
        console.log(this.escuelas);
      });

    this.route.params
      .subscribe(parametros => {
        this.clave = parametros['clave'];
        if (this.clave !== 'nuevo') {
          this.crearFormaActualizar();
          this.maestroActualizar = false;
          this.idProfesor = parseInt(this.clave);
          this._maestroService.obtenerMaestro(this.clave)
            .subscribe((maestro: Maestro) => {
              this.forma.setValue(maestro);
            });
        } else {
          this.maestroActualizar = true;
          this.crearForma();
        }
      });
  }

  ngOnInit() {
    this.filteredOptions = this.forma.get('escuelas').valueChanges
      .pipe(
        startWith<string | Escuela>(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this.filter(nombre) : this.escuelas.slice())
      );
  }

  filter(nombre: string): Escuela[] {
    return this.escuelas.filter(option =>
      option.clave.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }

  displayFn(escuela?: Escuela): string | undefined {
    return escuela ? escuela.nombre : undefined;
  }

  crearForma() {
    this.forma = new FormGroup({
      'idprofesor': new FormControl(''),
      'nombre': new FormControl('', [Validators.required]),
      'apellidos': new FormControl('', [Validators.required]),
      'telefono': new FormControl('', Validators.required),
      'escuelas': new FormArray([
        new FormControl('', Validators.required)
      ])
    });
  }

  crearFormaActualizar() {
    this.forma = new FormGroup({
      'idprofesor': new FormControl(''),
      'nombre': new FormControl('', [Validators.required]),
      'apellidos': new FormControl('', [Validators.required]),
      'telefono': new FormControl('', Validators.required),
      'escuelas': new FormArray([
        new FormControl('', Validators.required)
      ])
    });
  }

  getErrorMessages() {
    return ' Campo requerido ';
  }

  agregar() {
    let maestro: Maestro = this.forma.value;
    maestro.escuelas = [];
    this.escuelaSeleccionada = this.forma.get('escuelas').value;
    // this.escuelaSeleccionada[0].profesores = [];
    console.log(maestro);
    if (this.clave === 'nuevo') {
      this._maestroService.agregarMaestro(maestro)
        .subscribe((res: Maestro) => {
          console.log(this.escuelaSeleccionada[0]);
          this.escuelaSeleccionada[0].profesores.push(res);
          this._escuelaService.actualizarEscuela(this.escuelaSeleccionada[0])
            .subscribe(data => {
              this.maestroActualizar = true;
              this.forma.reset();
              this.active = false;
            });
          swal('Maestro agregado', 'Maestro agregado con exito', 'success');
          setTimeout(() => {
            this.active = true;
            // this.router.navigate(['/clientes/maestros']);
          }, 1000);
        });
    } else {
      this.forma.get('idprofesor').setValue(this.idProfesor);
      console.log(this.forma.value);
      this._maestroService.actualizarMaestro(this.forma.value)
        .subscribe((res: Maestro) => {
          console.log('Este maestro me regresa: ' + res);
          this.escuelaSeleccionada[0].profesores.push(res);
          this._escuelaService.actualizarEscuela(this.escuelaSeleccionada[0])
            .subscribe(data => {
              this.maestroActualizar = true;
              this.forma.reset();
              this.active = false;
              this.escuelaSeleccionada = null;
              console.log(data);
            });
          swal('Maestro actualizado', 'Maestro actualizado con exito', 'success');
          setTimeout(() => {
            this.active = true;
            this.router.navigate(['/clientes/maestros']);
          }, 1000);
        });
    }
  }
}
