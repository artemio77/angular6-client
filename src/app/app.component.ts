import {Component, Injector, NgZone, OnInit} from '@angular/core';
import {AppService} from '../service/app.service';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {Cookie} from 'ng2-cookies';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(private appService: AppService,
              private loader: LoadingBarService,
              private userService: UserService) {
    appService.visibleLogin = true;
  }

}

