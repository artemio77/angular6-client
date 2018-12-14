import {Injectable} from '@angular/core';

import {User} from '../model/user';
import {Observable} from 'rxjs/index';

import {Http, RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';


@Injectable()
export class UserService {



  private base_url = 'http://localhost:8081/';
  private base_url2 = 'http://localhost:8081/auth/register';
  private resourseServerUrl = 'http://localhost:8082';
  private user = new User();

  constructor(private http: Http,
              private httpClient: HttpClient,
              private _router: Router) {
  }


  public getAuthUser(email): Observable<User> {
    return this.httpClient.get<User>(this.base_url + 'auth/logged/' + email, {responseType: 'json'});
  }

  public getUsers() {
    return this.http.get(this.base_url + '/all');
  }

  public getUserById(id) {
    return this.httpClient.get(this.base_url + '/id/' + id, {responseType: 'json'});
  }

  public createUser(user) {
    return this.http.put(this.base_url2, user);
  }

  public getUserCode(code: number) {
    return this.http.get(this.base_url + 'auth/' + code);
  }

  public updateUser(newUser: User): Observable<User> {
    return this.httpClient.put<User>(`${this.base_url}/${newUser.id}`, newUser);
  }

  public deleteUser(user) {
    return this.http.delete(this.base_url + '/' + user.id);
  }

  public getUser(email: String): Observable<User> {
    return this.httpClient.get<User>(this.base_url + 'auth/user/' + email);
  }

  public isEmailExists(email: String): Observable<any> {
    return this.httpClient.get<boolean>(this.base_url + 'auth/exist/' + email);
  }

  public replicateUserOnResourceServer(user: User, options: RequestOptions) {
    return this.http.put(this.resourseServerUrl + '/resource/application/create', user, options);
  }


}
