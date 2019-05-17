import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeWhile';
import {Router} from '@angular/router';
import {Refreshable} from '../../interfaces/refreshable.interface';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit, Refreshable {
  routeLinks: any[];
  activeLinkIndex = -1;
  isVisible = true;
  constructor(private router: Router) {
    this.routeLinks = [
      {
        label: 'Nueva venta',
        link: './nueva',
        index: 0
      },
      {
        label: 'Modificar venta',
        link: './lista',
        index: 1
      },
      {
        label: 'Reporte venta',
        link: './reporte',
        index: 2
      }
    ];
  }

  ngOnInit() {
    console.log('Estoy en OnInit de ventas');
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

  refresh() {
    console.log('Estoy en refresh');
    this.isVisible = false;
    setTimeout(() => this.isVisible = true, 100);
  }
}
