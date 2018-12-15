import {
  MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldControl, MatFormFieldModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule, MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule, MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
} from '@angular/material';
import {MatFileUploadModule} from 'angular-material-fileupload';
import {CdkTableModule} from '@angular/cdk/table';
import {RegistrationSnackBarComponent} from './bars/registration/registration-snack-bar/registration-snack-bar.component';
import {Injectable, NgModule, OnInit} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {AppComponent} from './app.component';
import {RegistrationComponent} from './loginRegistration/registration/registration.component';
import {LoginComponent} from './loginRegistration/login/login.component';
import {UserComponent} from './application/user.component';
import {AppRoutingModule} from '../modules/app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Ng2CloudinaryModule} from 'ng2-cloudinary';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthService} from '../service/auth.service';
import {UserService} from '../service/user.service';
import {AppService} from '../service/app.service';
import {Http, HttpModule} from '@angular/http';
import {LoginRegistrationComponent} from './loginRegistration/login.registration.component';
import {LoadingBarHttpModule} from '@ngx-loading-bar/http';
import {LoadingBarRouterModule} from '@ngx-loading-bar/router';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {ProgressBarComponent} from './bars/progressbar/progress-bar.component';
import {UserContentComponent} from './application/user-application/user-content.component';
import {UserChatComponent} from './application/user-chat/user-chat.component';
import {RouterModule} from '@angular/router';
import {UserFileStorageComponent} from './application/user-file-storage/user-file-storage.component';
import {UploadService} from '../service/upload.service';


@NgModule({
  exports: [

    CdkTableModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule
  ],
  declarations: [RegistrationSnackBarComponent]
})
export class DemoMaterialModule {
}


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    UserComponent,
    LoginRegistrationComponent,
    ProgressBarComponent,
    UserContentComponent,
    UserChatComponent,
    UserFileStorageComponent
  ],
  imports: [
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2CloudinaryModule,
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    FormsModule,
    HttpModule,
    LoadingBarHttpModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    MatFileUploadModule,
    RouterModule
  ],
  providers: [
    AuthService,
    UserService,
    AppService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
