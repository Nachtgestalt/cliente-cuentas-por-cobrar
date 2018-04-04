import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user: any;
  userName = '';


  constructor() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.userName = this.user.username.toUpperCase();
  }

  ngOnInit() {
  }

}
