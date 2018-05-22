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
      url: '/ventas'
    },
    {
      titulo: 'Recursos humanos',
      url: '/nomina'
    },
    {
      titulo: 'Almacen',
      url: '/almacen'
    },
    {
      titulo: 'Clientes',
      url: '/clientes'
    },
    // {
    //   titulo: 'Cuentas por cobrar',
    //   url: '/cuentas'
    // },
    {
      titulo: 'Configuración',
      url: '/configuracion'
    }
  ];

  constructor() { }
}
