import {Injectable} from '@angular/core';

import {User} from '../model/user';
import {Observable} from 'rxjs/index';

import {Http, RequestOptions} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Cookie} from 'ng2-cookies';
import {Router} from '@angular/router';
import {environment} from '../environments/environment';


@Injectable()
export class UserService {


  private oauthApiUrl = environment.oauthApiUrl;
  private registerUserUrl = environment.oauthApiUrl + '/auth/register';
  private resourseServerUrl = environment.mainApiUrl;

  constructor(private http: Http,
              private httpClient: HttpClient) {
  }


  public getAuthUser(email): Observable<User> {
    return this.httpClient.get<User>(this.oauthApiUrl + 'auth/logged/' + email, {responseType: 'json'});
  }

  public getUsers() {
    return this.http.get(this.oauthApiUrl + '/all');
  }

  public getUserById(id) {
    return this.httpClient.get(this.oauthApiUrl + '/id/' + id, {responseType: 'json'});
  }

  public createUser(user) {
    return this.http.put(this.registerUserUrl, user);
  }

  public getUserCode(code: number) {
    return this.http.get(this.oauthApiUrl + 'auth/' + code);
  }

  public updateUser(newUser: User): Observable<User> {
    return this.httpClient.put<User>(`${this.oauthApiUrl}/${newUser.id}`, newUser);
  }

  public deleteUser(user) {
    return this.http.delete(this.oauthApiUrl + '/' + user.id);
  }

  public getUser(email: String): Observable<User> {
    return this.httpClient.get<User>(this.oauthApiUrl + 'auth/user/' + email);
  }

  public isEmailExists(email: String): Observable<any> {
    return this.httpClient.get<boolean>(this.oauthApiUrl + 'auth/exist/' + email);
  }

  public replicateUserOnResourceServer(user: User, options: RequestOptions) {
    return this.http.put(this.resourseServerUrl + '/resource/application/create', user, options);
  }


}
