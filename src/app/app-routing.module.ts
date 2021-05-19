import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterUserComponent} from './user/register-user/register-user.component';
import {HomeComponent} from './home/home.component';
import {Error404Component} from './error/error404/error404.component';
import {BecomeCoachComponent} from './user/become-coach/become-coach.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'users/register', component: RegisterUserComponent},
  {path: 'users/:id', component: UserProfileComponent },
  {path: 'users/:id/become-a-coach', component: BecomeCoachComponent},
  {path: 'not-found', component: Error404Component},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
