import {Component, OnInit} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {VendedorService} from '../../../services/vendedor/vendedor.service';
import {Observable} from 'rxjs';
import {Vendedor} from '../../../interfaces/vendedor.interface';
import {FormControl, FormGroup} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {ReportesService} from '../../../services/reportes/reportes.service';
import * as moment from 'moment';
import {EscuelaService} from '../../../services/escuela/escuela.service';
import {Escuela} from '../../../interfaces/escuela.interface';
import {Maestro} from '../../../interfaces/maestro.interface';
import swal from 'sweetalert';

@Component({
  selector: 'app-reporte-cuentas-por-cobrar',
  templateUrl: './reporte-cuentas-por-cobrar.component.html',
  styleUrls: ['./reporte-cuentas-por-cobrar.component.css']
})
export class ReporteCuentasPorCobrarComponent implements OnInit {

  form: FormGroup;
  escuelas: Escuela[] = [];
  vendedores: Vendedor[] = [];
  maestros: Maestro[] = [];
  filteredOptions: Observable<any>;

  isLoadingResults = false;

  constructor(public _reportesService: ReportesService,
              public _escuelaService: EscuelaService,
              public _vendedorService: VendedorService,
              private domSanitizer: DomSanitizer) {
    this._escuelaService.getEscuelas()
      .subscribe(
        (res: Escuela[]) => {
          this.escuelas = res;
          console.log(res);
        }
      );

    this._vendedorService.getVendedores()
      .subscribe(
        (res: Vendedor[]) => {
          this.vendedores = res;
          console.log(res);
        }
      );
    this.createFormGroup();
  }

  ngOnInit() {
  }

  reset() {
    this.createFormGroup();
  }

  createFormGroup() {
    this.form = new FormGroup({
      'fecha_inicio': new FormControl(),
      'fecha_fin': new FormControl(),
      'vendedor': new FormControl(),
      'escuela': new FormControl(),
      'maestro': new FormControl()
    });

    this.filteredOptions = this.form.get('escuela').valueChanges
      .pipe(
        startWith<string | Escuela>(''),
        map(value => typeof value === 'string' ? value : value.nombre),
        map(nombre => nombre ? this.filterSchool(nombre) : this.escuelas.slice())
      );

    this.form.get('escuela').valueChanges
      .subscribe(values => {
        console.log(values);
        if (values !== null) {
          this.maestros = values.profesores;
          console.log(this.maestros);
        }
      });
  }

  filterSchool(nombre: string): Escuela[] {
    return this.escuelas.filter(option =>
      option.clave.toLowerCase().indexOf(nombre.toLowerCase()) === 0);
  }

  displaySchoolFn(escuela?: Escuela): string | undefined {
    return escuela ? `${escuela.clave} ${escuela.nombre}` : undefined;
  }

  reporteCobranza() {
    this.isLoadingResults = true;
    console.log(this.form.value);
    let pdfResult;
    let escuela;
    let fecha_inicio;
    let fecha_fin;
    this.form.get('fecha_inicio').value ? fecha_inicio = moment(this.form.get('fecha_inicio').value).format('YYYY-MM-D') :
      fecha_inicio = null;
    this.form.get('fecha_fin').value ? fecha_fin = moment(this.form.get('fecha_fin').value).format( 'YYYY-MM-D') :
    fecha_fin = null;
    this.form.get('escuela').value ? escuela = this.form.get('escuela').value : escuela = null;
    const vendedor = this.form.get('vendedor').value;
    const params = {
      'fecha_inicio': fecha_inicio ? fecha_inicio : null,
      'fecha_fin': fecha_fin ? fecha_fin : null,
      'escuela': escuela ? escuela.clave : null,
      'vendedor': vendedor,
    };
    this._reportesService.reporteCobranza(params).subscribe(
      (data: any) => {
        this.isLoadingResults = false;
        console.log(data);
        pdfResult = this.domSanitizer.bypassSecurityTrustResourceUrl(
          URL.createObjectURL(data)
        );
        window.open(pdfResult.changingThisBreaksApplicationSecurity);
        console.log(pdfResult);
      },
      (error) => {
        swal('Error al cargar el reporte', 'Algo ha salido mal', 'error');
        console.error(error);
        this.isLoadingResults = false;
      }
    );
  }
}
