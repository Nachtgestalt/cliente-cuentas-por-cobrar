import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MaestroService} from '../../../services/maestro/maestro.service';
import {ActivatedRoute, Router} from '@angular/router';
import {EscuelaService} from '../../../services/escuela/escuela.service';
import {Escuela} from '../../../interfaces/escuela.interface';
import {Maestro} from '../../../interfaces/maestro.interface';
import {Observable} from 'rxjs/Observable';
import {startWith} from 'rxjs/operators/startWith';
import {map} from 'rxjs/operators/map';
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-agregar-maestro',
  templateUrl: './agregar-maestro.component.html',
  styleUrls: ['./agregar-maestro.component.css']
})
export class AgregarMaestroComponent implements OnInit, OnDestroy {
  // Banderas de control
  active = true;
  maestroActualizar = true;

  forma: FormGroup;

  clave: string;
  idProfesor: number;

  escuelas: Escuela[] = [];
  maestro: Maestro;

  escuelaSeleccionada: Escuela[] = null;

  filteredOptions: Observable<Escuela[]>[] = [];

  constructor( private _maestroService: MaestroService,
               private router: Router,
               private route: ActivatedRoute,
               private _escuelaService: EscuelaService,
               private _fb: FormBuilder,
               private cdref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._escuelaService.getEscuelas()
      .subscribe( (escuelas: Escuela[]) => {
        this.escuelas = escuelas;
      });

    this.crearFormaActualizar();
    console.log()
    this.route.params
      .subscribe(parametros => {
        this.clave = parametros['clave'];
        if (this.clave !== 'nuevo') {
          this.maestroActualizar = false;
          this.idProfesor = parseInt(this.clave);
          this._maestroService.obtenerMaestro(this.clave)
            .subscribe((maestro: Maestro) => {
              this.crearFilteredOptions(maestro.escuelas.length);
              this.forma.setValue(maestro);
            });
        } else {
          this.maestroActualizar = true;
          this.crearForma();
        }
      });
  }

  filter(nombre: string): Escuela[] {
    return this.escuelas.filter(option =>
      option.clave.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }

  displayFn(escuela?: Escuela): string | undefined {
    return escuela ? escuela.nombre : undefined;
  }

  crearForma() {
    this.forma = this._fb.group({
      idprofesor: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      escuelas: this._fb.array([{}])
    });

    this.filteredOptions[0] = this.forma.get('escuelas.0').valueChanges
      .pipe(
        startWith<string | Escuela>(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this.filter(nombre) : this.escuelas.slice())
      );

    console.log(this.filteredOptions);
  }

  crearFormaActualizar() {
    this.forma = this._fb.group({
      idprofesor: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      escuelas: this._fb.array([])
    });
  }

  getErrorMessages() {
    return ' Campo requerido ';
  }

  agregar() {
    const arr = <FormArray>this.forma.controls.escuelas;
    console.log(this.forma.get('escuelas').value);
    const maestro: Maestro = this.forma.value;
    // this.escuelaSeleccionada[0].profesores = [];
    if (this.clave === 'nuevo') {
      const arrayControl = this.forma.get('escuelas') as FormArray;
      const isSchool = arrayControl.at(0);
      if (typeof isSchool.value !== 'object') {
        swal('Selección de escuela invalida', 'No ha seleccionado una escuela que sea valida', 'error');
      } else {
        this._maestroService.agregarMaestro(maestro)
          .subscribe((res: Maestro) => {
            this.maestroActualizar = true;
            this.crearForma();
            this.active = false;
            swal('Maestro agregado', 'Maestro agregado con exito', 'success');
            setTimeout(() => this.active = true, 500);
          });
      }
    } else {
      this.escuelaSeleccionada = this.forma.get('escuelas').value;
      this.forma.get('idprofesor').setValue(this.idProfesor);
      console.log(this.forma.value);
      this._maestroService.actualizarMaestro(this.forma.value)
        .subscribe((res: Maestro) => {
          this.crearForma();
          this.active = false;
          swal('Maestro actualizado', 'Maestro actualizado con exito', 'success');
          setTimeout(() => {
            this.active = true;
            this.router.navigate(['/clientes/maestros/lista']);
          }, 1000);
        });
    }
  }

  crearFilteredOptions(lengthEscuelas){
    for (let i = 0; i < lengthEscuelas; i++) {
      this.agregarOtraEscuela(i);
    }
  }

  agregarOtraEscuela(i) {
    (<FormArray>this.forma.controls['escuelas']).push(
      new FormControl('')
    );

    this.cdref.detectChanges();

    this.filteredOptions[i] = this.forma.get(`escuelas.${i}`).valueChanges
      .pipe(
        startWith<string | Escuela>(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this.filter(nombre) : this.escuelas.slice())
      );
  }

  ngOnDestroy() {
  }
}
