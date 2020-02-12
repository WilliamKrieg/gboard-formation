import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {LayoutService} from '../../services/tools/layout.service';
import { UserService } from '../../services/user.service';
import {MatSidenav} from '@angular/material/sidenav';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.css']
})
export class ApplicationComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  constructor(private _layoutService: LayoutService, public _userService: UserService) { }

  public close() {
    this.sidenav.close();
  }

  ngAfterViewInit() {
    this._layoutService.sideBar = this.sidenav;
  }
  ngOnInit() {
  }

}
