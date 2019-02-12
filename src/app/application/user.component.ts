import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from '../../model/user';
import {UserService} from '../../service/user.service';
import {AppService} from '../../service/app.service';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {AppComponent} from '../app.component';
import {AppModule} from '../app.module';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';
import {map} from 'rxjs/internal/operators';
import {Observable} from 'rxjs';
import {AuthService} from '../../service/auth.service';
import {DialogPosition, MatDialog, MatSidenav} from '@angular/material';
import {UserSearchComponent} from './user-search/user-search.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  private user: User;
  private currentUser: Observable<User>;
  urlPrefix = '/application/';
  urlSuffix = '';
  @Output() childEvent = new EventEmitter();
  private sidenav: MatSidenav;

  constructor(private appService: AppService,
              private userService: UserService,
              private loader: LoadingBarService,
              private appComponent: AppComponent,
              private authService: AuthService,
              private _router: Router,
              public dialog: MatDialog) {


  }

  ngOnInit() {
    this.appService.checkCredentials(this.urlPrefix, Cookie.get('login'), this.urlSuffix);
    this.currentUser = this.authService.getAuthUser(Cookie.get('login')).pipe(map(data => this.user = data));
    this.currentUser.subscribe(data => this.user = data);
  }

  public getUser() {
    return this.currentUser;
  }

  searchContact() {

    const dialogRef = this.dialog.open(UserSearchComponent, {
      width: '850vh',
      height: '70vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  logout() {
    this.appService.logout();
  }
}
