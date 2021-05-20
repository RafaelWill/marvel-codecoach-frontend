import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterUserComponent} from './user/register-user/register-user.component';
import {HomeComponent} from './home/home.component';
import {Error404Component} from './error/error404/error404.component';
import {BecomeCoachComponent} from './user/become-coach/become-coach.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {RequestSessionComponent} from './session/request-session/request-session.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'users/register', component: RegisterUserComponent},
  {path: 'users/:id', component: UserProfileComponent },
  {path: 'users/:id/become-coach', component: BecomeCoachComponent},
  {path: 'sessions/:coachId/request-session', component: RequestSessionComponent},
  {path: 'not-found', component: Error404Component},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
