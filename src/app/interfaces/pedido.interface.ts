export interface Pedido {
  idHistorial: number;
  pedidos: number;
  entregados: number;
  venta_folio: string;
  libro_clave: string;
  fecha_solicitud: string;
  fecha_confirmacion: string;
  tipo_movimiento: string;
  motivo: string;
}
