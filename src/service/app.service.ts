import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Cookie} from 'ng2-cookies';
import {Observable, pipe} from 'rxjs';
import {map} from 'rxjs/internal/operators';
import {Http, Response, Headers, RequestOptions, RequestOptionsArgs} from '@angular/http';
import {MatSnackBar} from '@angular/material';
import {UserService} from './user.service';
import {User} from '../model/user';
import {AppComponent} from '../app/app.component';
import {HttpClient, HttpHeaders, HttpParams, HttpRequest} from '@angular/common/http';

export class Foo {
  constructor(public id: number,
              public name: string) {
  }
}

@Injectable()
export class AppService {
  private login;

  private users = new User();
  private checkTokenUrl = 'http://localhost:8081/oauth/check_token';

  visibleLogin = true;
  private data;
  private foo;

  constructor(private _router: Router, private _http: Http, private httpClient: HttpClient, private snackBar: MatSnackBar, private userService: UserService) {
  }

  obtainAccessToken(loginData) {
    const params = new URLSearchParams();
    params.append('username', loginData.login);
    params.append('password', loginData.password);
    params.append('grant_type', 'password');
    params.append('client_id', 'spring-security-oauth2-read-write-client');

    const headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Basic ' + btoa('spring-security-oauth2-read-write-client:artem')
    });
    const options = new RequestOptions({headers: headers});
    console.log(params.toString());
    this._http.post('http://localhost:8081/oauth/token', params.toString(), options)
      .subscribe(
        data => {
          this.saveToken(data.json(), loginData.login, loginData.password);
          this.setAuthLogin(loginData.login);
        },
        err => this.snackBar.open('Invalid Cradentials, please try again', 'Log In', {
          duration: 2000
        }));
  }

  saveToken(token, login, password) {
    const expireDate = new Date().getTime() + (1000 * token.expires_in);
    Cookie.set('access_token', token.access_token, expireDate);
    Cookie.set('login', login);
    Cookie.set('password', btoa(password));
    console.log(token);
    console.log('Obtained Access token');
    this.setAuthLogin(login);
    console.log('Current User - ' + this.users);
    this.visibleLogin = true;
    this._router.navigate(['/application/' + Cookie.get('login')]);
  }

  replicateUser(resourceUrl, user): Observable<User> {
    const headers = new Headers({
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    });
    const options = new RequestOptions({headers: headers});
    console.log(Cookie.get('access_token'));
    console.log(user);
    return this._http.put(resourceUrl, user, options).pipe(map(res => this.data = res.json()));
  }

  getResource(resourceUrl): Observable<Foo> {
    const headers = new Headers({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    });
    const options = new RequestOptions({headers: headers});
    return this._http.get(resourceUrl, options).pipe(map(data => this.foo = data.json()));
  }

  setAuthLogin(login) {
    this.login = login;
  }

  getAuthLogin() {
    return this.login;
  }

  checkCredentials(urlPrefix: string, value, urlSufix) {
    const headers = new HttpHeaders({
      'Content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      'Authorization': 'Bearer ' + Cookie.get('access_token')
    });
    const httpParams = new URLSearchParams();
    console.log('checkCredentials token' + Cookie.get('access_token'));
    httpParams.append('token', Cookie.get('access_token'));
    const req = new HttpRequest('POST', this.checkTokenUrl, httpParams.toString(), {
      headers: headers,
    });
    this.httpClient.request(req).subscribe(
      token => {
        if (!Cookie.get('access_token')) {
          Cookie.deleteAll('localhost');
          this.visibleLogin = true;
          this._router.navigate(['login']);
        } else {
          this.visibleLogin = false;
        }

      }, error2 => {
        Cookie.deleteAll('localhost');
        this._router.navigate(['login']);
        this.visibleLogin = true;
      }
    );
  }

  logout() {
    Cookie.delete('access_token', 'localhost');
    Cookie.deleteAll('localhost');
    this.visibleLogin = true;
    console.log(Cookie.get('access_token'));
    console.log(this.visibleLogin);
    this._router.navigate(['login']);
  }
}