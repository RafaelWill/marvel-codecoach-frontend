import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {InitService} from '../../shared/materialize/init.service';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  fullName!: string;
  userId!: string | null;

  constructor(public authenticationService: AuthenticationService,
              private initService: InitService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.getUserId() !== null) {
      this.userId = this.authenticationService.getUserId();
      this.fullName = this.authenticationService.getFullName();
    }

    this.authenticationService.isUserLoggedIn$
      .pipe(filter(isLoggedIn => isLoggedIn === true))
      .subscribe(userProfile => this.fullName = this.authenticationService.getFullName() );
  }

  ngAfterViewInit(): void {
    this.initService.initDropdowns();
    this.initService.initSidenav();
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
