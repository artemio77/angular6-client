import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl, AbstractControl} from '@angular/forms';

import {User} from '../../../model/user';
import {AuthService} from '../../../service/auth.service';
import {UserService} from '../../../service/user.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';
import {state} from '@angular/animations';
import {LoginRegistrationComponent} from '../login.registration.component';
import {AppService} from '../../../service/app.service';
import {MatSnackBar} from '@angular/material';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/internal/operators';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  private form: FormGroup;
  private secondFormGroup: FormGroup;
  private loading = false;
  private error = false;
  private user: User = new User();
  private code;
  private email: string;
  private credentials = {login: '', password: ''};
  private invalidCode: boolean;
  private uniqueEmail: boolean;

  private loaderState = false;
  private state = false;

  constructor(private auth: AuthService, private users: UserService,
              private http: HttpClient, private router: Router,
              private formBuilder: FormBuilder,
              private loginRegistrationComponent: LoginRegistrationComponent,
              private appService: AppService,
              private snackBar: MatSnackBar) {
  }

  codeFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('[0-9]{5}')
  ]);
  firstNameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z_]*$'),
    Validators.min(2),
    Validators.max(30)
  ]);
  surnameFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[a-zA-Z_]*$'),
    Validators.min(2),
    Validators.max(30)
  ]);
  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email], this.emailExists.bind(this)
  );
  passwordFormControl = new FormControl('', [
    Validators.min(5),
    Validators.required]
  );

  ngOnInit() {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z_]*$'),
        Validators.min(2),
        Validators.max(30)]],
      lastName: ['', [Validators.required,
        Validators.pattern('^[a-zA-Z_]*$'),
        Validators.min(2),
        Validators.max(30)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9]*$')]]
    });
    this.secondFormGroup = this.formBuilder.group({
      code: ['', [Validators.required,
        Validators.pattern('[0-9]{5}'),
        Validators.maxLength(5),
        Validators.minLength(5)]]
    });

  }

  checkCode() {
    if (!this.codeFormControl.hasError('pattern')) {
      if (!this.codeFormControl.hasError('pattern')) {
        this.auth.checkCode(this.code).subscribe(
          data => {
            this.code = data;
            this.appService.obtainAccessToken(this.credentials);
          },
          error2 => {
            this.invalidCode = true;
            this.snackBar.open('Invalid Code', '', {
              duration: 2000
            });
          });
        if (this.invalidCode) {
          $('#codeNext').click();
        }
      }
    }
  }

  emailExists(control: AbstractControl) {
    return this.users.isEmailExists(control.value).pipe(map(response => {
      return response ? {exists: true} : null;
    }));

  }


  registration() {
    this.state = true;
    this.loading = true;
    this.error = false;
    this.state = true;
    this.auth.registration(this.user).subscribe(response => {
      this.loading = false;
      this.form.reset();
    }, error => {
      this.error = true;
      this.loading = false;
    });
    this.credentials.login = this.user.email;
    this.credentials.password = this.user.password;
    this.email = this.user.email;

    this.state = false;
  }

}

