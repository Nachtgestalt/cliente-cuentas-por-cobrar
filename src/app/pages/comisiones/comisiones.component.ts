import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.component.html',
  styleUrls: ['./comisiones.component.css']
})
export class ComisionesComponent implements OnInit {
  routeLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.routeLinks = [
      {
        label: 'Vendedor',
        link: './vendedor',
        index: 0
      },
      {
        label: 'Director',
        link: './director',
        index: 1
      },
      {
        label: 'Lider',
        link: './lider',
        index: 2
      }
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
