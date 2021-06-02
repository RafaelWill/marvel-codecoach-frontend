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
import {AuthorizeGuard} from './shared/util/authorize-guard';
import {Error403Component} from './error/error403/error403.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'users/register', component: RegisterUserComponent},
  {path: 'users/coaches', component: CoachesOverviewComponent, canActivate: [AuthorizeGuard]},
  {path: 'users/:id', component: UserProfileComponent, canActivate: [AuthorizeGuard]},
  {path: 'users/:id/become-coach', component: BecomeCoachComponent, canActivate: [AuthorizeGuard]},
  {path: 'sessions/:coachId/request-session', component: RequestSessionComponent, canActivate: [AuthorizeGuard]},
  {path: 'unauthorized', component: Error401Component},
  {path: 'forbidden', component: Error403Component},
  {path: 'not-found', component: Error404Component},
  {path: '**', redirectTo: 'not-found', pathMatch: 'full'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
