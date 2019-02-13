import {Component, Inject, OnInit} from '@angular/core';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})

export class UserSearchComponent implements OnInit {

  private email;


  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);
  matcher = new SearchErrorStateMatcher();

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<UserSearchComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

  public search() {
    this.userService.getUser(this.email);
  }
}

export class SearchErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


