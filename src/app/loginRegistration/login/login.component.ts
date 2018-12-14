import {ErrorStateMatcher, MatSnackBar} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../../service/auth.service';
import {UserComponent} from '../../application/user.component';
import {UserService} from '../../../service/user.service';
import {ErrorHandler, Injectable, Injector, NgZone} from '@angular/core';
import {AppService} from '../../../service/app.service';
import {Cookie} from 'ng2-cookies';


export class LoginErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private form: FormGroup;
  private credentials = {login: '', password: ''};
  private loading = false;
  private error = false;

  constructor(private auth: AuthService,
              private formBuilder: FormBuilder,
              private injector: Injector,
              private appService: AppService,
              private snackBar: MatSnackBar,
              private router: Router) {

  }

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  passwordFormControl = new FormControl('', [
    Validators.min(4),
    Validators.required
  ]);

  ngOnInit() {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  loginToken() {
    this.appService.obtainAccessToken(this.credentials);

  }


}
