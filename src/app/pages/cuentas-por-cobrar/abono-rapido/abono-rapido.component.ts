import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Venta} from '../../../interfaces/venta.interface';
import {CuentasXcobrarService} from '../../../services/cuentas-xcobrar/cuentas-xcobrar.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert';

@Component({
  selector: 'app-abono-rapido',
  templateUrl: './abono-rapido.component.html',
  styleUrls: ['./abono-rapido.component.css']
})
export class AbonoRapidoComponent implements OnInit {
  forma: FormGroup;
  filteredOptions: Observable<any>;
  ventas: any;
  isActive = true;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public _cuentasService: CuentasXcobrarService) {
  }

  ngOnInit() {
    this.route.data.subscribe(
      data => {
        this.ventas = data.ventas;
        console.log(this.ventas);
      }
    );
    this.crearForma();
  }

  crearForma() {
    this.forma = new FormGroup({
      'folio': new FormControl('', Validators.required),
      'monto': new FormControl('', Validators.required)
    });
    this.crearFilteredOptions();
  }

  crearFilteredOptions() {
    this.filteredOptions = this.forma.get('folio').valueChanges
      .pipe(
        startWith<string | Venta>(''),
        map(value => {
          console.log(value);
          return typeof value === 'string' ? value : value.folio;
        }),
        map(folio => folio ? this.filter(folio) : this.ventas.slice())
      );
  }

  filter(folio: string): Venta[] {
    console.log(folio);
    return this.ventas.filter(option => {
      return option.folio.toLowerCase().indexOf(folio.toLowerCase()) === 0;
    });
  }

  displayFn(venta?: any): string | undefined {
    return venta ? `${venta.folio} - ${venta.profesor.nombre} ${venta.profesor.apellidos}` : undefined;
  }

  abonar() {
    const venta = this.forma.get('folio').value;
    const folio = venta.folio;
    const monto = this.forma.get('monto').value;
    if (typeof venta !== 'object') {
      swal('Selección de folio invalida', 'No ha seleccionado una venta que sea valida', 'error');
    } else {
      this._cuentasService.abonoRapido(folio, monto).subscribe(
        res => {
          console.log(res);
          this.isActive = false;
          swal('Abonado', 'Se abono con exito', 'success');
          setTimeout(() => this.router.navigate(['/cuentas']), 500);
        }
      );
    }

  }

}
