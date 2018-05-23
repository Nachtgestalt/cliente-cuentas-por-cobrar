export interface Venta {
  folio: string;
  fecha: string;
  comision_vendedor: number;
  comision_profesor: number;
  comision_director: number;
  vendedor_clave: string;
  idfolios: number;
  escuela_clave: string;
  idprofesor: string;
  pedidos: [
    {
      idHistorial: string;
      pedidos: number;
      libro_clave: string;
    }
  ];
}
