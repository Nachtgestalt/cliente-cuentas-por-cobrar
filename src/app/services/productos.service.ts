import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
//import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from './../interfaces/producto.interface';
import 'rxjs/add/operator/map';

@Injectable()
export class ProductosService {

  serverURL: string = 'http://localhost:8080/productos/nuevo';
  obtenerURL: string = 'http://localhost:8080/productos';
  constructor(private http: Http,
              //private router: Router,
              ) { }

  agregar(producto: Producto) {
    let body = JSON.stringify(producto);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    console.log(body);

    return this.http.post(this.serverURL, body, { headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      })
  }

  obtenerProductos(){
    return this.http.get( this.obtenerURL)
      .map( res => res.json() );
  }

  obtenerProducto(key$: string){
    let url = `${ this.obtenerURL}/${key$}`;
    return this.http.get(url)
      .map( res => res.json());
  }

  actualizarProducto(producto: Producto, key$: string){
    let body = JSON.stringify(producto);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });

    let url = `${ this.obtenerURL}/${key$}`;
    return this.http.put(url, body, {headers})
      .map( res => res.json());
  }

  borrarProducto(key$:string){
    let url = `${ this.obtenerURL}/${key$}`;
    return this.http.delete(url)
      .map(res => res.json)
  }
}

// solicitar(){
//   return this.http.get( this.url )
//             .map( res => {
//               console.log(res.json());
//             })

// }

