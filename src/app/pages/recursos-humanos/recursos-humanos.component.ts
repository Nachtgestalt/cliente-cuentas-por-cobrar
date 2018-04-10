import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recursos-humanos',
  templateUrl: './recursos-humanos.component.html',
  styleUrls: ['./recursos-humanos.component.css']
})

export class RecursosHumanosComponent implements OnInit {
  routeLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.routeLinks = [
      {
        label: 'Agregar',
        link: './empleado/nuevo',
        index: 0
      },
      {
        label: 'Modificar',
        link: './empleados',
        index: 1
      },
      // {
      //   label: 'Asignar folios',
      //   link: './folios',
      //   index: 2
      // }
    ];
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
