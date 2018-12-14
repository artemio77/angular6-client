import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {FormControl} from '@angular/forms';
import {AppService} from '../../../service/app.service';
import {UserService} from '../../../service/user.service';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})

export class UserChatComponent implements OnInit {
  urlPrefix = '/application/';
  urlSuffix = '/chat';
  mode = new FormControl('over');


  constructor(private loader: LoadingBarService,
              private userService: UserService,
              private appService: AppService) {
  }

  ngOnInit() {
    this.appService.checkCredentials(this.urlPrefix, Cookie.get('login'), this.urlSuffix);
  }


  logout() {
    this.appService.logout();

  }

}
