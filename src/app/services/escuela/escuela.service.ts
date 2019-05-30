import {Injectable} from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {BehaviorSubject} from 'rxjs';
import {Escuela} from '../../interfaces/escuela.interface';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Director} from '../../interfaces/director.interface';
import {Zona} from '../../interfaces/zona.interface';

@Injectable()
export class EscuelaService {
  token = localStorage.getItem('token');
  escuelaURL = URL_SERVICIOS + '/escuelas';

  dataChange: BehaviorSubject<Escuela[]> = new BehaviorSubject<Escuela[]>([]);

  constructor(public http: HttpClient) {
  }

  get data(): Escuela[] {
    return this.dataChange.value;
  }

  obtenerEscuela(clave: string) {
    const url = `${this.escuelaURL}/${clave}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  agregarEscuela(escuela: Escuela) {
    const url = this.escuelaURL + '/nuevo';
    const body = JSON.stringify(escuela);

    console.log(body);

    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  actualizarEscuela(escuela: Escuela) {
    const body = JSON.stringify(escuela);
    return this.http.put(this.escuelaURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  obtenerEscuelas() {
    const director: Director = {
      iddirector: null,
      nombre: '',
      apellidos: '',
      email: '',
      telefono: ''
    };

    const zona: Zona = {
      idzona: '',
      vendedor: null
    };

    return this.http.get<Escuela[]>(this.escuelaURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .subscribe((data: Escuela[]) => {
          for (const escuela of data) {
            if (escuela.director === null) {
              escuela.director = director;
              escuela.director.nombre = '';
              escuela.director.apellidos = '';
            }
            if (escuela.zona === null) {
              escuela.zona = zona;
              escuela.zona.idzona = 'Sin asignar';
            }
          }
          console.log(data);
          this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log(error.name + ' ' + error.message);
        });
  }

  getEscuelas() {
    return this.http.get<Escuela[]>(this.escuelaURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  borrarEscuela(clave: string) {
    const url = `${this.escuelaURL}/${clave}`;
    return this.http.delete(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  getEscuelasZona(zona) {
    const url = `${this.escuelaURL}/zona=${zona}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  existeClave(clave) {
    const url = `${this.escuelaURL}/search/clave=${clave}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }
}
