import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterUserComponent} from './user/register-user/register-user.component';

const routes: Routes = [{path: 'users/register', component: RegisterUserComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
