import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../shared/service/authentication.service';
import {InitService} from '../../shared/materialize/init.service';
import {filter} from 'rxjs/operators';
import {PersonService} from '../../shared/service/person.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  fullName!: string;
  userId!: string | null;

  constructor(public authenticationService: AuthenticationService,
              private personService: PersonService,
              private initService: InitService) {
  }

  ngOnInit(): void {
    if (this.authenticationService.getUserId() !== null) {
      this.userId = this.authenticationService.getUserId();
      this.fullName = this.authenticationService.getFullName();
    }

    this.authenticationService.isUserLoggedIn$
      .pipe(filter(isLoggedIn => isLoggedIn === true))
      .subscribe(_ => this.fullName = this.authenticationService.getFullName() );
  }

  ngAfterViewInit(): void {
    this.initService.initDropdowns();
    this.initService.initSidenav();
  }

  logout(): void {
    this.authenticationService.logout();
  }

  /*getFullName(): string {
    if (!this.authenticationService.getUserId()) {
      return 'not logged in';
    }

    let firstName: string;
    let lastName: string;

    this.personService.findById(this.authenticationService.getUserId()!).subscribe(
      user => {
        firstName = user.firstName;
        lastName = user.lastName;
      }

    );
    return `${firstName} ${lastName}`;
  }*/
}
