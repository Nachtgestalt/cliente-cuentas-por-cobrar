import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnInit {

  lbltitle: string = '';

  constructor( private router: Router, public _title: Title) {
    this.getDataRoute()
      .subscribe( data => {
        this.lbltitle = data.titulo;
        this._title.setTitle(this.lbltitle);
      });
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events
      .filter( evento => evento instanceof ActivationEnd)
      .filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null)
      .map((evento: ActivationEnd) => evento.snapshot.data);
  }

}
