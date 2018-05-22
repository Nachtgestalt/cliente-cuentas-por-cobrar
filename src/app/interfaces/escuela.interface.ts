import {Director} from './director.interface';
import {Maestro} from './maestro.interface';
import {Zona} from './zona.interface';

export interface Escuela {
  clave: string;
  nombre: string;
  turno: string;
  direccion: string;
  colonia: string;
  codigoPostal: string;
  estado: string;
  municipio: string;
  telefono: string;
  email: string;
  director: Director;
  profesores: Maestro[];
  zona: Zona;
}
