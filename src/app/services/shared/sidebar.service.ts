import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {

  menu: any = [
    {
      titulo: 'Inicio',
      url: '/home'
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
      titulo: 'Escuelas',
      url: '/escuelas'
    },
    {
      titulo: 'Maestros',
      url: '/maestros'
    },
    {
      titulo: 'Cuentas por cobrar',
      url: '/cuentas'
    },
    {
      titulo: 'Configuración',
      url: '/configuracion'
    }
  ];

  constructor() { }
}
