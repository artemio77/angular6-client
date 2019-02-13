import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cookie} from 'ng2-cookies';
import {map} from 'rxjs/operators';
import {UserSearchComponent} from '../user-search/user-search.component';
import {AppService} from '../../../service/app.service';
import {UserService} from '../../../service/user.service';
import {AppComponent} from '../../app.component';
import {AuthService} from '../../../service/auth.service';
import {Router} from '@angular/router';
import {MatDialog, MatSidenav} from '@angular/material';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {User} from '../../../model/user';
import {UserComponent} from '../user.component';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.css']
})
export class UserNavComponent implements OnInit {
  @Input()
  public user = new User;
  private currentUser: Observable<User>;
  private routeOnChatUrl: string = '/application/' + Cookie.get('login') + '/chat';
  private routeOnAppUrl: string = '/application/' + Cookie.get('login') + '/context';
  private routeOnFileStorageUrl: string = '/application/' + Cookie.get('login') + '/files';

  constructor(private userComponent: UserComponent,
              private appService: AppService) {
  }

  ngOnInit() {
    this.currentUser = this.userComponent.getUser();
    this.currentUser.subscribe(data => this.user = data);
  }

  logout() {
    this.appService.logout();
  }
}


