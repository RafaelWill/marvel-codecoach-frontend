import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from './layout/layout.module';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { Error404Component } from './error/error404/error404.component';
import { BecomeCoachComponent } from './user/become-coach/become-coach.component';
import { RequestSessionComponent } from './session/request-session/request-session.component';
import { CoachesOverviewComponent } from './user/coaches-overview/coaches-overview.component';
import { JoinPipe } from './shared/pipe/join.pipe';
import { JointopicPipe } from './shared/pipe/jointopic.pipe';
import { LoadingSpinnerComponent } from './shared/util/loading-spinner/loading-spinner.component';
import {CookieService} from 'ngx-cookie-service';
import { Error401Component } from './error/error401/error401.component';
import { LoginComponent } from './user/login/login.component';
import {AuthenticationInterceptor} from './shared/util/authentication.interceptor';
import { CoachProfileComponent } from './user/coach-profile/coach-profile.component';
import { Error403Component } from './error/error403/error403.component';
import {ErrorInterceptor} from './shared/util/error.interceptor';
import { MyCoachProfileComponent } from './user/my-coach-profile/my-coach-profile.component';
import { CoachfilterPipe } from './shared/pipe/coachfilter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    HomeComponent,
    UserProfileComponent,
    Error404Component,
    BecomeCoachComponent,
    RequestSessionComponent,
    CoachesOverviewComponent,
    RequestSessionComponent,
    JointopicPipe,
    JoinPipe,
    LoadingSpinnerComponent,
    Error401Component,
    LoginComponent,
    Error403Component,
    LoginComponent,
    CoachProfileComponent,
    MyCoachProfileComponent,
    CoachfilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CoachfilterPipe,
    CookieService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
