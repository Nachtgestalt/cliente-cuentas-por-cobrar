import {User} from './user.interfaces';
import {Zona} from './zona.interface';

export interface Vendedor {
  clave: string;
  nombre: string;
  apellidos: string;
  rfc: string;
  telefono: string;
  email: string;
  direccion: string;
  colonia: string;
  codigo_postal: string;
  estado: string;
  municipio: string;
  zonas: Zona[];
}
