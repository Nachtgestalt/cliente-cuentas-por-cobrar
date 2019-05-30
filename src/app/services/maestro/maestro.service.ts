import {Injectable} from '@angular/core';
import {URL_SERVICIOS} from '../../config/config';
import {BehaviorSubject} from 'rxjs';
import {Escuela} from '../../interfaces/escuela.interface';
import {Maestro} from '../../interfaces/maestro.interface';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Injectable()
export class MaestroService {
  token = localStorage.getItem('token');
  profesoresURL = URL_SERVICIOS + '/profesores';
  escuelaVacia: Escuela = {
    clave: '',
    nombre: 'Sin asignar',
    turno: '',
    direccion: '',
    colonia: '',
    codigoPostal: '',
    estado: '',
    municipio: '',
    telefono: '',
    email: '',
    director: null,
    profesores: null,
    zona: null
  };

  dataChange: BehaviorSubject<Maestro[]> = new BehaviorSubject<Maestro[]>([]);
  constructor(public http: HttpClient) { }

  get data(): Maestro[] {
    return this.dataChange.value;
  }

  obtenerMaestro(clave: string) {
    const url = `${this.profesoresURL}/${clave}`;
    return this.http.get(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  agregarMaestro(maestro: Maestro) {
    const url = this.profesoresURL + '/nuevo';
    const body = JSON.stringify(maestro);
    console.log('Esto se envia al agremar maestro: ' + body);

    return this.http.post(url, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});

  }

  actualizarMaestro(maestro: Maestro) {
    const body = JSON.stringify(maestro);
    console.log('Formulario para enviar al actualizar: ' + body);
    return this.http.put(this.profesoresURL, body, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }

  obtenerMaestros() {
    return this.http.get<Maestro[]>(this.profesoresURL, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}})
      .subscribe((data: Maestro[]) => {
        console.log(data);
        this.dataChange.next(data);
        },
        (error: HttpErrorResponse) => {
          console.log (error.name + ' ' + error.message);
        });
  }

  deleteProfesor(idmaestro: number | string) {
    const url = `${this.profesoresURL}/${idmaestro}`;
    console.log('URL de borrado: ' + url);
    return this.http.delete(url, {headers: {'authorization': this.token, 'Content-Type': 'application/json'}});
  }
}
