import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, EventEmitter, HostListener, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import {SidebarService} from '../../services/shared/sidebar.service';
import {Refreshable} from '../../interfaces/refreshable.interface';
import {TemporadaService} from '../../services/temporada/temporada.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  @Output() openSideBar: EventEmitter<boolean> = new EventEmitter();
  isOpen = false;
  private routedComponent: Refreshable;
  temporadas;

  constructor(private router: Router,
              public _userService: UserService,
              private _sidebarService: SidebarService,
              private _temporadaService: TemporadaService) {}

  openSide(event: boolean) {
    this.isOpen = !event;
    this.openSideBar.emit( this.isOpen );
  }

  ngOnInit() {
    this._sidebarService.currentComponent.subscribe(
      component => this.routedComponent = component
    );

    this._temporadaService.getTemporadas().subscribe(
      temporadas => this.temporadas = temporadas
    );
  }

  goToConfiguration() {
    this.router.navigate(['/', 'configuracion']);
  }

  cambiarTempoada(temporada) {
    this._userService.setSeasonInStorage(temporada);
    console.log('Cambiando temporada');
    if (this.routedComponent.refresh) {
      this.routedComponent.refresh();
    }
  }


}
