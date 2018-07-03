import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {VendedorService} from '../../../services/vendedor/vendedor.service';
import {Vendedor} from '../../../interfaces/vendedor.interface';
import {Temporada} from '../../../interfaces/temporada.interface';
import {TemporadaService} from '../../../services/temporada/temporada.service';
import {FolioService} from '../../../services/folio/folio.service';
import {Folio} from '../../../interfaces/folio.interface';
import {BloqueFolios} from '../../../interfaces/bloque_folios.interface';
import {BloqueFoliosService} from '../../../services/bloque-folios/bloque-folios.service';
import 'rxjs/add/operator/takeWhile';

@Component({
  selector: 'app-asignar-folios-empleado',
  templateUrl: './asignar-folios-empleado.component.html',
  styleUrls: ['./asignar-folios-empleado.component.css']
})
export class AsignarFoliosEmpleadoComponent implements OnInit {
  private alive: boolean = true;

  formGroup: FormGroup;
  vendedores: Vendedor[];
  temporadas: Temporada[];
  folios: Folio[];
  hayFolios = false;
  bloqueFolios: BloqueFolios = {
    fin: null,
    inicio: null,
    id: {
      vendedorClave: '',
      folioIdfolios: null
    }
  };

  /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray'); }

  constructor(private _formBuilder: FormBuilder,
              private _vendedorService: VendedorService,
              private _temporadaService: TemporadaService,
              private _folioService: FolioService,
              private _bloqueFolioService: BloqueFoliosService) {
    this.crearForma();

    this._vendedorService.getVendedores()
      .subscribe( (vendedores: Vendedor[]) => {
        console.log(vendedores);
        this.vendedores = vendedores;
      });
    this._temporadaService.getTemporadas()
      .subscribe( (temporadas: Temporada[]) => {
        console.log(temporadas);
        this.temporadas = temporadas;
      });
  }

  ngOnInit() {
    this.createValueChanges();
  }

  crearForma() {
    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          vendedor_clave: ['', Validators.required],
        }),
        this._formBuilder.group({
          folio_idfolios: ['', Validators.required],
          tipo_folios: ['', Validators.required]
        }),
        this._formBuilder.group({
          inicio: ['', Validators.required],
          fin: ['', Validators.required]
        }),
      ])
    });
  }

  createValueChanges() {
    this.alive = true;
    (this.formGroup.get('formArray') as FormArray).at(0).get('vendedor_clave').valueChanges
      .takeWhile(() => this.alive)
      .subscribe( values => {
        console.log(values);
        this.bloqueFolios.id.vendedorClave = values.clave;
        console.log(this.bloqueFolios);
      });

    (this.formGroup.get('formArray') as FormArray).at(1).get('tipo_folios').valueChanges
      .takeWhile(() => this.alive)
      .subscribe( values => {
        console.log(values);
        this.bloqueFolios.id.folioIdfolios = values.idfolios;
        (this.formGroup.get('formArray') as FormArray).at(2).get('inicio').setValidators([Validators.required, Validators.min(values.inicio)]);
        (this.formGroup.get('formArray') as FormArray).at(2).get('fin').setValidators([Validators.required, Validators.max(values.fin)]);
        console.log(this.bloqueFolios);
    });

    (this.formGroup.get('formArray') as FormArray).at(1).get('folio_idfolios').valueChanges
      .takeWhile(() => this.alive)
      .subscribe(values => {
      this._temporadaService.getTemporada(values.idtemporada)
        .subscribe( (res: any) => {
          this._folioService.getFoliosTemporada(res.idtemporada)
            .subscribe((data: Folio[]) => {
              if (data.length !== 0) {
                this.hayFolios = true;
                this.folios = data;
              } else {
                this.hayFolios = false;
              }
            });
          console.log(res);
        });
      console.log(values);
    });
  }

  asignarFolios() {
    this.bloqueFolios.inicio = this.formGroup.get('formArray').get('2').get('inicio').value;
    this.bloqueFolios.fin = this.formGroup.get('formArray').get('2').get('fin').value;

    this._bloqueFolioService.agregarBloqueFolios(this.bloqueFolios)
      .takeWhile(() => this.alive)
      .subscribe(res => {
        console.log(res);
      });
    this.crearForma();
    this.formGroup.reset();
    this.alive = false;
    this.hayFolios = false;
    this.createValueChanges();
    console.log(this.formGroup.value);

    // this.bloqueFolios.id.folioIdfolios = this.formGroup.get('formArray').get('0').value;
  }

  validarClave(control: AbstractControl) {
    return this._bloqueFolioService.existeFolioXVendedorTemporada(this.bloqueFolios.id.vendedorClave, 'b', 'v')
      .map(
        res => {
          return res ? {existeClave: true} : null;
        });

  }
}
