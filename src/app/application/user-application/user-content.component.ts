import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {AppService} from '../../../service/app.service';
import {UserService} from '../../../service/user.service';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.css']
})

export class UserContentComponent implements OnInit, OnDestroy {
  mode = new FormControl('over');
  urlPrefix = '/application/';
  urlSuffix = '/context';

  constructor(private loader: LoadingBarService,
              private userService: UserService,
              private appService: AppService) {
  }

  ngOnInit() {
    this.appService.checkCredentials(this.urlPrefix, Cookie.get('login'), this.urlSuffix);
  }

  ngOnDestroy(): void {
  }


  logout() {
    this.appService.logout();
  }

}
