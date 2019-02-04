import {Injectable} from '@angular/core';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {User} from '../model/user';
import {UserService} from './user.service';
import {Observable} from 'rxjs/index';
import {AppService} from './app.service';


@Injectable()
export class AuthService {

  user = new User();
  login: string;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  getUser() {
    return this.user;
  }

  checkCode(code: number) {
    return this.userService.getUserCode(code);
  }

  getAuthUser(email) {
    return this.userService.getUser(email);
  }

  registration(user: User) {
    return this.userService.createUser(user);
  }


}
