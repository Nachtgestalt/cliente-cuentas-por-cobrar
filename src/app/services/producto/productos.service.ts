import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
//import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../../interfaces/producto.interface';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductosService {

  serverURL: string = 'http://localhost:8080/productos/nuevo';
  obtenerURL: string = 'http://localhost:8080/productos';
  constructor(private http: HttpClient,
              //private router: Router,
              ) { }

  agregar(producto: Producto) {
    let body = JSON.stringify(producto);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    console.log(body);
  }

  obtenerProductos(){
  }

  obtenerProducto(key$: string){
  }

  actualizarProducto(producto: Producto, key$: string){
  }

  borrarProducto(key$:string){

  }
}

// solicitar(){
//   return this.http.get( this.url )
//             .map( res => {
//               console.log(res.json());
//             })

// }

