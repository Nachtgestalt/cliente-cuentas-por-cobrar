import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeWhile';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  routeLinks: any[];
  activeLinkIndex = -1;
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
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }
}
