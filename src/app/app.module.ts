import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LayoutModule} from './layout/layout.module';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { Error404Component } from './error/error404/error404.component';
import { BecomeCoachComponent } from './user/become-coach/become-coach.component';
import { RequestSessionComponent } from './session/request-session/request-session.component';
import { JoinPipe } from './shared/pipe/join.pipe';
import { LoadingSpinnerComponent } from './shared/util/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterUserComponent,
    HomeComponent,
    UserProfileComponent,
    Error404Component,
    BecomeCoachComponent,
    RequestSessionComponent,
    JoinPipe,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
