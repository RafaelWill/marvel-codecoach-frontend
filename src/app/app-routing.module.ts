import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterUserComponent} from './user/register-user/register-user.component';
import {HomeComponent} from './home/home.component';
import {Error404Component} from './error/error404/error404.component';

const routes: Routes = [
  {path: 'users/register', component: RegisterUserComponent},
  {path: '', component: HomeComponent},
  {path: 'not-found', component: Error404Component},
  {path: '**', redirectTo: 'not-found'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
