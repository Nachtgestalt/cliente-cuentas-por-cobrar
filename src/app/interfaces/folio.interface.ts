import {Temporada} from './temporada.interface';

export interface Folio {
  idfolios: number;
  tipo: string;
  inicio: number;
  fin: number;
  idtemporada: Temporada;
}
