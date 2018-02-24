import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { ProductosService } from '../../../services/productos.service';
import { Http, Headers } from '@angular/http';
import { Producto} from "../../../interfaces/producto.interface";

//import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  formulario: FormGroup;
  valido = false;
  actualizado = false;

  private producto: Producto = {
    codigo: '',
    marca: '',
    modelo: '',
    identificador: '',
    precio: null,
    costo: null,
    cantidad: null,
    descripcion: ''
  };

  nuevo: boolean = false;
  id: string;

  constructor(private _productosService: ProductosService,
              ) {

    this.formulario = new FormGroup({
      'codigo': new FormControl('', [Validators.required]),
      'marca': new FormControl('', Validators.required),
      'modelo': new FormControl('', Validators.required),
      'identificador': new FormControl('', Validators.required),
      'precio': new FormControl('', Validators.required),
      'costo': new FormControl('', Validators.required),
      'cantidad': new FormControl('', Validators.required),
      'descripcion': new FormControl('', Validators.required)
    });

    /*this.route.params
      .subscribe(parametros => {
        console.log(parametros);
        this.id = parametros['id'];
        if (this.id !== 'nuevo') {
          this._productosService.obtenerProducto(this.id)
            .subscribe(producto => this.producto = producto);
        }
      });*/
  }

  ngOnInit() {
    // this._agregarService.solicitar().subscribe();
  }

  guardarCambios() {
    if (this.id === 'nuevo') {
      this._productosService.agregar(this.producto)
        .subscribe(data => {
          this.valido = true;
          setTimeout(() => {
            this.formulario.reset();
            this.valido = false;
            //this.router.navigate(['/dashboard/almacen/producto/nuevo']);
          }, 2000);
        });
    } else {
      this._productosService.actualizarProducto(this.producto, this.id)
        .subscribe(data => {
          this.actualizado = true;
          setTimeout(() => {
            this.formulario.reset();
            this.valido = false;
            //this.router.navigate(['/dashboard/almacen/productos']);
          }, 2000);
          console.log(data);
        });
    }
  }

}
