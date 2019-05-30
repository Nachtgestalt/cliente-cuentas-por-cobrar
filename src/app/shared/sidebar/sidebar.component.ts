import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {SidebarService} from '../../services/service.index';
import {Refreshable} from '../../interfaces/refreshable.interface';
import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() opened;
  mobileQuery: MediaQueryList;
  menu: any = [];
  private routedComponent: Refreshable;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              public _sidebar: SidebarService, public route: ActivatedRoute) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this._sidebar.loadSidebarMenu();
  }

  public setRoutedComponent(componentRef: Refreshable) {
    console.log('Componente actual: ', componentRef);
    this.routedComponent = componentRef;
    this._sidebar.changeComponent(this.routedComponent);
    if (this.routedComponent.refresh) {
      this.routedComponent.refresh();
    }
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
