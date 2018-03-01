import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() openSideBar: EventEmitter<boolean> = new EventEmitter();
  isOpen = false;

  constructor(private router: Router) {}

  logout() {
    this.router.navigate(['/login']);
  }

  openSide(event: boolean) {
    this.isOpen = !this.isOpen;
    this.openSideBar.emit( this.isOpen );
  }

  ngOnInit() {
  }

}
