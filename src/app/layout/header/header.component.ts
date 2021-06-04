import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {InitService} from '../../shared/materialize/init.service';
import {filter} from 'rxjs/operators';
import {PersonService} from '../../shared/service/person.service';
import {LocalStorageService} from '../../shared/service/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  fullName!: string;
  userId!: string | null;
  isCoach!: boolean;

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
      this.isCoach = this.authenticationService.isCoach();
    }

    this.authenticationService.isUserLoggedIn$
      .pipe(filter(isLoggedIn => isLoggedIn === true))
      .subscribe(_ => {
        this.fullName = this.authenticationService.getFullName();
        this.userId = this.authenticationService.getUserId();
        this.isCoach = this.authenticationService.isCoach();
        this.initService.initDropdowns();
      });

    this.personService.hasBecomeCoach$
      .pipe(filter(hasBecomeCoach => hasBecomeCoach === true))
      .subscribe(_ => {
        this.isCoach = true;
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
