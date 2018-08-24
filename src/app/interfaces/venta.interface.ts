export interface Venta {
  profesor: any;
  escuela: any;
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
      precioventa: number;
      tipo_movimiento: string;
      motivo: string;
    }
    ];
  lideres: [
    {
      comision_lider: number;
      lider: number;
    }
    ];
}
