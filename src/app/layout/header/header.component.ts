import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {InitService} from '../../shared/materialize/init.service';
import {filter} from 'rxjs/operators';
import {PersonService} from '../../shared/service/person.service';
import {LocalStorageService} from '../../shared/service/local-storage.service';
import {BecomeCoachComponent} from '../../user/become-coach/become-coach.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  fullName!: string;
  userId!: string | null;

  constructor(public authenticationService: AuthenticationService,
              private localStorage: LocalStorageService,
              private personService: PersonService,
              private initService: InitService
             ) {
  }

  ngOnInit(): void {
    if (this.authenticationService.getUserId() !== null) {
      this.userId = this.authenticationService.getUserId();
      this.fullName = this.authenticationService.getFullName();
    }

    this.authenticationService.isUserLoggedIn$
      .pipe(filter(isLoggedIn => isLoggedIn === true))
      .subscribe(_ => { this.fullName = this.authenticationService.getFullName();
                        this.userId = this.authenticationService.getUserId();
                        });
  }

  ngAfterViewInit(): void {
    this.initService.initDropdowns();
    this.initService.initSidenav();
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
