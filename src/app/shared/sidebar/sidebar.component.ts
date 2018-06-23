import {Component, OnInit, ChangeDetectorRef, Input, ViewChild, AfterViewInit, OnDestroy} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import { SidebarService } from '../../services/service.index';
import {Subscription} from 'rxjs/Subscription';
import {MatSidenav} from '@angular/material';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy{
  @Input() opened;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
              public _sidebar: SidebarService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
  }



  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

}
