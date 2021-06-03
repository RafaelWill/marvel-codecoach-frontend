import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterUserComponent} from './user/register-user/register-user.component';
import {HomeComponent} from './home/home.component';
import {Error404Component} from './error/error404/error404.component';
import {BecomeCoachComponent} from './user/become-coach/become-coach.component';
import {UserProfileComponent} from './user/user-profile/user-profile.component';
import {RequestSessionComponent} from './session/request-session/request-session.component';
import { CoachesOverviewComponent } from './user/coaches-overview/coaches-overview.component';
import {Error401Component} from './error/error401/error401.component';
import {LoginComponent} from './user/login/login.component';
import {CoachProfileComponent} from './user/coach-profile/coach-profile.component';

import {AuthenticatedGuard} from './shared/util/authorization-guard/authenticated.guard';
import {Error403Component} from './error/error403/error403.component';
import {MyCoachProfileComponent} from './user/my-coach-profile/my-coach-profile.component';
import {BecomeCoachGuard} from './shared/util/authorization-guard/become-coach.guard';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'users/register', component: RegisterUserComponent},
  {path: 'users/:id', component: UserProfileComponent, canActivate: [AuthenticatedGuard]},
  {path: 'users/:id/find-coaches', component: CoachesOverviewComponent, canActivate: [AuthenticatedGuard]},
  {path: 'users/:id/become-coach', component: BecomeCoachComponent, canActivate: [BecomeCoachGuard]},
  {path: 'users/:id/my-coach-profile', component: MyCoachProfileComponent, canActivate: [AuthenticatedGuard]},
  {path: 'sessions/:coachId/request-session', component: RequestSessionComponent, canActivate: [AuthenticatedGuard]},
  {path: 'coach-profile/:coachId', component: CoachProfileComponent, canActivate: [AuthenticatedGuard]},
  {path: 'unauthorized', component: Error401Component},
  {path: 'forbidden', component: Error403Component},
  {path: 'not-found', component: Error404Component},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'},
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
