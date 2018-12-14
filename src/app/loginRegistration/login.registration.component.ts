import {Component, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {LoadingBarService} from '@ngx-loading-bar/core';
import {AppService} from '../../service/app.service';
import {Cookie} from 'ng2-cookies';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login.registration.component.html',
  styleUrls: ['./login.registration.component.css']
})
export class LoginRegistrationComponent implements OnInit {

  selectedIndex = 0;
  private urlSufix = 'application/';


  constructor(private snackBar: MatSnackBar,
              private appService: AppService,
              private loader: LoadingBarService) {

  }

  ngOnInit(): void {
    Cookie.deleteAll('localhost');
    this.appService.checkCredentials(this.urlSufix, Cookie.get('login'), null);
  }
}
