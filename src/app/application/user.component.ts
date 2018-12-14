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
import {MatSidenav} from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input()
  private user = new User();
  private currentUser: Observable<User>;
  urlPrefix = '/application/';
  urlSuffix = '';
  private routeOnChatUrl: string = '/application/' + Cookie.get('login') + '/chat';
  private routeOnAppUrl: string = '/application/' + Cookie.get('login') + '/context';
  private routeOnFileStorageUrl: string = '/application/' + Cookie.get('login') + '/files';
  private sidenav: MatSidenav;

  @Output() childEvent = new EventEmitter();

  closeSide() {
    this.childEvent.emit('closeSide');
  }

  constructor(private appService: AppService,
              private userService: UserService,
              private loader: LoadingBarService,
              private appComponent: AppComponent,
              private authService: AuthService,
              private _router: Router) {


  }

  routeOnChat() {
    this.sidenav.close();
    this._router.navigate([this.routeOnChatUrl]);
  }

  routeOnApplication() {

    this._router.navigate([this.routeOnAppUrl]);
  }

  ngOnInit() {
    this.appService.checkCredentials(this.urlPrefix, Cookie.get('login'), this.urlSuffix);
    this.currentUser = this.authService.getAuthUser(Cookie.get('login')).pipe(map(data => this.user = data));
    this.currentUser.subscribe(data => this.user = data);
  }


  logout() {
    this.appService.logout();
  }
}
