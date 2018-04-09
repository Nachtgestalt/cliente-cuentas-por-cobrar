import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-escuelas',
  templateUrl: './escuelas.component.html',
  styleUrls: ['./escuelas.component.css']
})
export class EscuelasComponent implements OnInit {

  routeLinks: any[];
  activeLinkIndex = -1;
  constructor(private router: Router) {
    this.routeLinks = [
      {
        label: 'Agregar escuela',
        link: './escuela/nuevo',
        index: 0
      },
      {
        label: 'Modificar escuela',
        link: './escuelas',
        index: 1
      },
      {
        label: 'Agregar maestro',
        link: './maestro/nuevo',
        index: 2
      },
      {
        label: 'Modificar maestro',
        link: './maestros',
        index: 3
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
