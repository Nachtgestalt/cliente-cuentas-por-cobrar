import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-cuentas-por-cobrar',
  templateUrl: './cuentas-por-cobrar.component.html',
  styleUrls: ['./cuentas-por-cobrar.component.css']
})
export class CuentasPorCobrarComponent implements OnInit {

  routeLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.routeLinks = [
      {
        label: 'Cuentas por cobrar',
        link: './vendedores',
        index: 0
      },
      {
        label: 'Abono rapido',
        link: './abono-rapido',
        index: 1
      },
      {
        label: 'Reporte Cuentas por cobrar',
        link: './reporte-cuentas',
        index: 2
      },
      {
        label: 'Reporte Ganancias',
        link: './reporte-ganancias',
        index: 2
      }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
