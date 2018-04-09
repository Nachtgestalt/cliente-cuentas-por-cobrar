import {Escuela} from "./escuela.interface";

export interface Maestro {
  idprofesor: number;
  nombre: string;
  apellidos: string;
  telefono: string;
  escuelas: Escuela[];
}
