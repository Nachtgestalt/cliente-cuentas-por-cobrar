import { Injectable } from '@angular/core';

@Injectable()
export class DashboardService {

  menu: any = [
    {
      titulo: 'Ventas',
      icono: 'fas fa-shopping-cart fa-4x',
      url: '/ventas/nueva'
    },
    {
      titulo: 'Confirmar pedidos',
      icono: 'fas fa-clipboard-check fa-4x',
      url: '/entregas'
    },
    {
      titulo: 'Inventario',
      icono: 'fas fa-box-open fa-4x',
      url: '/inventario'
    },
    {
      titulo: 'Recursos humanos',
      icono: 'fas fa-user fa-4x',
      url: '/nomina'
    },
    {
      titulo: 'Productos',
      icono: 'fas fa-barcode fa-4x',
      url: '/almacen'
    },
    {
      titulo: 'Clientes',
      icono: 'fas fa-graduation-cap fa-4x',
      url: '/clientes'
    },
    // {
    //   titulo: 'Cuentas por cobrar',
    //   url: '/cuentas'
    // },
    {
      titulo: 'Configuración',
      icono: 'fa fa-cog fa-4x',
      url: '/configuracion'
    }
  ];

  constructor() { }

}
