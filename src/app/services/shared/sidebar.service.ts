import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Inicio',
      url: '/home'
    },
    {
      titulo: 'Almacen',
      url: '/almacen'
    },
    {
      titulo: 'Clientes',
      url: '/clientela'
    },
    {
      titulo: 'Cuentas por cobrar',
      url: '/cuentas'
    },
    {
      titulo: 'Recursos humanos',
      url: '/nomina'
    }
  ];

  constructor() { }
}
