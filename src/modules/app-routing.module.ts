import {NgModule, Injectable} from '@angular/core';
import {RouterModule, Routes, CanActivate, Router} from '@angular/router';
import {AuthService} from '../service/auth.service';
import {UserComponent} from '../app/application/user.component';
import {LoginComponent} from '../app/loginRegistration/login/login.component';
import {AppComponent} from '../app/app.component';
import {LoginRegistrationComponent} from '../app/loginRegistration/login.registration.component';
import {UserChatComponent} from '../app/application/user-chat/user-chat.component';
import {UserContentComponent} from '../app/application/user-application/user-content.component';
import {UserFileStorageComponent} from '../app/application/user-file-storage/user-file-storage.component';

const itemRoutes: Routes = [
  {path: 'context', component: UserContentComponent},
  {path: 'chat', component: UserChatComponent},
  {path: 'files', component: UserFileStorageComponent}
];

const routes: Routes = [

  {
    path: 'application/:id',
    component: UserComponent
  },
  {
    path: 'application/:id',
    component: UserComponent,
    children: itemRoutes
  },
  {
    path: 'login',
    component: LoginRegistrationComponent
  },
  {
    path: '',
    component: AppComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
