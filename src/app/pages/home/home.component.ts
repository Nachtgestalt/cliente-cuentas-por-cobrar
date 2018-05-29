import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {DashboardService} from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  userName = '';


  constructor(public _dashboardService: DashboardService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userName = this.user.username.toUpperCase();
  }

  ngOnInit() {
  }

}
