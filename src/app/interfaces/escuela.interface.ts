import {Director} from "./director.interface";

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
}
