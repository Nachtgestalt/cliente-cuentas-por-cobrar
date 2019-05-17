import { Component, OnInit } from '@angular/core';
import {DashboardService} from '../../services/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard-h',
  templateUrl: './dashboard-h.component.html',
  styleUrls: ['./dashboard-h.component.css']
})
export class DashboardHComponent implements OnInit {

  user: any;
  userName = '';


  constructor(public _dashboardService: DashboardService) {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userName = this.user.username.toUpperCase();
  }

  ngOnInit() {
    this._dashboardService.loadMenu();
  }
}
