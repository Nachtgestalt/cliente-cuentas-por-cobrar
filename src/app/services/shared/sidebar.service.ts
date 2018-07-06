import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Inicio',
      url: '/home'
    },
    {
      titulo: 'Ventas',
      icono: 'fas fa-shopping-cart mr-3',
      url: '/ventas/nueva'
    },
    {
      titulo: 'Confirmar pedidos',
      icono: 'fas fa-clipboard-check mr-3',
      url: '/entregas'
    },
    {
      titulo: 'Inventario',
      icono: 'fas fa-box-open mr-3',
      url: '/inventario'
    },
    {
      titulo: 'Recursos humanos',
      icono: 'fas fa-user mr-3',
      url: '/nomina'
    },
    {
      titulo: 'Productos',
      icono: 'fas fa-barcode mr-3',
      url: '/almacen'
    },
    {
      titulo: 'Clientes',
      icono: 'fas fa-graduation-cap mr-3',
      url: '/clientes'
    },
    {
      titulo: 'Cuentas por cobrar',
      icono: 'fas fa-dollar-sign mr-3',
      url: '/cuentas'
    },
    {
      titulo: 'Comisiones',
      icono: 'fas fa-hand-holding-usd mr-3',
      url: '/comisiones'
    },
    {
      titulo: 'Configuración',
      icono: 'fa fa-cog mr-3',
      url: '/configuracion'
    },
  ];

  constructor() { }
}
