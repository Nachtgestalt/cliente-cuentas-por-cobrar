import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';

declare var jquery: any;
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  @Output() openSideBar: EventEmitter<boolean> = new EventEmitter();
  isOpen = false;

  constructor(private router: Router,
              public _userService: UserService) {}

  openSide(event: boolean) {
    this.isOpen = !this.isOpen;
    this.openSideBar.emit( this.isOpen );
  }

  ngOnInit() {
  }

  goToConfiguration() {
    this.router.navigate(['/configuracion']);
  }


}
